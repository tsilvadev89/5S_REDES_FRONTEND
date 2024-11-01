const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Carrega as variáveis de ambiente do .env
const mysql = require('mysql2/promise');
const { exec } = require('child_process');

// Configuração da conexão com o banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

console.log(dbConfig); // Imprime a configuração para depuração

// Função para executar o script de população e esperar até que ele termine
function runPopulateScript() {
  return new Promise((resolve, reject) => {
    exec('node populate_data.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao executar o script de população: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.error(`Erro no script de população: ${stderr}`);
        return reject(new Error(stderr));
      }
      console.log('Script de população executado com sucesso.');
      console.log(stdout);
      resolve();
    });
  });
}

async function createDatabaseAndTables() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
  });

  try {
    // Verificar a existência do banco de dados e criar, caso não exista
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);

    // Criação das tabelas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        cliente_id INT AUTO_INCREMENT PRIMARY KEY,
        primeiro_nome VARCHAR(50),
        sobrenome VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        data_nascimento DATE,
        data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS funcionarios (
        funcionario_id INT AUTO_INCREMENT PRIMARY KEY,
        primeiro_nome VARCHAR(50),
        sobrenome VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        cargo_id INT,
        data_contratacao DATE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS cargos (
        cargo_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50),
        descricao TEXT
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS enderecos (
        endereco_id INT AUTO_INCREMENT PRIMARY KEY,
        entidade_id INT,
        tipo_entidade ENUM('cliente', 'funcionario'),
        logradouro VARCHAR(100),
        numero VARCHAR(10),
        complemento VARCHAR(50),
        bairro VARCHAR(50),
        cidade VARCHAR(50),
        estado VARCHAR(2),
        cep VARCHAR(10)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        produto_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        descricao TEXT,
        preco DECIMAL(10, 2),
        estoque INT,
        categoria_id INT,
        ativo BOOLEAN DEFAULT TRUE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS imagens_produtos (
        imagem_id INT AUTO_INCREMENT PRIMARY KEY,
        produto_id INT,
        imagem_url VARCHAR(255)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        categoria_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50),
        descricao TEXT
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS servicos (
        servico_id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100),
        descricao TEXT,
        preco DECIMAL(10, 2),
        duracao TIME,
        ativo BOOLEAN DEFAULT TRUE
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS imagens_servicos (
        imagem_id INT AUTO_INCREMENT PRIMARY KEY,
        servico_id INT,
        imagem_url VARCHAR(255)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS agendamentos (
        agendamento_id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT,
        servico_id INT,
        funcionario_id INT,
        data_hora DATETIME,
        status ENUM('pendente', 'confirmado', 'cancelado', 'concluido') DEFAULT 'pendente'
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedidos (
        pedido_id INT AUTO_INCREMENT PRIMARY KEY,
        cliente_id INT,
        data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        valor_total DECIMAL(10, 2)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS itens_pedido (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        pedido_id INT,
        produto_id INT,
        quantidade INT,
        preco_unitario DECIMAL(10, 2)
      )
    `);

    console.log('Tabelas criadas com sucesso.');

    // Executa o script de população e aguarda a conclusão
    await runPopulateScript();

  } catch (error) {
    console.error('Erro ao criar banco de dados e tabelas:', error);
  } finally {
    await connection.end();
    console.log("Conexão com o banco de dados fechada.");
  }
}

createDatabaseAndTables();
