import React from 'react';
import update from 'react-addons-update';
import Webcam from 'react-webcam';
import axios from 'axios';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import moment from 'moment'
import $ from "jquery";
import Comprovant from '../Comprovante/comprovantedeEntrada';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import { timingSafeEqual } from 'crypto';
import { Num } from '../Passaporte/favetas';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
class EntradaAniversario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            obs: '',
            obsCrianca: '',
            rest: '',
            phone: '',
            algo: false,
            FullName: "",
            //Responsável por saber qual página vai renderizar:
            aniversariante: [], // dados do evento atual
            page: "SelecionarTipoDeEntrada", //Responsável pela tela que esta.
            adultoSelecionado: [], // ADULTOS que foi selecionadaos para da entrada.
            criancaSelecionada: [], // CRIANÇA que foi selecionadaos para da entrada.
            listaCriancaDentro: [], // lista de crianças que deram entrada.
            listaAdultosDentro: [], // lista de adultos que deram entrada.
            list: [],
            //Lista Adultos
            name: "",
            type: "",
            kinship: "Outros",
            //Pesquisa Criança
            selectedSearch: "",// Salva o nome que é colocado na barra de busca
            //Pesquisa Responsável
            responsavel: [],
            criancaDentro: [],
            listacriancaCombinacao: [],//lista e crianças apos atribuir os ids do sistema
        }

        //Relacionado a atualização dos valores Caminho
        this.AdicinarFullNome = this.AdicinarFullNome.bind(this); //apontador 
        //Relacionado a Atualização do esta sendo digitado na busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchChild = this.SearchChild.bind(this);
        this.requisicao = this.requisicao.bind(this);
        this.criancaExtra = this.criancaExtra.bind(this);

        this.ChangeObs = this.ChangeObs.bind(this); //apontador 
        this.ChangeObsCrianca = this.ChangeObsCrianca.bind(this);
        this.ChangeRest = this.ChangeRest.bind(this);
        this.ChangePhone = this.ChangePhone.bind(this);
    }
    ChangeObs(event) {
        this.setState({ obs: event.target.value });
    }
    ChangeObsCrianca(event, identifier, indice) {
        console.log(event.target.value);
        let listatemporaria = this.state.listConfirmKids;
        listatemporaria.forEach((crianca, indice) => {
            if (crianca._id === identifier) {
                crianca.observations = event.target.value;
            }
        });
        this.setState({
            listConfirmKids: listatemporaria,
        })
    }
    ChangeRest(event, identifier, indice) {
        console.log(event.target.value);
        let listatemporaria = this.state.listConfirmKids;
        listatemporaria.forEach((crianca, indice) => {
            if (crianca._id === identifier) {
                crianca.restrictions = event.target.value;
            }
        });
        this.setState({
            listConfirmKids: listatemporaria,
        })
    }
    ChangePhone(event) {
        this.setState({ phone: event.target.value });
    }
    Changekinship(event, identifier, indice) {
        this.setState({
            kinship: event.target.value
        })
        console.log(event.target.value);




        if (event.target.value === "others") {
            this.setState({
                kinship: "Outros"
            })

        }
        else if (event.target.value === "children") {
            this.setState({
                kinship: "filho(a)"
            })

        }
        else if (event.target.value === "Stepson") {
            this.setState({
                kinship: "Enteado(a)"
            })

        }
        else if (event.target.value === "grandchildren") {
            this.setState({
                kinship: "Neto(a)"
            })

        }
        else if (event.target.value === "nephews") {
            this.setState({
                kinship: "Sobrinho(a)"
            })

        }
        else if (event.target.value === "Brother") {
            this.setState({
                kinship: "Irmã(o)"
            })

        }


    }
    Funcionario = (number) => {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);

        axios.get(`/employees/${b.id}`)
            .then((response) => {
                let id = response.data[0].identifierEmployee.employeeData.officialPosition;



                axios.get(`/professionalPosition/indentifier/${id}`)
                    .then((response) => {
                        let functions;
                        return response.data.functions;
                    }).then((event) => {
                        let podeentrar = false;
                        event.map((map) => {
                            if (map.id === number) {
                                podeentrar = true;
                            }
                        })
                        return podeentrar;
                    }).then((event) => {
                        if (event) {
                            this.requisicao();
                        } else {
                            this.props.history.push("/");
                            alert("você nao tem permissao para entrar aki")
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }
    componentWillMount() {
        this.Funcionario(18);
    }

    getFuncionario = () => {


        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);

        axios.get(`/employees/${b.id}`)
            .then((response) => {

                this.setState({
                    nomeFunc: response.data[0].name.firstName + " " + response.data[0].name.surName,
                })

            })
            .catch((err) => console.log(err));

    }
    criancaExtra(event) {
        let crianca = { type: "children", id: "", name: "Criança Extra" }
        const data = {
            childExtra: crianca,
            identifier: this.state.aniversariante[0]._id,
            id: this.state.adultoSelecionado._id,
        }
        axios.put(`/birthday/partyFeather/${this.state.aniversariante[0]._id}`, data)
            .then((response) => {
                console.log(response)
                this.setState({
                    page: "EntradaCrianca"
                })
                this.requisicao();

            }).catch((error) => {
                console.log(error)//LOG DE ERRO
                console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })
    }
    requisicao(event) {
        axios.get(`/birthday/a`)
            .then((response) => {
                
                if (response.data.length === 0) {
                    alert("Nenhum aniversário encontrado")
                    this.setState({ erro: "* Nenhum Evento Encontrado.", algo: false })
                } else {
                    let adulto = [];
                    let crianca = [];
                    let temporario = [];
                    response.data.map((event) => {
                        let hj = moment().format();
                        let inicio = moment(event.start).format();
                        let fim = moment(event.end).format();
                        console.log(hj, fim, inicio,event.start,event.end)
                        console.log(moment(hj).isBefore(fim), moment(hj).isAfter(inicio))
                        if (moment(hj).isBefore(fim) && moment(hj).isAfter(inicio)) {
                            temporario.push(event);
                        }

                    })
                    console.log(temporario)
                    temporario[0].partyFeather.map((pessoa, indice) => {
                        if (pessoa.type === "adult") {
                            adulto.push(pessoa)
                        } else {
                            crianca.push(pessoa)
                        }
                    })
                    console.log("Olar")
                    this.setState({
                        listaAdultosDentro: adulto,
                        listaCriancaDentro: crianca,
                        aniversariante: temporario,
                        algo: true,
                    });
                }

            })
            .catch((err) => console.log(err));
        // $.ajax({
        //     url: "/birthday",
        //     dataType: 'json',
        //     type: 'GET',
        //     error: function (response) {
        //         if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
        //     },
        //     success: function (response) {
        //         console.log(response.length)
        //         if (response.length === 0) {
        //             alert("Nenhum aniversário encontrado")
        //             this.setState({ erro: "* Nenhum Evento Encontrado." })
        //         } else {
        //             let adulto = [];
        //             let crianca = [];
        //             response[0].partyFeather.map((pessoa, indice) => {
        //                 if (pessoa.type === "adult") {
        //                     adulto.push(pessoa)
        //                 } else {
        //                     crianca.push(pessoa)
        //                 }
        //             })
        //             console.log("Olar")
        //             this.setState({
        //                 listaAdultosDentro: adulto,
        //                 listaCriancaDentro: crianca,
        //                 aniversariante: response
        //             });
        //         }
        //     }.bind(this)
        // });
    }
    //Relacionado a atualização dos valores Funções
    AdicinarFullNome(event) {
        this.setState({ FullName: event.target.value });
    }


    // FUNÇOES RELACIONADAS A BOTÕES - INICIO     
    SelecionarCrianca = (event) => {



        this.setState({
            page: "EntradaCrianca",
        })
    }

    SelecionarAdulto = (event) => {
        this.setState({
            page: "EntradaAdulto",
        })
    }

    AvancarConfAdulto = (event) => {
        this.setState({
            FullName: this.state.adultoSelecionado.name,
            page: "ConfirmaAdulto",
        })
    }

    FinalizarAdulto = (event) => {
        let listaAdultosDentros = this.state.listaAdultosDentro;
        console.log(this.state.FullName)
        listaAdultosDentros = { type: "adult", name: this.state.FullName };
        this.setState({

            type: "",
            name: "",
            page: "SelecionarTipoDeEntrada",
            comprovante: true,
        })


        const data = {
            adult: listaAdultosDentros,
            identifier: this.state.aniversariante[0]._id,
        }

        axios.put(`/birthday/partyFeather/${this.state.aniversariante[0]._id}`, data)
            .then((response) => {
                console.log(response)
                this.setState({
                    page: "SelecionarTipoDeEntrada"
                })
                this.requisicao();
            }).catch((error) => {
                console.log(error)//LOG DE ERRO
                console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })

        alert("Cadastrado");
        this.requisicao();
    }

    AvancarCombinarCrianca = (event) => {
        this.setState({
            page: "CombinarCrianca",

        })

    }

    FinalizarCombinacao = (event) => {
        this.setState({
            page: "SelecionarResponsavel",
            selectedSearch: ""
        })
    }

    ConfirmarResp = (event) => {
        let temporario = [];

        this.state.adultoSelecionado.id = this.state.criancaSelecionada._id
        this.setState({
            page: "ConfirmarResp",
            listacriancaCombinacao: temporario,

        })

    }

    Avançarfoto = (event) => {
        this.setState({
            page: "foto",
        })
    }

    AvançarTelaFinal = (event) => {
        this.setState({
            page: "TelaFinal"
        })
    }

    FinalizarCrianca = async (event) => {
        let listaC = [];

        this.setState({
            listaCriancaDentro: update(this.state.listaCriancaDentro, { $push: [{ type: "children", id: this.state.criancaSelecionada._id, name: this.state.criancaSelecionada.name }] }),
            comprovante: true,
        })

        var listCria = [];

        const adulto = {
            _id: this.state.responsavel._id,
            name: this.state.responsavel.name.firstName + ' ' + this.state.responsavel.name.surName,
            phone: this.state.phone,
            observations: this.state.obs,
        }
        const crianca = {
            _id: String(this.state.criancaSelecionada._id),
            name: this.state.criancaSelecionada.name.firstName + ' ' + this.state.criancaSelecionada.name.surName,
            birthday: new Date(this.state.criancaSelecionada.birthday),
            restrictions: this.state.criancaSelecionada.restrictions,
            observations: this.state.criancaSelecionada.observations,
            photo: this.state.file,
            kinship: this.state.kinship,
        }


        listaC = { type: "children", id: this.state.criancaSelecionada._id, nameChild: this.state.criancaSelecionada.name.firstName + ' ' + this.state.criancaSelecionada.name.surName, name: this.state.adultoSelecionado.name, age: this.state.adultoSelecionado.age }
        listCria.push(crianca);
        console.log(listaC.age)
        var formData = new FormData();

        console.log(this.state.file)
        console.log(listCria)
        console.log(adulto)

        formData.append('photo', this.state.file)
        formData.append('service', 'Aniversario')
        formData.append('time', moment().format())
        formData.append('belongings', await Num())
        formData.append('children', JSON.stringify(listCria))
        formData.append('adult', JSON.stringify(adulto));

        const data = {
            child: listaC,
            identifier: this.state.aniversariante[0]._id,
            id: this.state.adultoSelecionado._id,
        }
        console.log(listaC)
        axios.post('/product', formData)
            .then((response) => {


                axios.put(`/birthday/partyFeather/${this.state.aniversariante[0]._id}`, data)
                    .then((response) => {
                        console.log(response)
                        this.setState({
                            page: "SelecionarTipoDeEntrada"
                        })
                        this.requisicao();

                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })

            }).catch((error) => {
                console.log(error)//LOG DE ERRO
                console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })

        alert("Cadastrado");
        this.requisicao();
    }
    // FUNÇOES RELACIONADAS A BOTÕES - FIM


    //  FUNÇOES RELACIONADADS A TIRADA DA FOTO - INÍCIO 
    /*BLOCO QUE TIRA FOTO DA WEBCAN*/
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    capture = (event) => {
        event.preventDefault();
        var imagem = document.querySelector("#imagem");
        const imageSrc = this.webcam.getScreenshot();
        imagem.src = imageSrc;
        this.imageBase64 = imageSrc;
        this.setState({
            file: imageSrc
        })
    };
    //  FUNÇOES RELACIONADADS A TIRADA DA FOTO - FIM

    // Salva AS informações dos ADULTOS que apareceram na lista e foi selecionado.
    selectedAdultLista(identifier) {

        this.state.aniversariante[0].guestList.forEach((adultos) => {
            if (adultos.name === identifier) {
                if (adultos.type === "adult") {
                    this.setState({
                        adultoSelecionado: adultos,
                        page: "ConfirmaAdulto",
                    });
                } else {
                    this.setState({
                        adultoSelecionado: adultos,
                        page: "CombinarCrianca",
                    });
                }

            }
        });



        console.log(this.state.adultoSelecionado)
    }

    // Salva AS informações dos ADULTOS que apareceram na lista e foi selecionado.
    selectedAdult(identifier, indice) {
        let temporario = [];

        this.state.adultoSelecionado.id = this.state.criancaSelecionada._id
        this.setState({
            page: "ConfirmarResp",
            listacriancaCombinacao: temporario,
            responsavel: this.state.list[indice],
            phone: this.state.list[indice].phone,
            obs: this.state.list[indice].observations,
        })
        // let achou = false;
        // //Desmarca A checkBox
        // this.state.responsavel.forEach((adultos, indice, array) => {
        //     if (adultos._id === identifier) {
        //         delete array[indice];
        //         achou = true;
        //     }
        // });

        // if (!(achou)) {
        //     this.state.list.forEach((adultos) => {
        //         if (adultos._id === identifier) {
        //             this.state.responsavel.push(adultos);
        //         }
        //     });
        // }

        // this.setState({ responsavel: this.state.responsavel });
        // console.log(this.state.responsavel)
    }

    // Salva AS informações das CRIANÇAS que apareceram na lista e foi selecionado.
    selectedKids(identifier) {



        this.state.list.forEach((kids, indice) => {


            if (kids._id === identifier) {
                this.setState({
                    criancaSelecionada: kids,
                    page: "SelecionarResponsavel",
                    selectedSearch: "",
                    list: []
                });




            }
        });



        console.log(this.state.criancaSelecionada)
    }

    // Faz a busca do responsável:
    SearchAdult(nomeadult, event) {
        if (nomeadult.length >= 7) {
            $.ajax({
                url: "/adult/filter/" + this.state.selectedSearch + "/name",//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte", //
                dataType: 'json',
                type: 'GET',
                error: function (response) {
                    if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
                },
                success: function (response) {    //Salva os dados do responsável na variácel LIST
                    console.log(response.length)
                    if (response.length === 0) {
                        alert("Erro esc")
                        this.setState({ erro: "* Nenhum Responásel Encontrado." })
                    } else {
                        console.log("Olar")
                        this.setState({ list: response });
                    }
                }.bind(this)
            });
        }
        else {
            console.log("Número de caracteres menor do que 7!")
        }
    }

    //Bloco que muda o status para o atual do formulario.
    ChangeSearch(event) {
        this.setState({ selectedSearch: event.target.value });
    }

    // Faz a busca das Crianças:
    SearchChild(event) {
        $.ajax({
            url: "/child/filter/" + this.state.selectedSearch,//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",//
            dataType: 'json',
            type: 'GET',
            error: function (response) {
                if (response.length === 0) { this.setState({ erro: "* Nenhuma Criança Encontrada." }) }
            },
            success: function (response) {    //Salva os dados do responsável na variácel LIST
                console.log(response);
                //this.setState({ achado: true });
                this.setState({ list: response });
            }.bind(this)
        });
        console.log(this.state.adultoSelecionado)
    }

    render() {
        // //TELA I - Seleção adulto ou criança 
        if (this.state.page === "SelecionarTipoDeEntrada") {
            {/* Imprime a tabela com a busca dos Adultos*/ }
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversásrio </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        {this.state.aniversariante.length > 0 &&
                            <div className="graph" >
                                <div className="row">
                                    <div>
                                        <h3 className="inner-tittle " >Aniversário</h3>
                                    </div>
                                    <div className="col-md-12 col-sm-12 ">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Aniversariante: </b></h5>
                                            <p>{this.state.aniversariante[0].birthdayPerson.name}</p>
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Início: </b></h5>
                                            <p>{moment(this.state.aniversariante[0].start).format("HH:mm")}</p>
                                        </div>
                                        <br></br>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Fim: </b></h5>
                                            <p>{moment(this.state.aniversariante[0].end).format("HH:mm")}</p>
                                        </div>
                                        <br></br>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 col-sm-4">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Quantidade de Crianças: </b></h5>
                                            <p>{this.state.aniversariante[0].amount.children}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Já Entraram: </b></h5>
                                            <p>{this.state.listaCriancaDentro.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 col-sm-4">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Quantidade de Adultos: </b></h5>
                                            <p>{this.state.aniversariante[0].amount.adults}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Já Entraram: </b></h5>
                                            <p>{this.state.listaAdultosDentro.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        {this.state.algo && (<div className="text-center">
                            <button className="btn btn-md botao" onClick={this.SelecionarCrianca}> Criança</button>
                            <button className="btn btn-md botao" onClick={this.SelecionarAdulto}> Adulto </button>
                        </div>)}
                    </div>
                </div>
            )
        }

        //TELA IIA - Se for Adulto:      
        if (this.state.page === "EntradaAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle "> Entrada Adulto</h3>
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th >Nome</th>
                                            <th className="text-center"> Selecionar </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {


                                            this.state.aniversariante[0].guestList.map((event, indice) => {
                                                console.log(event.type)
                                                if (event.type === "adult") {


                                                    return (
                                                        <tr >
                                                            <th scope="row">{indice + 1}</th>
                                                            <td > {event.name} </td>
                                                            <td className="text-center">    <button type="checkbox" name="selectchild" value="true" onClick={() => this.selectedAdultLista(event.name)}> <i className="fa fa-sign-out" aria-hidden="true"></i></button>  </td>
                                                        </tr>
                                                    );
                                                }
                                            })


                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao" onClick={this.AvancarConfAdulto}> Avançar </button>
                        </div>
                    </div>
                </div>
            )
        }

        //TELA IIIA - Confimação entrada Adultos
        if (this.state.page === "ConfirmaAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " > Confirmar Entrada Adultos </h3>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.adultoSelecionado.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome Completo: </b></h5>
                                        <input type="text" id="FullName" name="FullName" className="form-control" className="text-center" placeholder="Seu Nome " value={this.state.FullName} onChange={this.AdicinarFullNome} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.FinalizarAdulto}> Finalizar </button>
                        </div>
                    </div>
                </div>
            )
        }

        //TELA IIC - Se for Crianças:
        if (this.state.page === "EntradaCrianca") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Entrada Crianças</h3>
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th >Nome</th>
                                            <th className="text-center"> Selecionar </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {


                                            this.state.aniversariante[0].guestList.map((event, indice) => {


                                                if (event.type === "children" && event.nameChild === undefined) {


                                                    return (
                                                        <tr key={indice} >
                                                            <th scope="row">{indice}</th>
                                                            <td > {event.name} </td>
                                                            <td className="text-center">   <button type="button" name="selectchild" onClick={() => this.selectedAdultLista(event.name)}> <i className="fa fa-sign-out" aria-hidden="true"></i></button>  </td>
                                                        </tr>
                                                    );
                                                }
                                            })


                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="graph" >
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao" onClick={this.criancaExtra}> Criança Extra </button>
                        </div>
                    </div>
                </div>
            )
        }

        //TELA IIIC - Combinar a entrada da criança da lista com uma que tem no sistema 
        if (this.state.page === "CombinarCrianca") {
            return (
                <div className="container-fluid">
                    <div className="container-fluid" >
                        <div className="sub-heard-part" >
                            <ol className="breadcrumb m-b-0" >
                                <li > < a href="/" > Home </a></li >
                                <li > Entrada Aniversário </li>
                            </ol >
                        </div>
                        <div className="graph-visual" >
                            <div className="graph" >
                                <div>
                                    <h3 className="inner-tittle " >Combinar Crianças</h3>
                                </div>
                                <div className=" text-center">
                                    <input type="search" id="selectKids" name="selectKids" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar Criança" />
                                    <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.SearchChild}> Pesquisar </button>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="graph" >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th >Nome</th>
                                            <th >Aniversário </th>
                                            <th className="text-center"> Selecionar </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.list.map((findKids, indice) => {
                                            return (
                                                <tr key={findKids._id}>
                                                    <th scope="row">{indice + 1}</th>
                                                    <td > {findKids.name.firstName + " " + findKids.name.surName} </td>
                                                    <td >{findKids.phone} </td>
                                                    <td className="text-center">    <button type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids._id)}> <i className="fa fa-sign-out" aria-hidden="true"></i></button> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.FinalizarCombinacao}> Avançar </button>
                    </div>
                </div>
            )
        }

        //TELA IVC - Selecionar o Responsável
        if (this.state.page === "SelecionarResponsavel") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Selecionar Responsável</h3>
                            </div>
                            <div className=" text-center">
                                <input type="search" id="selectAdult" name="selectAdult" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar Responsável" />
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={() => this.SearchAdult(this.state.selectedSearch)}> Pesquisar </button>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Nome</th>
                                        <th >Telefone</th>
                                        <th className="text-center"> Selecionar </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {

                                        return (
                                            <tr key={findAdult._id}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.name.firstName + " " + findAdult.name.surName} </td>
                                                <td >{findAdult.phone} </td>
                                                <td className="text-center">  <button type="button" name="selectchild" onClick={() => this.selectedAdult(findAdult._id, indice)}> <i className="fa fa-sign-out" aria-hidden="true"></i></button> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="text-center">
                                <a className="btn btn-md botao" href="/">Cancelar</a>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.ConfirmarResp}> Avançar </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        //TELA VC - Perfil Responsável
        if (this.state.page === "ConfirmarResp") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <div className="graph-visual" >
                            <div className="graph">
                                <h3 className="inner-tittle" style={{ marginTop: -10 + "px" }} > Perfil</h3>
                                <div className="row">
                                    <div className="col-md-7 col-sm-12 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                            <img src={this.state.responsavel.photo} />
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-12 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Nome: </b></h5>
                                            <p>{this.state.responsavel.name.firstName + " " + this.state.responsavel.name.surName}</p>
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 25 + "px", paddingTop: -13 + "px" }}>
                                            <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                            <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" className="text-center" placeholder="(00) 99999-9999" value={this.state.phone} onChange={this.ChangePhone} />
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Idade: </b></h5>
                                            <p>{moment(this.state.responsavel.birthday).toNow(true)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="graph-visual" >
                            <div className="graph" style={{ padding: 10 + "px" }} >
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <h3 className="inner-tittle" > Observações </h3>
                                        <br></br>
                                        <textarea className="form-control" rows="4" cols="50" id="Observacoes" name="Observacoes" value={this.state.obs} onChange={this.ChangeObs}></textarea>
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.Avançarfoto}> Avançar </button>
                    </div>
                </div>
            )

        }

        //TELA VI - Foto
        if (this.state.page === "foto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph" >
                        <div className="row text-center">
                            <h4 className="inner-tittle"> Tirando uma foto </h4>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <Webcam
                                    className="webcan"
                                    audio={false}
                                    height={240}
                                    ref={this.setRef}
                                    screenshotFormat="image/png"
                                    width={320}
                                />
                                <button className="btn btn-md botao" onClick={this.capture}>Tira Foto</button>
                                <br></br>
                            </div>
                            <div className="col-md-6 col-sm-12 col-xs-12">
                                <img id="imagem" className="webcan" src={this.state.file} />
                            </div>
                        </div>
                    </div >

                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.AvançarTelaFinal}> Avançar </button>
                    </div>
                </div>
            )
        }

        //TELA VI - Confirmação Final 
        if (this.state.page === "TelaFinal") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Entrada Aniversário </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <div className="graph-visual" >
                            <h3 className="inner-tittle" style={{ marginTop: -10 + "px" }} > Perfil - Confirmação Final</h3>
                            <div className="row">
                                {/*QUADRO CONFIMAÇÃO FINAL ADULTOS - INÍCIO*/}
                                <div className="graph" >
                                    <h3 className="inner-tittle " style={{ marginTop: -10 + "px", marginLeft: 40 + "%" }} >Responsável </h3>
                                    <div className="row">
                                        <div className="col-md-7 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                                <img src={this.state.responsavel.photo} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Nome: </b></h5>
                                                <p>{this.state.responsavel.name.firstName + " " + this.state.responsavel.name.surName}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                                <p> {this.state.phone}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                <p>{moment(this.state.responsavel.birthday, "YYYYMMDD").toNow(true)}</p>

                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="graph-visual" >
                                        <div className="graph" style={{ padding: 10 + "px" }} >
                                            <div className="row">
                                                <div className="col-md-12 col-sm-12 col-xs-12">
                                                    <h3 className="inner-tittle" > Observações </h3>
                                                    <br></br>
                                                    <div className="graph" style={{ padding: 10 + "px" }} >
                                                        <p>{this.state.obs}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div >
                                    </div>
                                </div>

                                {/*QUADRO CONFIMAÇÃO FINAL ADULTOS - FIM*/}
                                <div><br></br></div>
                                {/*QUADRO CONFIMAÇÃO FINAL CRIANÇAS- INÍCIO*/}
                                <div className="graph" >
                                    <h3 className="inner-tittle " style={{ marginTop: -10 + "px", marginLeft: 45 + "%" }} > Criança </h3>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Nome: </b></h5>
                                                <p>{this.state.criancaSelecionada.name.firstName + " " + this.state.criancaSelecionada.name.surName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-7 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                                <img src={this.state.criancaSelecionada.photo} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                
                                                <div className="graph" style={{ padding: 10 + "px", paddingBottom: 45 + "px", paddingTop: -13 + "px" }}>
                                                    <h5 className="ltTitulo text-center"><b> Parentesco: </b></h5>
                                                    <select id="kinship" name="kinship" className="form-control optionFomulario" onChange={(event) => this.Changekinship(event)} >
                                                        <option value="others" > Outros </option>
                                                        <option value="children" > filho(a) </option>
                                                        <option value="Stepson" > Enteado(a) </option>
                                                        <option value="grandchildren"  >Neto(a) </option>
                                                        <option value="nephews"  > Sobrinho(a) </option>
                                                        <option value="Brother" > Irmão/Irmã </option>
                                                    </select >
                                                </div>
                                            </div>
                                            <br></br>
                                            <div className="row">
                                                <div className="col-md-7 col-sm-12 text-center">
                                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                                        <h5 className="ltTitulo"><b> Sexo: </b></h5>
                                                        <p>{this.state.criancaSelecionada.sexuality}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 col-sm-12 text-center">
                                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                                        <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                        <p>{moment(this.state.criancaSelecionada.birthday, "YYYYMMDD").toNow(true)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="graph" style={{ padding: 10 + "px" }} >
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <h3 className="inner-tittle" > Observações </h3>
                                                <br></br>
                                                <div className="graph" style={{ padding: 10 + "px" }} >
                                                    <p>{this.state.criancaSelecionada.observations}</p>
                                                </div> </div>
                                        </div>
                                    </div >
                                    <div><br></br></div>
                                </div>
                                {/*QUADRO CONFIMAÇÃO FINAL Crianças  - FIM*/}
                            </div>
                        </div>
                    </div>
                    {/* <Comprovant
                        teste={this.state.comprovante}
                        tabela={this.state.arrayfinal}
                        serviso="ANIVERSÁRIO"

                    /> */}
                    <div className="text-center">
                        <a className="btn btn-md botao" href="/">Cancelar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.FinalizarCrianca}> Finalizar </button>
                    </div>
                </div>
            )
        }
    }
}

export default EntradaAniversario;
