import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa"
import Cpf from "../modelo/cpf"
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import ListagemClientes from "../negocio/listagemClientes";

console.log(`Bem-vindo ao cadastro de clientes do Grupo World Beauty`)
let empresa = new Empresa()
let execucao = true

while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
	console.log(`2 - Cadastrar produto`);
	console.log(`3 - Cadastrar serviço`);
	console.log(`4 - Consumir produto`);
	console.log(`5 - Consumir serviço`);
	console.log(`6 - Editar cliente`);
	console.log(`7 - Editar produto`);
	console.log(`8 - Editar serviço`);
	
    console.log(`10 - Listar todos os clientes`); //
    console.log(`11 - Lista dos 10 clientes que mais consumiram produtos ou serviços (quantidade)`);
    console.log(`12 - Listar clientes por genero`); //
	console.log(`13 - Listar serviços e produtos mais consumidos`);
	console.log(`14 - Listar serviços e produtos mais consumidos por genero`);
	console.log(`15 - Lista dos 10 clientes que menos consumiram produtos ou serviços (quantidade)`);
	console.log(`16 - Lista dos 5 clientes que mais consumiram produtos ou serviços (valor)`);
	
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
		case 12:
            let listagemGenero = new ListagemClientes(empresa.getClientes)
            listagemGenero.listarGenero()
            break;
			
        case 0:
            execucao = false
            console.log(`Até mais`)
            break;
        default:
            console.log(`Operação não entendida :(`)
    }
}