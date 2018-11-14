import React from 'react';
import axios from 'axios';
import GeraDesconto from './CadastroDesconto.js';
import VerDesconto from './VerDesconto.js';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Desconto.css';
import './css/style.css';


class VisualizaDesconto extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            page: "VisualizarDesconto",
            Nome: "",
            list_descontos: [],
        }
        axios.get(`/discount`)
        .then((response) => {
            console.log("Dentro do axios: " + this)
            this.setState({ list: response.data });
        }).catch((error) => {
            console.log("Não deu certo");
            console.log(error)//LOG DE ERRO
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
        })
    }

    VerDesconto = (name) => {
        this.setState({
            page: "VerDesconto",
            Nome: name,
        })
    }
    ExcluirDesconto = () => {
        console.log("Fui Clicado");
    }
    GeraDesconto = () => {
        this.setState({
            page: "GeraDesconto"
        })
    }

    render() {
        if (this.state.page === "VisualizarDesconto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Desconto </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >Lista de Descontos</h3>
                        <div className="graph" >
                            <h3 className="inner-tittle" >Descontos</h3>
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Para</th>
                                            <th>Tipo</th>
                                            <th>Valor</th>
                                            <th>Validade</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td > joão </td>
                                            <td > Criança </td>
                                            <td > Exemplo</td>
                                            <td > mais de 1B</td>
                                            <td >12/12/12</td>
                                            <td >
                                                <button className="btn botao btn-sm" onClick={() => this.VerDesconto("joão")}><i className="fa fa-eye"></i></button>
                                                <button className="btn botao btn-sm" onClick={() => this.ExcluirDesconto("joão")}><i className="fa fa-trash-o "></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td > Exemplo </td>
                                            <td > Criança </td>
                                            <td > Exemplo</td>
                                            <td > mais de 1B</td>
                                            <td >12/12/12</td>
                                            <td >
                                                <button className="btn botao btn-xs" onClick={()  => this.VerDesconto("joão")}><i className="fa fa-eye"></i></button>
                                                <button className="btn botao btn-xs" onClick={() => this.ExcluirDesconto("joão")}><i className="fa fa-trash-o"></i></button>
                                            </td>
                                        </tr>
                                        {/*  {this.state.list.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td >{desconto.name} </td>
                                                    <td >{desconto.to} </td>
                                                    <td >{desconto.type} </td>
                                                    <td >{desconto.value} </td>
                                                    <td >{desconto.validity} </td>
                                                    <td >
                                                        <button className="btn botao btn-xs" onClick={()  => this.VerDesconto(desconto.name)}><i className="fa fa-eye"></i></button>
                                                        <button className="btn botao btn-xs" onClick={() => this.ExcluirDesconto(desconto.name)}><i className="fa fa-trash-o"></i></button>
                                                    </td>
                                                </tr>
                                            );
                                        })} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <br></br>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Home</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.GeraDesconto}>Novo</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "GeraDesconto") {
            return (
                <GeraDesconto />
            )
        }
        else if (this.state.page === "VerDesconto") {
            return (
                <VerDesconto Nome = {this.state.Nome} />
            )
        }
    }
}

export default VisualizaDesconto;