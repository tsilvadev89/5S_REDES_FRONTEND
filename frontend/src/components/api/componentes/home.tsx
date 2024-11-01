import { Component } from "react";
import 'materialize-css/dist/css/materialize.min.css'
import CSS from 'csstype'
const backgroundColor: CSS.Properties = {
    backgroundColor: '#f06292',
}   
const fontStyle: CSS.Properties = {
    fontSize:'xx-large',
    fontFamily: 'fantasy',
}

const botaoStyle: CSS.Properties = {
    padding: '10px'
}

export default class Home extends Component<any>{
    render() {
        return (
            <div>
                <>
                    <nav className="">
                    <div className="nav-wrapper" style={backgroundColor} >
                        <a className="brand-logo center" style={fontStyle}>WB</a>
                        <a  style={botaoStyle} href="/Home">Home</a>
                        <a style={botaoStyle} href="/listagens">Cliente</a>
                        <a style={botaoStyle} href="/formularioCadastroCliente">Cadastrar Cliente</a>
                    </div>
                    </nav>
                </>
                <br/>
                <div className='container'>
                    <div className="center-align">
                        <div className="card">
                            <span className="card-title">Cadastro & Listagens</span>
                            <div className="card-content">
                                <a className="waves-effect waves-light btn" style={backgroundColor} href="/formularioCadastroCliente">Cadastrar clientes</a>
                                <a className="col s4"> </a>
                                <a className="waves-effect waves-light btn" style={backgroundColor} href="/listagens">Listar Clientes</a>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}