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
}