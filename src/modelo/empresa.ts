import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa{
    public clientes: Array<Cliente>
    public produtos: Array<Produto>
    public servicos: Array<Servico>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
}