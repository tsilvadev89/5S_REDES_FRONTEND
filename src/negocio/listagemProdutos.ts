import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    public listarProduto(): void {
        console.log(`\nLista de todos os produtos:`);
        empresa.produtos.forEach(produto => {
            console.log(`Produto: ` + produto.nome);
            console.log(`Valor: ` + produto.valor);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
	 public listarServico(): void {
        console.log(`\nLista de todos os serviços:`);
        empresa.servicos.forEach(servico => {
            console.log(`Serviço: ` + servico.nome);
            console.log(`Valor: ` + servico.valor);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
}