import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Saida_Crianca.css';
import './css/style.css';


class SaidaCrianca extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "UsuarioAdulto",
            listAdultos: [],
            listCrianca: [],
            CriancasSelecionadas: [],
            NameAdult: "João",
            PhoneAdult: "900000000",
            CPFAdult: "000.000.000-00",
            ObsAdult: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            PhotoAdult: "",
        }

        this.ChangeValue = this.ChangeValue.bind(this);

        axios.get('/dashboards')
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listAdultos: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })

    }

    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Selecionar = (resp1) => {
        console.log(resp1);
        var deubom = true;
        axios.get(`/adult/filter/${resp1}`)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    NameAdult: response.data.name,
                    PhoneAdult: response.data.prone,
                    CPFAdult: response.data.cpf,
                    ObsAdult: response.data.observations,
                    PhotoAdult: response.data.photo,
                });

            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                deubom = false;
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        axios.get(`/dashboards/filter/${resp1}`)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listCrianca: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                deubom = false;
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        if (deubom === true) {
            this.setState({
                page: "UsuarioAdulto",
            })
        }
    }
    selecionaCrianca(identifier) {
        let achou = false;
        console.log("Entrei aqui");
        this.state.CriancasSelecionadas.forEach((crianca, indice, array) => {
            if (crianca._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.listCrianca.forEach((crianca) => {
                if (crianca.children._id === identifier) {
                    this.state.confirmaCrianca.push(crianca);
                }
            });
        }

        this.setState({ confirmaCrianca: this.state.confirmaCrianca });
    }
    ProximaTela = (event) =>{
        event.preventDefault();

        if(this.state.CriancasSelecionadas.length > 0){
            this.setState({

            })
        }
        else {
            alert("Selecione Alguma Criança");
        }
    }


    render() {
        if (this.state.page === "Adultos") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Escolha o Responsavel</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Telefone</th>
                                            <th>Selecionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th style={{ fontSize: 20 + 'px' }}>1</th>
                                            <td className="td-table text-center">João</td>
                                            <td className="td-table text-center">(84) 996778800</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("João", "abacate")}><i class="fa fa-check"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ fontSize: 20 + 'px' }}>2</th>
                                            <td className="td-table text-center">Maria</td>
                                            <td className="td-table text-center">(84) 900000000</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("maria", "abacate")}><i class="fa fa-check"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ fontSize: 20 + 'px' }}>3</th>
                                            <td className="td-table text-center">Firmino</td>
                                            <td className="td-table text-center">(84) 999798909</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("firmino", "abacate")}><i class="fa fa-check"></i></button>
                                            </td>
                                        </tr>
                                        {/* {this.state.listAdultos.map((resp, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.adult.name} </td>
                                                    <td >{resp.adult.phone} </td>
                                                    <td ><button className="btn botao btn-xs" onClick={() => this.Selecionar(resp.adult.name)}>Selecionar</button></td>
                                                </tr>
                                            );
                                        })} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "UsuarioAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div className="row">
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Nome:</b></h5>
                                        <p>{this.state.NameAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Telefone:</b></h5>
                                        <p>{this.state.PhoneAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>CPF:</b></h5>
                                        <p>{this.state.CPFAdult}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style = {{ padding:10 + "px"}}>
                                        <h5 className = "ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.ObsAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={"http://localhost:3000/img-users/" + this.state.PhotoAdult} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="graph">
                            <div className="tables table-responsive">
                                <form>
                                    <table className="table table-hover">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th className="text-center">Nome</th>
                                                <th className="text-center">Produto</th>
                                                <th className="text-center">Tempo</th>
                                                <th>Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th style={{ fontSize: 20 + 'px' }}>1</th>
                                                <td className="td-table text-center">Mariazinha</td>
                                                <td className="td-table text-center">Aniversario</td>
                                                <td className="td-table text-center"> 10/10/2018 - 12:00</td>
                                                <td>
                                                    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca("abacate")} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ fontSize: 20 + 'px' }}>2</th>
                                                <td className="td-table text-center">Maria</td>
                                                <td className="td-table text-center">(84) 900000000</td>
                                                <td className="td-table text-center"> 10/10/2018 - 12:00</td>
                                                <td>
                                                    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca("abacate")} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style={{ fontSize: 20 + 'px' }}>3</th>
                                                <td className="td-table text-center">Firmino</td>
                                                <td className="td-table text-center">(84) 999798909</td>
                                                <td className="td-table text-center"> 10/10/2018 - 12:00</td>
                                                <td>
                                                    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca("abacate")} />
                                                </td>
                                            </tr>
                                            {/* {this.state.listChianca.map((resp, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.children.name} </td>
                                                    <td >{resp.service}</td>
                                                    <td>{resp.time}
                                                    <td ><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(findChild._id)} /></td>
                                                </tr>
                                            );
                                        })} */}
                                        </tbody>
                                    </table>
                                    <br></br>
                                    <div className="text-center">
                                        <a className="btn btn-md botao" href="/">Cancelar</a>
                                        <button className="btn btn-md botao botaoAvançar" onClick={this.ProximaTela}>Proximo</button>
                                    </div>  
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SaidaCrianca;
