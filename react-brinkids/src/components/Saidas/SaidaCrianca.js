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
            //VARIAVEL QUE FAZ A VERIFICAÇÂO SE O DESCONTO DEU CERTO
            verified: false,

            listAdultos: [],
            listCrianca: [],
            CriancasSelecionadas: [],
            
            //ARRAY DE VARIAVEIS RELACIONADA AS CRIANÇAS
            ValorCria: [],
            
            //ARRAY DE VARIVEIS RALACIONADA AS CRIANÇAS COM DESCONTO INCLUSO
            ValorCriaDesc: [],
            
            //VARIAVEL PARA CODIGO DO DESCONTO
            CodDes: "",

            //ADULTO
            IDAdult: "",
            TimeAdult: "",
            NameAdult: "",
            PhoneAdult: "",
            CPFAdult: "",
            ObsAdult: "",
            PhotoAdult: "",
            
            //Criança
            NameCria: "",
            PhotoCria: "",
            IdadeCria: "",
            TimeCria: "",
            ObsCria: "",
            RetCria: "",
            ProdutoCria: "",
            //VARIAVEL PARA GUARDAR O VALOR DA CRIANÇA QUE ESTA SENDO ACESSADA NAQUELE INSTANTE
            ValorCrianca: "",

            //Ultima Tela
            TotalValor: 0.00,
            TotalValorDesc: 0.00,
            FinalValor: 0.00,

        }

        this.ChangeValue = this.ChangeValue.bind(this);

        axios.get('/product')
            .then((response) => {
                console.log("Dentro do axios: " + this)
                console.log(response.data);
                this.setState({
                    listAdultos: response.data,
                });
                console.log("adultos", this.state.listAdultos)
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Nenhum Adulto está com criança na loja");
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
            console.log(this.state.listAdultos)
    }

    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //FUNÇÃO QUE SELECIONA O ADULTO DESEJADO
    Selecionar = (resp1, respName) => {
        console.log(resp1);
        var deubom = true;
        setTimeout(_=> {
            axios.get('/adult/' + resp1)
                .then((response) => {
                    console.log("Dentro do axios: " + this)
                    this.setState({
                        TimeAdult: moment().format(),
                        IDAdult: response.data._id,
                        NameAdult: response.data.name,
                        PhoneAdult: response.data.phone,
                        CPFAdult: response.data.cpf,
                        ObsAdult: response.data.observations,
                        PhotoAdult: response.data.photo,
                    });

                }).catch((error) => {
                    console.log("Não deu certo, Adulto não encontrado!");
                    console.log(error)//LOG DE ERRO
                    deubom = false;
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                })
            }, 1000);
        console.log(this.state.NameAdult)
        axios.get('/product/filter/' + respName)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listCrianca: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo, nenhuma criança esta com esse adulto!");
                console.log(error)//LOG DE ERRO
                //deubom = false;
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        setTimeout(_=>{
            //console.log(deubom);
            if (deubom === true) {
                this.setState({
                    page: "UsuarioAdulto",
                })
            } 
        },1000);
    }

    //AQUi É A FUNÇÃO QUE SELECIONA AS CRIANÇAS QUE IRÃO SAIR
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

    //FUNÇÃO QUE PASSAR PARA PROXIMA TELA APOS ESCOLHA DAS CRIANÇAS
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
            console.log(this.state.indice, "/", this.state.CriancasSelecionadas.length)
            //if(this.state.indice === this.state.CriancasSelecionadas.length - 1){}
            /*var formData = new FormData();

            formData.append('idCria', String(this.state.CriancasSelecionadas[0].children.id));
            formData.append('TimeAdult', String(this.state.TimeAdult));*/

            //axios.post(`/passport/data`, formData)
              //  .then(function (response) {
            axios.get(`/passport/` + this.state.CriancasSelecionadas[0].children.id + `/` + moment() + '/')
                .then((response) => {
                     console.log(response);
                    this.setState({                        
                        ValorCria: update(this.state.ValorCria, { $push: [response.data] }),
                        ValorCrianca: response.data.value, 
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

    //FUNÇÃO QUE FAZ PASSAR AS CRIANÇAS 
    ProximaCria = () => {
        if (this.state.indice < this.state.CriancasSelecionadas.length) {
                axios.get(`/passport/` + this.state.CriancasSelecionadas[this.state.indice].children.id + `/` + moment() + '/')
                    .then((response) => {
                        this.setState({
                            ValorCria: update(this.state.ValorCria, { $push: [response.data] }),
                            ValorCrianca: response.data.value,
                        })
                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        alert("Erro no Cadastro");
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })
                    console.log(this.state.CriancasSelecionadas[this.state.indice])
            this.setState({
                NameCria: this.state.CriancasSelecionadas[this.state.indice].children.name,
                PhotoCria: this.state.CriancasSelecionadas[this.state.indice].photo,
                IdadeCria: this.state.CriancasSelecionadas[this.state.indice].children.birthday,
                TimeCria: this.state.CriancasSelecionadas[this.state.indice].time,
                ObsCria: this.state.CriancasSelecionadas[this.state.indice].children.observations,
                RetCria: this.state.CriancasSelecionadas[this.state.indice].children.restrictions,
                ProdutoCria: this.state.CriancasSelecionadas[this.state.indice].service,
                indice: (this.state.indice),
            })
        }
        console.log("pc ",this.state.indice, "/", this.state.CriancasSelecionadas.length)
        if (this.state.indice === (this.state.CriancasSelecionadas.length - 1)){
            this.setState({
                namebutton: "Finalizar",
            })

        }
        //ESSE IF É ONDE ACONTECE OS SOMATORIOS DOS VALORES FINAIS!!!!!!
        console.log("this is what i need now: ", this.state.indice, "/", this.state.CriancasSelecionadas.length)
        console.log(this.state.listCrianca)
        if (this.state.indice === this.state.CriancasSelecionadas.length) {
            //AQUI ONDE FAZ O CALCULO FINAL DO PROCESSO TODO
            var j=0.0;
            var k=0.0;
            //AQUI É O VALOR FINAL
            this.state.ValorCria.map((resp, indice) => {
                j += parseFloat(resp.value);
            })
            //AQUI É O VALOR FINAL COM DESCONTO
            this.state.ValorCriaDesc.map((resp, indice) => {
                k += parseFloat(resp.value);
            })
            this.setState({
                TotalValor: (j).toFixed(2),
                TotalValorDesc: (k).toFixed(2),
                FinalValor: (j-k).toFixed(2),
                page: "FinalizarSaida",
                CodDes: "",
            })
        }
        console.log("oregairu")
        this.setState({
            indice: (this.state.indice+1),
        })
    }

    //FUNÇÃO QUE VERIFICA O DESCONTO PARA CRIANÇA E FAZ O DESCONTO CASO EXISTA!
    VerificaDescontoFilhos = (Codigo) => {
        axios.get(`/discount/filter/${Codigo}`)
            .then((response) => {
                alert("Desconto Validado")
                this.setState({
                    verified: true,
                })
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Desconto não encontrado")
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        setTimeout(_=>{
            console.log(this.state.verified);
            if(this.state.verified == true){
                console.log(this.state.indice)
                axios.get(`/passport/discount/` + this.state.CriancasSelecionadas[this.state.indice - 1].children.id + '/' + this.state.CodDes + `/` + this.state.ValorCrianca) 
                    .then((response) => {
                        this.setState({
                            ValorCriaDesc: update(this.state.ValorCriaDesc, { $push: [response.data] }),
                            //CodDes: "",
                        })
                        alert("Desconto Concluído")
                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        alert("Erro no Cadastro");
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })
            }
        },1000);
        this.setState({
            verified: false,
        }) 
    }
    //FUNÇÃO QUE VERIFICA O DESCONTO PARA ADULTO E FAZ O DESCONTO CASO EXISTA!
    VerificaDescontoPAi = (Codigo) => {
        console.log(this.state.verified);
        axios.get(`/discount/filter/${Codigo}`)
            .then((response) => {
                alert("Desconto Validado")
                this.setState({
                    verified: true,
                })
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Desconto não encontrado")
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        setTimeout(_=>{
            console.log(this.state.verified);
            if(this.state.verified == true){
                axios.get(`/passport/discountAdult/` + this.state.IDAdult + `/` + this.state.FinalValor + `/`+ this.state.CodDes)
                .then((response) => {
                    this.setState({
                        //CodDes:"",
                        ValorCriaDesc: update(this.state.ValorCriaDesc, { $push: [response.data] }),
                    })
                    alert("Desconto Concluído");

                    var j=0.0;
                    var k=0.0;
                    //AQUI É O VALOR FINAL
                    this.state.ValorCria.map((resp, indice) => {
                        j += parseFloat(resp.value);
                    })
                    //AQUI É O VALOR FINAL COM DESCONTO
                    this.state.ValorCriaDesc.map((resp, indice) => {
                        k += parseFloat(resp.value);
                    })
                    this.setState({
                        TotalValor: (j).toFixed(2),
                        TotalValorDesc: (k).toFixed(2),
                        FinalValor: (j-k).toFixed(2),
                    })

                }).catch((error) => {
                    console.log(error)//LOG DE ERRO
                    alert("Erro ao colocar Desconto");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
            }
        },2000);
        this.setState({
            verified: false,
        });
    }

    //Função que finaliza tudo
    Finalizar = (event) => {
        event.preventDefault();
        console.log("Entrei Aqui");
        if (this.state.FormPag !== "") {
            console.log(this.state.FormPag);
            window.print();
            for(var i = 0; i<this.state.CriancasSelecionadas.length; i++){
                axios.delete(`/passport/${this.state.CriancasSelecionadas[i].children.id}`)
                .then((response) => {

                    console.log(response.data);

                }).catch((err) => console.log(err));
            }

        } else {
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
                                            <th className="text-center">Selecionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                         {this.state.listAdultos.map((resp, indice) => {
                                            return (
                                                <tr className="text-center" key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td className="text-center"> {resp.adult.name} </td>
                                                    <td className="text-center">{resp.adult.phone} </td>
                                                    <td className="text-center"><button className="btn botao btn-xs text-center" onClick={() => this.Selecionar(resp.adult.id, this.state.listAdultos[indice].adult.name)}>Selecionar</button></td>
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
                                        <p>{this.state.NameAdult.firstName + " " +this.state.NameAdult.surName }</p>
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
                                                <th className="text-center">Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listCrianca.map((resp, indice) => {
                                            return (
                                                <tr key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td className="text-center"> {resp.children.name} </td>
                                                    <td className="text-center">{resp.service}</td>
                                                    <td className="text-center">{resp.time}</td>
                                                    <td className="text-center"><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(resp.children.id)} /></td>
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
                                        <p>{this.state.ValorCrianca}</p>
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
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Tempo</th>
                                            <th className="text-center">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ValorCria.map((resp, indice) => {
                                            return (
                                                <tr className="text-center" key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td className="text-center"> {resp.service} </td>
                                                    <td className="text-center"> {resp.name} </td>
                                                    <td className="text-center"> {resp.time} </td>
                                                    <td className="text-center"> {resp.value} </td>
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
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.ValorCriaDesc.map((resp, indice) => {
                                            return (
                                                <tr className="text-center" key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td className="text-center"> {resp.discount} </td>
                                                    <td className="text-center"> {resp.name} </td>
                                                    <td className="text-center"> {resp.value} </td>
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