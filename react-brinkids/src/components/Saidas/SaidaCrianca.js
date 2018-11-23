import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import update from 'react-addons-update';
import moment from 'moment';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Saida_Crianca.css';
import './css/style.css';


class SaidaCrianca extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "Adultos",
            namebutton: "Proxima Criança",
            indice: 1,
            FormPag: "",

            listAdultos: [],
            listCrianca: [],
            CriancasSelecionadas: [],
            ValorCria: [],
            ValorCriaDesc: [],
            TimeAdult: "",
            NameAdult: "João",
            PhoneAdult: "900000000",
            CPFAdult: "000.000.000-00",
            ObsAdult: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            PhotoAdult: "",

            //Crianças
            CodigoDecCria: "",
            NameCria: "",
            PhotoCria: "",
            IdadeCria: "",
            TimeCria: "",
            ObsCria: "",
            RetCria: "",
            ProdutoCria: "",

            //Ultima Tela
            TotalValor: "0",
            TotalValorDesc: "0",
            FinalValor: "0",

        }

        this.ChangeValue = this.ChangeValue.bind(this);

        axios.get('/product')
            .then((response) => {
                console.log("Dentro do axios: " + this)
                console.log(response.data);
                this.setState({
                    listAdultos: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Nenhum Adulto está com criança na loja");
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
        axios.get(`/adult/filter/${resp1}/name`)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    TimeAdult: Date.now(),
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
        axios.get(`/product/filter/${resp1}`)
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
        console.log("Entrei aqui");
        this.state.listCrianca.forEach((crianca, indice) => {
            if (crianca.children.id === identifier) {
                console.log("Entrei aqui");
                this.setState({
                    CriancasSelecionadas: update(this.state.CriancasSelecionadas, { $push: [this.state.listCrianca[indice]] })
                })
            }
        });
    }

    ProximaTela = (event) => {
        event.preventDefault();

        if (this.state.CriancasSelecionadas.length > 0) {
            this.setState({
                NameCria: this.state.CriancasSelecionadas[0].children.name,
                PhotoCria: this.state.CriancasSelecionadas[0].photo,
                IdadeCria: this.state.CriancasSelecionadas[0].children.birthday,
                TimeCria: this.state.CriancasSelecionadas[0].time,
                ObsCria: this.state.CriancasSelecionadas[0].children.observations,
                RetCria: this.state.CriancasSelecionadas[0].children.restrictions,
                ProdutoCria: this.state.CriancasSelecionadas[0].service,
                page: "MostraCrianca",
            })
            /*var formData = new FormData();

            formData.append('idCria', String(this.state.CriancasSelecionadas[0].children.id));
            formData.append('TimeAdult', String(this.state.TimeAdult));*/

            //axios.post(`/passport/data`, formData)
              //  .then(function (response) {
            axios.get(`/passport/` + this.state.CriancasSelecionadas[0].children.id + '/' + this.state.TimeAdult)
                .then((response) => {
                    this.setState({
                        console.log();
                        ValorCria: update(this.state.ValorCria, { $push: [response.data] }),
                    })
                }).catch((error) => {
                    console.log(error)//LOG DE ERRO
                    alert("Erro no Cadastro");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
        }
        else {
            alert("Selecione Alguma Criança");
        }
    }

    ProximaCria = () => {
        var i = this.state.indice;
        if (i < this.state.CriancasSelecionadas.length) {
            var formData = new FormData();
            formData.append('idCria', String(this.state.CriancasSelecionadas[i].children.id));
            formData.append('TimeAdult', String(this.state.TimeAdult));
            axios.post(`/passport`, formData)
                .then((response) => {
                    axios.get(`/passport`)
                        .then((response) => {
                            this.setState({
                                ValorCria: update(this.state.ValorCria, { $push: [response.data] }),
                            })
                        }).catch((error) => {
                            console.log(error)//LOG DE ERRO
                            alert("Erro no Cadastro");
                            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                            // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                        })
                }).catch((error) => {
                    console.log(error)//LOG DE ERRO
                    alert("Erro no Cadastro");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
            this.setState({
                NameCria: this.state.CriancasSelecionadas[i].Crianca.children.name,
                PhotoCria: this.state.CriancasSelecionadas[i].Crianca.photo,
                IdadeCria: this.state.CriancasSelecionadas[i].Crianca.children.birthday,
                TimeCria: this.state.CriancasSelecionadas[i].Crianca.time,
                ObsCria: this.state.CriancasSelecionadas[i].Crianca.children.observations,
                RetCria: this.state.CriancasSelecionadas[i].Crianca.children.restrictions,
                ProdutoCria: this.state.CriancasSelecionadas[i].Crianca.service,
                indice: i++,
            })
        }
        if (i === (this.state.CriancasSelecionadas.lengt - 1)) {
            this.setState({
                namebutton: "Finalizar",
            })

        }
        if (i === this.state.CriancasSelecionadas.lengt) {
            var j=0;
            var k=0;
            this.state.ValorCria.map((resp, indice) => {
                j += resp[indice].value;
            })
            this.state.ValorCriaDesc.map((resp, indice) => {
                k += resp[indice].value;
            })
            this.setState({
                CodDes: "",
                TotalValor: j,
                TotalValorDesc: k,
                FinalValor: k,
                page: "FinalizarSaida",
            })
        }
    }

    VerificaDescontoFilhos = (Codigo) => {
        axios.get(`/discount/filter/${Codigo}`)
            .then((response) => {
                alert("Desconto Validado")
                var formData = new FormData();
                formData.append('idCria', String(this.state.CriancasSelecionadas[(this.state.indice - 1)].children.id));
                formData.append('TimeAdult', String(this.state.TimeAdult));
                formData.append('Desconto', String(this.state.CodigoDecCria));
                axios.post(`/passport`, formData)
                    .then((response) => {
                        axios.get(`/passport`)
                            .then((response) => {
                                this.setState({
                                    ValorCriaDesc: update(this.state.ValorCriaDesc, { $push: [response.data] }),
                                })
                            }).catch((error) => {
                                console.log(error)//LOG DE ERRO
                                alert("Erro no Cadastro");
                                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                                // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                            })
                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        alert("Erro no Cadastro");
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Desconto não encontrado")
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
    }
    VerificaDescontoPAi = (Codigo) => {
        axios.get(`/discount/filter/${Codigo}`)
            .then((response) => {
                alert("Desconto Validado")
                var formData = new FormData();
                formData.append('ValorFinal', String(this.state.TotalValorDesc));
                formData.append('Desconto', String(this.state.CodigoDecCria));
                axios.post(`/passport`, formData)
                    .then((response) => {
                        axios.get(`/passport`)
                            .then((response) => {
                                this.setState({
                                    FinalValor: response.data,
                                })
                            }).catch((error) => {
                                console.log(error)//LOG DE ERRO
                                alert("Erro no Cadastro");
                                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                                // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                            })
                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        alert("Erro no Cadastro");
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Desconto não encontrado")
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
    }

    Finalizar = (event) => {
        event.preventDefault();
        console.log("Entrei Aqui");
        if (this.state.FormPag !== "") {
            console.log(this.state.FormPag);
            window.print();
        }
        else {
            alert("Selecione uma forma de pagamento");
            return (0);
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
                                         {this.state.listAdultos.map((resp, indice) => {
                                            return (
                                                <tr key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.adult.name} </td>
                                                    <td >{resp.adult.phone} </td>
                                                    <td ><button className="btn botao btn-xs" onClick={() => this.Selecionar(resp.adult.name)}>Selecionar</button></td>
                                                </tr>
                                            );
                                        })}
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
                        <h3 className="inner-tittle">Responsavel Selecionado</h3>
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
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Observações: </b></h5>
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
                                            {this.state.listCrianca.map((resp, indice) => {
                                            return (
                                                <tr key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.children.name} </td>
                                                    <td >{resp.service}</td>
                                                    <td>{resp.time}</td>
                                                    <td ><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(resp.children.id)} /></td>
                                                </tr>
                                            );
                                        })}
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
        else if (this.state.page === "MostraCrianca") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Crianças Selecionadas</h3>
                        <div className="graph" >
                            <div className="row">
                                <div className="col-md-6 col-md-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={"http://localhost:3000/img-users/" + this.state.PhotoCria} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 com-xs-12">
                                            <div className="graph">
                                                <h5 className="ltTitulo"><b>Nome:</b></h5>
                                                <p>{this.state.NameCria}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 com-xs-12">
                                            <div className="graph">
                                                <h5 className="ltTitulo"><b>Idade:</b></h5>
                                                <p>{this.state.IdadeCria}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Produto:</b></h5>
                                        <p>{this.state.ProdutoCria}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Tempo:</b></h5>
                                        <p>{this.state.TimeCria}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Valor:</b></h5>
                                        <p>{this.state.ValorCria}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Restrições: </b></h5>
                                        <p>{this.state.RetCria}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.ObsCria}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="graph">
                                <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Codigo do Desconto: "} type={"text"} id={"CodDes"} name={"CodDes"} Class={"form-control"} onChange={this.ChangeValue} />
                                <div className="text-center">
                                    <button className="btn btn-md botao botaoAvançar" onClick={() => this.VerificaDescontoFilhos(this.state.CodDes)}>Verificar Desconto</button>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.ProximaCria}>{this.state.namebutton}</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "FinalizarSaida") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Finalização</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Serviço</th>
                                            <th className="text-center">ID</th>
                                            <th className="text-center">Tempo</th>
                                            <th className="text-center">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ValorCria.map((resp, indice) => {
                                            return (
                                                <tr key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.service} </td>
                                                    <td > {resp.id} </td>
                                                    <td > {resp.time} </td>
                                                    <td > {resp.value} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <br></br>
                                <p>Total: R$ {this.state.TotalValor}</p>
                            </div>
                            <br></br>
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Desconto</th>
                                            <th className="text-center">ID</th>
                                            <th className="text-center">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ValorCriaDesc.map((resp, indice) => {
                                            return (
                                                <tr key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.desconto.name} </td>
                                                    <td > {resp.id} </td>
                                                    <td > {resp.value} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <br></br>
                                <p>Total: R$ {this.state.TotalValorDesc}</p>
                            </div>
                            <br></br>
                            <div className="graph">
                                <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Codigo do Desconto: "} type={"text"} id={"CodDes"} name={"CodDes"} Class={"form-control"} onChange={this.ChangeValue} />
                                <div className="text-center">
                                    <button className="btn btn-md botao botaoAvançar" onClick={() => this.VerificaDescontoPAi(this.state.CodDes)}>Verificar Desconto</button>
                                </div>
                            </div>
                            <form>
                                <div className="graph">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12 col-xs-12 text-center">
                                                <div className="graph" style={{ padding: 10 + "px" }}>
                                                    <h5 className="ltTitulo"><b> Valor Final </b></h5>
                                                    <p>R$ {this.state.FinalValor}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12 col-xs-12">
                                                <label className="LetraFormulario brlabel">Forma de Pagamentro:</label>
                                                <br></br>
                                                <label className="radio-inline"><input type="radio" id="Dinheiro" name="FormPag" value="Dinheiro" onClick={this.ChangeValue} /><p className="LetraFormulario">  Dinheiro</p></label>
                                                <label className="radio-inline"><input type="radio" id="Cartao" name="FormPag" value="Cartao" onClick={this.ChangeValue} /><p className="LetraFormulario">  Cartão</p></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="text-center">
                                    <a className="btn btn-md botao" href="/">Cancelar</a>
                                    <button className="btn btn-md botao botaoAvançar" onClick={this.Finalizar}>Finalizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SaidaCrianca;
