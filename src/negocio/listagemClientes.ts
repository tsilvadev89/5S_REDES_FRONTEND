import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`Genero: ` + cliente.genero);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
	
	public listarGenero(): void {
        console.log(`\nLista de todos os clientes por genero:`);
		let arrayNome: string[] = []; let arraySocial: string[] = []; let arrayGenero: string[] = []; let arrayCPF: string[] = []; 
        this.clientes.forEach(cliente => {
            arrayNome.push(cliente.nome);
            arraySocial.push(cliente.nomeSocial);
            arrayGenero.push(cliente.genero);
            arrayCPF.push(cliente.getCpf.getValor);
        });
		const result = Array.from(arrayGenero.keys())
		  .sort((a, b) => arrayGenero[a].localeCompare(arrayGenero[b]))
		for (let x = 0; x < result.length; x++){
			console.log(`Nome: ` + arrayNome[result[x]]);
            console.log(`Nome social: ` + arraySocial[result[x]]);
            console.log(`Genero: ` + arrayGenero[result[x]]);
            console.log(`CPF: ` + arrayCPF[result[x]]);
            console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
	
	public listarMaiorConsumoProduto(): void {
        console.log(`\nLista dos clientes de maior consumo de produtos em numero:`);
		let arrayNome2: string[] = []; let arrayContador: number[] = [];
        this.clientes.forEach(cliente => {
            arrayNome2.push(cliente.nome);
			let contador: number = 0; let maximo: number = 0;
            cliente.getProdutosConsumidos.forEach(produto => {
				contador++;
			})
			arrayContador.push(contador)
        });
		const result2 = Array.from(arrayContador.keys())
		  .sort((a, b) => arrayContador[b]-arrayContador[a])
		for (let x = 0; x < 10; x++){ //arrayNome2.length
			console.log(`Nome: ` + arrayNome2[result2[x]]);
			console.log(`Servicos: ` + arrayContador[result2[x]]);
			console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
	 public listarMaiorConsumoServico(): void {
        console.log(`\nLista dos clientes de maior consumo de serviços em numero:`);
		let arrayNome3: string[] = []; let arrayContador: number[] = [];
        this.clientes.forEach(cliente => {
            arrayNome3.push(cliente.nome);
			let contador: number = 0; let maximo: number = 0;
            cliente.getServicosConsumidos.forEach(servico => {
				contador++;
			})
			arrayContador.push(contador)
        });
		const result3 = Array.from(arrayContador.keys())
		  .sort((a, b) => arrayContador[b]-arrayContador[a])
		for (let x = 0; x < 10; x++){ //arrayNome3.length
			console.log(`Nome: ` + arrayNome3[result3[x]]);
			console.log(`Produtos: ` + arrayContador[result3[x]]);
			console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
	
	//MENOR o sort fica a-b, MAIOR o sort fica b-a
	public listarMenorConsumoProduto(): void {
        console.log(`\nLista dos clientes de menor consumo de produtos em numero:`);
		let arrayNome4: string[] = []; let arrayContador: number[] = [];
        this.clientes.forEach(cliente => {
            arrayNome4.push(cliente.nome);
			let contador: number = 0; let maximo: number = 0;
            cliente.getProdutosConsumidos.forEach(produto => {
				contador++;
			})
			arrayContador.push(contador)
        });
		const result4 = Array.from(arrayContador.keys())
		  .sort((a, b) => arrayContador[a]-arrayContador[b])
		for (let x = 0; x < 10; x++){ //arrayNome4.length
			console.log(`Nome: ` + arrayNome4[result4[x]]);
			console.log(`Servicos: ` + arrayContador[result4[x]]);
			console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
	
	 public listarMenorConsumoServico(): void {
        console.log(`\nLista dos clientes de menor consumo de serviços em numero:`);
		let arrayNome5: string[] = []; let arrayContador: number[] = [];
        this.clientes.forEach(cliente => {
            arrayNome5.push(cliente.nome);
			let contador: number = 0; let maximo: number = 0;
            cliente.getServicosConsumidos.forEach(servico => {
				contador++;
			})
			arrayContador.push(contador)
        });
		const result5 = Array.from(arrayContador.keys())
		  .sort((a, b) => arrayContador[a]-arrayContador[b])
		for (let x = 0; x < 10; x++){ //arrayNome5.length
			console.log(`Nome: ` + arrayNome5[result5[x]]);
			console.log(`Produtos: ` + arrayContador[result5[x]]);
			console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
	
	//contador recebe o valor, mostra apenas 5
	public listarMaiorValorProduto(): void {
        console.log(`\nLista dos clientes de maior consumo de produtos em valor:`);
		let arrayNome6: string[] = []; let arrayContador: number[] = [];
        this.clientes.forEach(cliente => {
            arrayNome6.push(cliente.nome);
			let contador: number = 0; let maximo: number = 0;
            cliente.getProdutosConsumidos.forEach(produto => {
				contador += produto.valor;
			})
			arrayContador.push(contador)
        });
		const result6 = Array.from(arrayContador.keys())
		  .sort((a, b) => arrayContador[b]-arrayContador[a])
		for (let x = 0; x < 5; x++){ //arrayNome6.length
			console.log(`Nome: ` + arrayNome6[result6[x]]);
			console.log(`Servicos: ` + arrayContador[result6[x]]);
			console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
	 public listarMaiorValorServico(): void {
        console.log(`\nLista dos clientes de maior consumo de serviços em valor:`);
		let arrayNome7: string[] = []; let arrayContador: number[] = [];
        this.clientes.forEach(cliente => {
            arrayNome7.push(cliente.nome);
			let contador: number = 0; let maximo: number = 0;
            cliente.getServicosConsumidos.forEach(servico => {
				contador += servico.valor;
			})
			arrayContador.push(contador)
        });
		const result7 = Array.from(arrayContador.keys())
		  .sort((a, b) => arrayContador[b]-arrayContador[a])
		for (let x = 0; x < 5; x++){ //arrayNome7.length
			console.log(`Nome: ` + arrayNome7[result7[x]]);
			console.log(`Produtos: ` + arrayContador[result7[x]]);
			console.log(`--------------------------------------`);
		}
        console.log(`\n`);
    }
}