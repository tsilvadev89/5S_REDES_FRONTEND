const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Carrega as variáveis de ambiente do .env
const mysql = require('mysql2/promise');

// Configuração da conexão com o banco de dados usando variáveis de ambiente
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function populateData() {
  const connection = await mysql.createConnection(dbConfig);

  try {
    // Inserindo dados de cargos
    await connection.query(`
      INSERT INTO cargos (nome, descricao)
      VALUES 
        ('Cabeleireiro', 'Especialista em cortes e penteados'),
        ('Manicure', 'Especialista em cuidados das unhas'),
        ('Esteticista', 'Especialista em tratamentos estéticos'),
        ('Colorista', 'Especialista em coloração capilar'),
        ('Recepcionista', 'Responsável pelo atendimento ao cliente')
    `);

    // Inserindo dados de funcionários
    await connection.query(`
      INSERT INTO funcionarios (primeiro_nome, sobrenome, email, cargo_id, data_contratacao)
      VALUES 
        ('Ana', 'Silva', 'ana.silva@example.com', 1, '2021-01-15'),
        ('Beatriz', 'Oliveira', 'beatriz.oliveira@example.com', 2, '2020-08-20'),
        ('Clara', 'Martins', 'clara.martins@example.com', 3, '2019-07-12'),
        ('Diana', 'Souza', 'diana.souza@example.com', 4, '2021-03-10'),
        ('Elisa', 'Costa', 'elisa.costa@example.com', 5, '2022-05-05')
    `);

    // Inserindo categorias de produtos
    await connection.query(`
      INSERT INTO categorias (nome, descricao)
      VALUES 
        ('Tratamento Capilar', 'Produtos para cuidados com o cabelo'),
        ('Cosméticos', 'Produtos de maquiagem e cuidados com a pele'),
        ('Cuidados com a Pele', 'Produtos para hidratação e limpeza da pele'),
        ('Cuidados com as Unhas', 'Produtos para manicures e pedicures'),
        ('Perfumes', 'Perfumes e fragrâncias')
    `);

    // Inserindo produtos para o salão
    await connection.query(`
      INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id)
      VALUES 
        ('Shampoo Reconstrutor', 'Repara cabelos danificados', 30.00, 100, 1),
        ('Condicionador Hidratação', 'Para hidratação intensa', 25.00, 80, 1),
        ('Máscara Capilar', 'Nutrição profunda', 50.00, 60, 1),
        ('Óleo Capilar', 'Dá brilho aos cabelos', 40.00, 50, 1),
        ('Esmalte Rosa', 'Longa duração', 10.00, 150, 4),
        ('Esmalte Vermelho', 'Longa duração', 10.00, 150, 4),
        ('Creme Facial', 'Hidratação profunda para a pele', 35.00, 40, 3),
        ('Gel de Limpeza', 'Limpeza profunda da pele', 28.00, 50, 3),
        ('Base Facial', 'Base líquida para maquiagem', 45.00, 30, 2),
        ('Batom Vermelho', 'Batom de longa duração', 15.00, 100, 2),
        ('Perfume Floral', 'Fragrância suave e floral', 60.00, 20, 5),
        ('Perfume Amadeirado', 'Fragrância intensa', 70.00, 20, 5),
        ('Esmalte Azul', 'Brilho extra', 10.00, 100, 4),
        ('Hidratante Corporal', 'Hidratação para o corpo', 35.00, 60, 3),
        ('Shampoo Volume', 'Para cabelos finos', 30.00, 80, 1),
        ('Condicionador Brilho', 'Dá brilho aos cabelos', 25.00, 70, 1),
        ('Pó Compacto', 'Para acabamento da maquiagem', 40.00, 25, 2),
        ('Máscara de Cílios', 'Volume extra', 22.00, 40, 2),
        ('Blush Rosado', 'Cor saudável para o rosto', 18.00, 30, 2),
        ('Óleo Corporal', 'Hidratação e brilho', 32.00, 35, 3)
    `);

    // Inserindo serviços para o salão
    await connection.query(`
      INSERT INTO servicos (nome, descricao, preco, duracao)
      VALUES 
        ('Corte de Cabelo Feminino', 'Corte e finalização', 50.00, '00:45:00'),
        ('Manicure Completa', 'Cuidados e esmaltação', 30.00, '00:40:00'),
        ('Pedicure Completa', 'Cuidados e esmaltação', 35.00, '00:45:00'),
        ('Coloração Completa', 'Coloração do cabelo', 100.00, '01:30:00'),
        ('Hidratação Capilar', 'Hidratação profunda', 60.00, '01:00:00'),
        ('Escova', 'Alisamento temporário', 40.00, '00:30:00'),
        ('Limpeza de Pele', 'Limpeza profunda da pele', 70.00, '01:00:00'),
        ('Massagem Relaxante', 'Massagem corporal', 90.00, '01:30:00'),
        ('Design de Sobrancelha', 'Modelagem de sobrancelha', 25.00, '00:20:00'),
        ('Depilação Completa', 'Depilação de corpo inteiro', 120.00, '02:00:00'),
        ('Maquiagem Social', 'Maquiagem para eventos', 80.00, '01:00:00'),
        ('Peeling Facial', 'Tratamento facial', 100.00, '01:15:00'),
        ('Reflexologia', 'Massagem nos pés', 60.00, '00:50:00'),
        ('Corte Infantil', 'Corte para crianças', 30.00, '00:30:00'),
        ('Corte Masculino', 'Corte de cabelo masculino', 45.00, '00:30:00'),
        ('Spa para Mãos e Pés', 'Tratamento relaxante', 70.00, '01:15:00'),
        ('Selagem Capilar', 'Redução de volume e frizz', 150.00, '02:00:00'),
        ('Alongamento de Cílios', 'Alongamento dos cílios', 90.00, '01:20:00'),
        ('Escova Progressiva', 'Alisamento progressivo', 200.00, '02:30:00'),
        ('Banho de Brilho', 'Realce da cor natural', 50.00, '01:00:00')
    `);

    // Inserindo clientes
    await connection.query(`
      INSERT INTO clientes (primeiro_nome, sobrenome, email, data_nascimento)
      VALUES 
        ('Carla', 'Silva', 'carla.silva@example.com', '1995-01-10'),
        ('Julia', 'Santos', 'julia.santos@example.com', '1992-02-15'),
        ('Maria', 'Fernandes', 'maria.fernandes@example.com', '1989-03-20'),
        ('Ana', 'Pereira', 'ana.pereira@example.com', '1985-04-25'),
        ('Beatriz', 'Costa', 'beatriz.costa@example.com', '1990-05-30'),
        ('Renata', 'Almeida', 'renata.almeida@example.com', '1987-06-10'),
        ('Patricia', 'Moura', 'patricia.moura@example.com', '1993-07-05'),
        ('Sandra', 'Oliveira', 'sandra.oliveira@example.com', '1994-08-08'),
        ('Fernanda', 'Souza', 'fernanda.souza@example.com', '1991-09-12'),
        ('Gabriela', 'Ribeiro', 'gabriela.ribeiro@example.com', '1988-10-15')
    `);

    // Inserindo compras de produtos e agendamentos para cada cliente
    for (let clienteId = 1; clienteId <= 10; clienteId++) {
      // Inserindo um pedido para cada cliente
      const [result] = await connection.query(
        'INSERT INTO pedidos (cliente_id, valor_total) VALUES (?, ?)',
        [clienteId, 100.00]
      );

      const pedidoId = result.insertId;

      for (let produtoId = 1; produtoId <= 5; produtoId++) {
        await connection.query(
          'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)',
          [pedidoId, produtoId, 1, 20.00]
        );
      }

      // Inserindo 10 agendamentos de serviços para cada cliente
      for (let i = 1; i <= 10; i++) {
        const servicoId = ((i % 20) + 1);
        const funcionarioId = ((i % 5) + 1);

        await connection.query(
          'INSERT INTO agendamentos (cliente_id, servico_id, funcionario_id, data_hora, status) VALUES (?, ?, ?, NOW() + INTERVAL ? DAY, ?)',
          [clienteId, servicoId, funcionarioId, i, 'confirmado']
        );
      }
    }

    console.log('Dados de teste inseridos com sucesso.');

  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await connection.end();
    console.log("Conexão com o banco de dados fechada.");
  }
}

populateData();
