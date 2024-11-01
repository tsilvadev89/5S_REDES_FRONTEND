import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"
import Cpf from "../modelo/cpf"
import Cliente from "../modelo/cliente";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemProdutos from "../negocio/listagemProdutos";

console.log(`Bem-vindo ao cadastro de clientes do Grupo World Beauty`)
let empresa = new Empresa()
let execucao = true

	let dataInsert = new Date(2002, 6, 3);
	let nomesInsert: string[] = ['Pedro', 'Thiago', 'Juliano', 'William', 'Gerson', 'Claudia', 'Leonardo', 'Jean', 'Masanori', 'Alita', 
	'Alicea', 'Jonas', 'Isaque', 'Alexandre', 'Ian', 'Ivan', 'Gustavo', 'Joao', 'Julia', 'Paulo', 
	'Ricardo', 'Roberto', 'Emiliano', 'Marcos', 'Eduardo', 'Adamastor', 'Gisele', 'Amanda', 'Plineo', 'Pericles']
	let generosInsert: string[] = ['Homem', 'Homem', 'Homem', 'Homem', 'Homem', 'Mulher', 'Homem', 'Homem', 'Homem', 'Homem', 
	'Mulher', 'Homem', 'Homem', 'Homem', 'Homem', 'Homem', 'Homem', 'Homem', 'Mulher', 'Mulher', 
	'Homem', 'Homem', 'Homem', 'Homem', 'Homem', 'Homem', 'Mulher', 'Mulher', 'Homem', 'Homem']
	for (let x: number = 0; x < 30; x++){
        empresa.clientes.push(new Cliente(nomesInsert[x], nomesInsert[x], generosInsert[x], new Cpf(String(Math.floor(Math.random() * 10000000000)), dataInsert)))
	}
	
	let servicosInsert: string[] = ['Corte de cabelo', 'Remoção rugas', 'Botox', 'Remoção manchas', 'Emagrecimento', 'Perda de cabelo']
	for (let x: number = 0; x < 6; x++){
        empresa.servicos.push(new Servico(servicosInsert[x], Math.floor(Math.random() * 1000)))
	}
	let produtosInsert: string[] = ['Gel', 'Pomada', 'Spray', 'Creme']
	for (let x: number = 0; x < 4; x++){
        empresa.produtos.push(new Produto(produtosInsert[x], Math.floor(Math.random() * 1000)))
	}

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`); //
	console.log(`2 - Cadastrar produto`); //
	console.log(`3 - Cadastrar serviço`); //
	console.log(`4 - Consumir produto`); //
	console.log(`5 - Consumir serviço`); // 
	console.log(`6 - Editar cliente`); //
	console.log(`7 - Editar produto`); // 
	console.log(`8 - Editar serviço`); //
	
    console.log(`10 - Listar todos os clientes`); //
    console.log(`11 - Lista dos 10 clientes que mais consumiram produtos (quantidade)`); //
    console.log(`12 - Lista dos 10 clientes que mais consumiram serviços (quantidade)`); //
    console.log(`13 - Listar clientes por genero`); //
	console.log(`14 - Listar serviços e produtos mais consumidos`);
	console.log(`15 - Listar serviços e produtos mais consumidos por genero`);
    console.log(`16 - Lista dos 10 clientes que menos consumiram produtos (quantidade)`); //
    console.log(`17 - Lista dos 10 clientes que menos consumiram serviços (quantidade)`); //
    console.log(`18 - Lista dos 10 clientes que mais consumiram produtos (valor)`); //
    console.log(`19 - Lista dos 10 clientes que mais consumiram serviços (valor)`); //
	
	console.log(`20 - Listar todos os produtos`); //
	console.log(`21 - Listar todos os serviços`); //
	console.log(`22 - Listar todos os produtos que um cliente comprou`); //
	console.log(`23 - Listar todos os serviços que um cliente comprou`); //
	
    console.log(`0 - Sair`);
	
	//console.log(empresa.getClientes);
	//console.log(empresa.getProdutos);
	//console.log(empresa.getServicos);

    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)

    switch (opcao) {
        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;
		case 2:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrar()
            break;
		case 3:
            let cadastroServico = new CadastroServico(empresa.getServicos)
            cadastroServico.cadastrar()
            break;
		case 4:
            let compradorProduto = entrada.receberTexto(`Digite o nome do cliente a comprar: `)
            let produtoComprado = entrada.receberTexto(`Digite o nome do produto comprado: `)
			empresa.getProdutos.forEach(produto => {
				if (produto.nome == produtoComprado){
					console.log(`Produto encontrado`);
					empresa.getClientes.forEach(clientes => {
						if (clientes.nome == compradorProduto){
							console.log(`Cliente encontrado\n`);
							let produtoComprado = new Produto (produto.nome, produto.valor)
							clientes.produtosConsumidos.push(produtoComprado)
							//console.log(clientes.produtosConsumidos)
						}
					});
				}
			});
            break;
		case 5:
            let compradorServico = entrada.receberTexto(`Digite o nome do cliente a comprar: `)
            let servicoComprado = entrada.receberTexto(`Digite o nome do serviço comprado: `)
			empresa.getServicos.forEach(servico => {
				if (servico.nome == servicoComprado){
					console.log(`Serviço encontrado`);
					empresa.getClientes.forEach(clientes => {
						if (clientes.nome == compradorServico){
							console.log(`Cliente encontrado\n`);
							let servicoComprado = new Servico (servico.nome, servico.valor)
							clientes.servicosConsumidos.push(servicoComprado)
							//console.log(clientes.servicosConsumidos)
						}
					});
				}
			});
            break;
		
		case 6: 
			let nome: string = entrada.receberTexto(`Digite o nome do cliente a editar: `)
			let cpf: string = entrada.receberTexto(`Digite o CPF do cliente a editar: `)
			let encontrou: boolean = false;
			empresa.getClientes.forEach(cliente => {
				if (cliente.nome == nome && cliente.getCpf.getValor == cpf){
					console.log(`Cliente encontrado\n`);
					encontrou = true;
					cliente.nome = entrada.receberTexto(`Digite o novo nome do cliente: `)
					cliente.nomeSocial = entrada.receberTexto(`Digite o novo nome social do cliente: `)
					cliente.genero = entrada.receberTexto(`Digite o novo genero do cliente: `)
				}
			});
			if (encontrou == false) {
				console.log("Cliente não encontrado\n")
			}
			break;
			
		case 7: 
			let nomeProduto: string = entrada.receberTexto(`Digite o nome do produto: `)
			let encontrouProduto: boolean = false;
			empresa.getProdutos.forEach(produto => {
				if (produto.nome == nomeProduto){
					console.log(`Produto encontrado\n`);
					encontrouProduto = true;
					produto.nome = entrada.receberTexto(`Digite o novo nome do produto: `)
					produto.valor = entrada.receberNumero(`Digite o novo valor do produto: `)
				}
			});
			if (encontrouProduto == false) {
				console.log("Produto não encontrado\n")
			}
			break;
		case 8: 
			let nomeServico: string = entrada.receberTexto(`Digite o nome do serviço: `)
			let encontrouServico: boolean = false;
			empresa.getServicos.forEach(servico => {
				if (servico.nome == nomeServico){
					console.log(`Serviço encontrado\n`);
					encontrouServico = true;
					servico.nome = entrada.receberTexto(`Digite o novo nome do serviço: `)
					servico.valor = entrada.receberNumero(`Digite o novo valor do serviço: `)
				}
			});
			if (encontrouServico == false) {
				console.log("Serviço não encontrado\n")
			}
			break;
		
        case 10:
            let listagem = new ListagemClientes(empresa.getClientes)
            listagem.listar()
            break;
			
		case 11:
            let listagemMaiorConsumoProduto = new ListagemClientes(empresa.getClientes)
            listagemMaiorConsumoProduto.listarMaiorConsumoProduto()
            break;
		case 12:
            let listagemMaiorConsumoServico = new ListagemClientes(empresa.getClientes)
            listagemMaiorConsumoServico.listarMaiorConsumoServico()
            break;
			
		case 13:
            let listagemGenero = new ListagemClientes(empresa.getClientes)
            listagemGenero.listarGenero()
            break;
		
		case 16:
            let listagemMenorConsumoProduto = new ListagemClientes(empresa.getClientes)
            listagemMenorConsumoProduto.listarMenorConsumoProduto()
            break;
		case 17:
            let listagemMenorConsumoServico = new ListagemClientes(empresa.getClientes)
            listagemMenorConsumoServico.listarMenorConsumoServico()
            break;
			
		case 18:
            let listagemMaiorValorProduto = new ListagemClientes(empresa.getClientes)
            listagemMaiorValorProduto.listarMaiorValorProduto()
            break;
		case 19:
            let listagemMaiorValorServico = new ListagemClientes(empresa.getClientes)
            listagemMaiorValorServico.listarMaiorValorServico()
            break;
		
		case 20:
             console.log(`\nLista de todos os produtos:`);
				empresa.produtos.forEach(produto => {
				console.log(`Produto: ` + produto.nome);
				console.log(`Valor: ` + produto.valor);
				console.log(`--------------------------------------`);
			});
        console.log(`\n`);
            break;
		case 21:
            console.log(`\nLista de todos os serviços:`);
				empresa.servicos.forEach(servico => {
				console.log(`Servico: ` + servico.nome);
				console.log(`Valor: ` + servico.valor);
				console.log(`--------------------------------------`);
			});
            break;
		case 22: 
			let nomeBusca1: string = entrada.receberTexto(`Digite o nome do cliente a buscar: `)
			empresa.getClientes.forEach(cliente => {
				if (cliente.nome == nomeBusca1){
					console.log(`Cliente encontrado\n`);
					cliente.produtosConsumidos.forEach(produto => {
						console.log(`Produto: ` + produto.nome);
						console.log(`Valor: ` + produto.valor);
						console.log(`--------------------------------------`);
					});
					console.log(`\n`);
				}
			});
			break;
		case 23: 
			let nomeBusca2: string = entrada.receberTexto(`Digite o nome do cliente a buscar: `)
			empresa.getClientes.forEach(cliente => {
				if (cliente.nome == nomeBusca2){
					console.log(`Cliente encontrado\n`);
					cliente.servicosConsumidos.forEach(servico => {
						console.log(`Servico: ` + servico.nome);
						console.log(`Valor: ` + servico.valor);
						console.log(`--------------------------------------`);
					});
					console.log(`\n`);
				}
			});
			break;
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}