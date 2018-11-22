import React from 'react';
import axios from 'axios';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import Comprovant from '../Comprovante/comprovantedeEntrada';
import '../Comprovante/comprovante.css';
import tabelinha from '../Comprovante/tabelinha';
import $ from "jquery";
import '../../assets/style/font-awesome.css';
import '../Layout/css/icon-font.min.css';

class ServicoPassaporte extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "TelaI",
            Descricao: "",
            Nome: "",
            list: [],
            Nome: "",
            Descricao: "",
            TempoFinal: "",
            QuebraTempo: 0,
            QuebraValor: 0,
            Price: "",
        }
        this.changueNome = this.changueNome.bind(this);
        this.changueDescricao = this.changueDescricao.bind(this);
        this.changueTempoFinal = this.changueTempoFinal.bind(this);
        this.changueTempoInicial = this.changueTempoInicial.bind(this);
        this.changuePrice = this.changuePrice.bind(this);
        this.ChangeQuebraValor = this.ChangeQuebraValor.bind(this);
        this.ChangeQuebraTempo = this.ChangeQuebraTempo.bind(this);
        this.requisicao = this.requisicao.bind(this);
        this.interval = this.interval.bind(this);
        this.voltar = this.voltar.bind(this);
    }
    voltar(event) {

        this.setState({
            page: "TelaI",
            list: [],
        })
        axios.get('/passportServices')
            .then((response) => {


                console.log(response.data);
                this.setState({ list: response.data });
            })
            .catch((err) => console.log(err));
    }
    interval(event) { }
    requisicao(event) {
        if (this.state.page === "TelaI") {
            axios.get('/passportServices')
                .then((response) => {


                    console.log(response.data);
                    this.setState({ list: response.data });
                })
        }
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    changueNome(event) {
        this.setState({ Nome: event.target.value });
    }

    changueDescricao(event) {
        this.setState({ Descricao: event.target.value });
    }

    changueTempoInicial(event) {
        this.setState({ TempoInicial: event.target.value });
    }

    changueTempoFinal(event) {
        this.setState({ TempoFinal: event.target.value });
    }
    changuePrice(event) {
        this.setState({ Price: event.target.value });
    }
    ChangeQuebraValor(event) {
        this.setState({ QuebraValor: event.target.value });
    }
    ChangeQuebraTempo(event) {
        this.setState({ QuebraTempo: event.target.value });

    }
    componentWillMount() {
        axios.get('/passportServices')
            .then((response) => {


                console.log(response.data);
                this.setState({ list: response.data });
            })
        this.interval = setInterval(this.requisicao, 5000);
    }
    criar = (event) => {
        console.log("Dados sendo retornado");
        event.preventDefault();

        var formData = new FormData();

        formData.append('name', String(this.state.Nome))
        formData.append('description', String(this.state.Descricao))
        formData.append('initialTime', String(this.state.list.initialTime))
        formData.append('finalTime', String(this.state.TempoFinal))
        formData.append('price', String(this.state.Price))


        axios.post('/passportServices', formData)
            .then((response) => {
                console.log(response)
                axios.get('/passportServices')
                    .then((response) => {


                        console.log(response.data);
                        this.setState({ list: response.data, page: "TelaI" });
                    })

            }).catch((error) => {
                console.log(error)//LOG DE ERRO
                alert("Erro no Cadastro");
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })
    }

    Salvar = (event) => {
        console.log('-------------------------------------')
        console.log(this.list)
        console.log('-------------------------------------')
        this.QuebraTempo = this.list.default.time;
        this.QuebraValor = this.list.default.price;

        var formData = new FormData();

        formData.append('time ', String(this.state.QuebraTempo))
        formData.append('price', String(this.state.QuebraValor))


        axios.put('/passport', formData)
            .then(function (response) {
                console.log(response)
                //window.location.href = '/ServicoPassaporte';
            }).catch(function (error) {
                console.log(error)//LOG DE ERRO
                alert("Erro no Cadastro");
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            })
    }

    Apagar = (event) => {
        const id = this.state.list[this.state.list.length - 1]._id;
        axios.delete(`http://localhost:3001/passportServices/${id}`)
            .then((response) => {
                axios.get('/passportServices')
                    .then((response) => {



                        this.setState({ list: response.data, });
                    })
            });
    }

    Adicionar = (event) => {
        $.ajax({
            url: "http://localhost:3001/passportServices/initialTime",
            dataType: 'json',
            type: 'GET',

            error: function (response) {
                if (response.length === 0) { this.setState({ erro: "* Erro no servidor" }) }
            },
            success: function (response) {    //Salva os dados na variácel LIST
                console.log(response.length)
                if (response.length === 0) {
                    alert("Nada Encontrado")
                    this.setState({ erro: "*Nada Encontrado." })
                } else {
                    console.log("Olar")
                    this.setState({ list: response });
                }
            }.bind(this)
        });
        this.setState({ page: "TelaII" });
    }


    render() {
        if (this.state.page === "TelaI") {
            return (

                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home  </a></li >
                            <li > Serviços Passaporte </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div className="row">
                                <div>
                                    <h3 className="inner-tittle " >Serviços</h3>
                                </div>
                                <div className="graph" >
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th >Nome</th>
                                                <th >Inicial (Min)</th>
                                                <th> Final (Min)</th>
                                                <th> Valor </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list.map((TempoServico, indice) => {
                                                return (
                                                    <tr key={TempoServico.services._id}>
                                                        <th scope="row">{indice + 1}</th>
                                                        <td > {TempoServico.name} </td>
                                                        <td >{TempoServico.initialTime} </td>
                                                        <td>{TempoServico.finalTime}</td>
                                                        <td> {TempoServico.price}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="text-right">
                                        <button className="btn btn-md botao " onClick={this.Apagar}> <i className="fa fa-trash-o"></i> </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <button className="btn btn-md botao botaoAvançar" onClick={this.Adicionar}> Adicionar </button>
                                </div>
                                <br></br><br></br>
                            </div>
                        </div>
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div className="row">
                                <div>
                                    <h3 className="inner-tittle " >Tempo Excedente</h3>
                                </div>
                                <div className="graph" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }} style={{ float: "none" }}>
                                                <h5 className="ltTitulo"><b> Quebra (min): </b></h5>
                                                <input type="number" id="" name="QuebraTempo" className="form-QuebraTempo" className="text-center" placeholder="Tempo" value={this.state.QuebraValor} onChange={this.ChangeQuebraValor} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }} style={{ float: "none" }}>
                                                <h5 className="ltTitulo"><b> Valor (R$): </b></h5>
                                                <input type="number" id="" name="QuebraValor" className="form-QuebraValor" className="text-center" placeholder="R$" value={this.state.QuebraTempo} onChange={this.ChangeQuebraTempo} />
                                            </div>
                                        </div>
                                    </div>
                                    <br></br>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-md botao botaoAvançar" onClick={this.Salvar}> Salvar </button>
                                </div>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        else if (this.state.page === "TelaII") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home  </a></li >
                            <li > Serviços Passaporte </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph">
                            <div className="row">
                                <div>
                                    <h3 className="inner-tittle " >Editar</h3>
                                </div>
                                <br></br>
                                <div className="graph" >
                                    <div className="row">
                                        <p className=" col-md-1">Nome:</p>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <input type="text" className="form-control " onChange={this.changueNome} value={this.state.Nome}></input>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <p className=" col-md-1">Descrição:</p>
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <input type="text" className="form-control " onChange={this.changueDescricao} value={this.state.Descricao}></input>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <div className="graph" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <div className="graph" style={{ padding: 10 + "px" }} style={{ float: "none" }}>
                                                <h5 className="ltTitulo"><b> Tempo Inicial: </b></h5>
                                                <p> {this.state.list.initialTime}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12">
                                            <div className="graph" style={{ padding: 10 + "px" }} style={{ float: "none" }}>
                                                <h5 className="ltTitulo"><b> Tempo Final: </b></h5>
                                                <input type="time" className="form-control" onChange={this.changueTempoFinal} value={this.state.TempoFinal} style={{ width: 100 + "px", marginTop: -37 + "px" }}></input>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-12 col-xs-12 text-left">
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12 text-left">
                                            <br></br><br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }} >
                                                <h5 className="ltTitulo"><b> Valor: </b></h5>
                                                <input type="text" className="form-control text-center" onChange={this.changuePrice} value={this.state.Price} style={{ float: "none", margiTop: -30 + "px", }} placeholder={"R$"}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a className="btn btn-md botao" onClick={this.voltar}> Voltar</a>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.criar}> Criar </button>
                    </div>
                </div>
            )
        }
    }
} export default ServicoPassaporte;
