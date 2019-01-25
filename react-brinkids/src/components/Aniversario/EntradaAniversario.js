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


class EntradaAniversario extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            //Pesquisa Criança
            selectedSearch: "",// Salva o nome que é colocado na barra de busca
            //Pesquisa Responsável
            responsavel: [],
            criancaDentro: [],
        }

        //Relacionado a atualização dos valores Caminho
        this.AdicinarFullNome = this.AdicinarFullNome.bind(this); //apontador 
        //Relacionado a Atualização do esta sendo digitado na busca
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchChild = this.SearchChild.bind(this);
    }

    componentWillMount() {
        $.ajax({
            url: "http://localhost:3001/birthday",
            dataType: 'json',
            type: 'GET',
            error: function (response) {
                if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
            },
            success: function (response) {
                console.log(response.length)
                if (response.length === 0) {
                    alert("Nenhum aniversário encontrado")
                    this.setState({ erro: "* Nenhum Evento Encontrado." })
                } else {
                    console.log("Olar")
                    this.setState({
                        aniversariante: response
                    });
                }
            }.bind(this)
        });
    }

    //Relacionado a atualização dos valores Funções
    AdicinarFullNome(event) {
        this.setState({ firstName: event.target.value });
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
            page: "ConfirmaAdulto",
        })
    }

    FinalizarAdulto = (event) => {
        this.setState({
            listaAdultosDentro: update(this.state.listaAdultosDentro, { $push: [{ type: "adult", name: this.state.adultoSelecionado[0].name }] }),
            type: "",
            name: "",
            page: "SelecionarTipoDeEntrada",
            comprovante: true,
        })

        var formData = new FormData();

        formData.append('name', String(this.state.adultoSelecionado[0].name))
        formData.append('type', String(this.state.aniversariante[0].type))

        axios.post('/birthdayParty', formData)
            .then(function (response) {
                console.log(response)
                window.location.href = '/birthdayParty';
            }).catch(function (error) {
                console.log(error)//LOG DE ERRO
                console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })

        alert("Cadastrado");
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
        this.setState({
            page: "ConfirmarResp",
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

    FinalizarCrianca = (event) => {
        this.setState({
            listaCriancaDentro: update(this.state.listaCriancaDentro, { $push: [{ type: "child", id: this.state.criancaSelecionada[0]._id }] }),
            comprovante: true,
        })

        var formData = new FormData();

        formData.append('name', String(this.state.criancaSelecionada[0]._id))
        formData.append('type', String(this.state.aniversariante[0].type))

        axios.post('/birthdayParty', formData)
            .then(function (response) {
                console.log(response)
                window.location.href = '/birthdayParty';
            }).catch(function (error) {
                console.log(error)//LOG DE ERRO
                console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })

        alert("Cadastrado");
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
        let achou = false;
        //Desmarca A checkBox
        this.state.aniversariante[0].guestList.forEach((adultos, indice, array) => {
            if (adultos._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.aniversariante[0].guestList.forEach((adultos) => {
                if (adultos._id === identifier) {
                    this.state.adultoSelecionado.push(adultos);
                }
            });
        }

        this.setState({ adultoSelecionado: this.state.adultoSelecionado });
        console.log(this.state.adultoSelecionado)
    }

    // Salva AS informações dos ADULTOS que apareceram na lista e foi selecionado.
    selectedAdult(identifier) {
        let achou = false;
        //Desmarca A checkBox
        this.state.list.forEach((adultos, indice, array) => {
            if (adultos._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((adultos) => {
                if (adultos._id === identifier) {
                    this.state.responsavel.push(adultos);
                }
            });
        }

        this.setState({ responsavel: this.state.responsavel });
        console.log(this.state.responsavel)
    }

    // Salva AS informações das CRIANÇAS que apareceram na lista e foi selecionado.
    selectedKids(identifier) {
        let achou = false;
        //Desmarca A checkBox
        this.state.aniversariante[0].guestList.forEach((kids, indice, array) => {
            if (kids._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.aniversariante[0].guestList.forEach((kids) => {
                if (kids._id === identifier) {
                    this.state.criancaSelecionada.push(kids);
                }
            });
        }

        this.setState({ criancaSelecionada: this.state.criancaSelecionada });
        console.log(this.state.criancaSelecionada)
    }

    // Faz a busca do responsável:
    SearchAdult(nomeadult, event) {
        if (nomeadult.length >= 7) {
            $.ajax({
                url: "http://localhost:3001/adult/filter/" + this.state.selectedSearch + "/name",//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte", //
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
            url: "http://localhost:3001/child/filter/" + this.state.selectedSearch,//url: "https://ab64b737-4df4-4a30-88df-793c88b5a8d7.mock.pstmn.io/passaporte",//
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
                                            <p>{this.state.aniversariante[0].start}</p>
                                        </div>
                                        <br></br>
                                    </div>
                                    <div className="col-md-6 col-sm-6 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Fim: </b></h5>
                                            <p>{this.state.aniversariante[0].end}</p>
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
                                            <p>{this.state.criancaDentro.length}</p>
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
                        <div className="text-center">
                            <button className="btn btn-md botao" onClick={this.SelecionarCrianca}> Criança</button>
                            <button className="btn btn-md botao" onClick={this.SelecionarAdulto}> Adulto </button>
                        </div>
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


                                            JSON.parse(this.state.aniversariante[0].guestList[0]).map((event, indice) => {
                                                console.log(event.type)
                                                if (event.type !== undefined) {

                                                    console.log(event.nome)
                                                    return (
                                                        <tr >
                                                            <th scope="row">{indice + 1}</th>
                                                            <td > {event.nome} </td>
                                                            <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedAdultLista(event._id)} /> </td>
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
                                        <p>{this.state.adultoSelecionado[0].name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome Completo: </b></h5>
                                        <input type="text" id="FullName" name="FullName" className="form-control" className="text-center" placeholder="Seu Nome " value={this.state.adultoSelecionado[0].name} onChange={this.AdicinarFullNome} />
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


                                            JSON.parse(this.state.aniversariante[0].guestList[0]).map((event, indice) => {
                                                console.log(event.type)
                                                if (event.type === undefined) {

                                                    console.log(event.nome)
                                                    return (
                                                        <tr >
                                                            <th scope="row">{indice + 1}</th>
                                                            <td > {event.nome} </td>
                                                            <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedAdultLista(event._id)} /> </td>
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
                            <button className="btn btn-md botao" onClick={this.AvancarCombinarCrianca}> Avançar </button>
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
                                                    <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedKids(findKids._id)} /> </td>
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
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.SearchAdult(this.state.selectedSearch)}> Pesquisar </button>
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
                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selectedAdult(findAdult._id)} /> </td>
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
                                            <img src={"http://localhost:3000/img-users/" + this.state.responsavel[0].photo} />
                                        </div>
                                    </div>
                                    <div className="col-md-5 col-sm-12 text-center">
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Nome: </b></h5>
                                            <p>{this.state.responsavel[0].name.firstName + " " + this.state.responsavel[0].name.surName}</p>
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px", paddingBottom: 25 + "px", paddingTop: -13 + "px" }}>
                                            <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                            <p> {this.state.responsavel[0].phone}</p>
                                        </div>
                                        <br></br>
                                        <div className="graph" style={{ padding: 10 + "px" }}>
                                            <h5 className="ltTitulo"><b> Idade: </b></h5>
                                            <p>{moment(this.state.responsavel[0].birthday).toNow(true)}</p>
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
                                        <p>{this.state.responsavel[0].observations}</p>
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
        if (this.setState.page === "TelaFinal") {
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
                                                <img src={"http://localhost:3000/img-users/" + this.state.responsavel[0].photo} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Nome: </b></h5>
                                                <p>{this.state.responsavel[0].name.firstName + " " + this.state.responsavel[0].name.surName}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                                <p> {this.state.responsavel[0].phone}</p>
                                            </div>
                                            <br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                <p>{moment(this.state.responsavel[0].birthday, "YYYYMMDD").toNow(true)}</p>

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
                                                        <p>{this.state.responsavel[0].observations}</p>
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
                                                <p>{this.state.criancaSelecionada[0].name.firstName + " " + this.state.criancaSelecionada[0].name.surName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="col-md-7 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                                <img src={"http://localhost:3000/img-users/" + this.state.criancaSelecionada[0].photo} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }}>
                                                <h5 className="ltTitulo"><b> Parentesco: </b></h5>
                                                <p>{this.state.criancaSelecionada[0].kinship}</p>
                                            </div>
                                            <br></br>
                                            <div className="row">
                                                <div className="col-md-7 col-sm-12 text-center">
                                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                                        <h5 className="ltTitulo"><b> Sexo: </b></h5>
                                                        <p>{this.state.criancaSelecionada[0].sexuality}</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-5 col-sm-12 text-center">
                                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                                        <h5 className="ltTitulo"><b> Idade: </b></h5>
                                                        <p>{moment(this.state.criancaSelecionada[0].birthday, "YYYYMMDD").toNow(true)}</p>
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
                                                    <p>{this.state.criancaSelecionada[0].observations}</p>
                                                </div> </div>
                                        </div>
                                    </div >
                                    <div><br></br></div>
                                </div>
                                {/*QUADRO CONFIMAÇÃO FINAL Crianças  - FIM*/}
                            </div>
                        </div>
                    </div>
                    <Comprovant
                        teste={this.state.comprovante}
                        tabela={this.state.arrayfinal}
                        serviso="ANIVERSÁRIO"

                    />
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
