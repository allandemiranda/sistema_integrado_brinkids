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
import './css/Servicos_Passaport.css';
import './css/style.css';

import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';

class ServicoPassaporte extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "TelaI",
            Nome: "",
            list: [],
            list2: { price: '0', time: '0' },
            Nome: "",
            //Descricao: "",
            TempoFinal: "",
            QuebraTempo: 0,
            QuebraValor: 0,
            Price: "",
            tudoOK: true,
            erroC: 0,
            mensApa:false,
            salvarCerto:false,
        }
        this.changueNome = this.changueNome.bind(this);
        //this.changueDescricao = this.changueDescricao.bind(this);
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
        this.requisicao();
        this.setState({erroC: 0})
    }
    interval(event) { }
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
                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }
    requisicao(event) {

        axios.get('/passportServices')
            .then((response) => {

                console.log("ente aki", response.data.services)
                this.setState({
                    list: response.data.services,
                    list2: response.data.default,
                    page: "TelaI",
                    Nome: "",
                    //Descricao: "",
                    TempoFinal: "",
                    Price: "",
                });
                
            })

    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    changueNome(event) {
        this.setState({ Nome: event.target.value });
    }

    //changueDescricao(event) {
    //    this.setState({ Descricao: event.target.value });
    //}

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
        this.setState({ list2: { price: event.target.value, time: this.state.list2.time } });
    }
    ChangeQuebraTempo(event) {
        this.setState({ list2: { price: this.state.list2.price, time: event.target.value } });

    }
    componentWillMount() {

        this.Funcionario(27);

    }
    criar = (event) => {
        let erro=0;
        if (this.state.Nome.length === 0) {
            $("#name").addClass('errorBorder');
            erro++;
            this.setState({
                erroC: this.state.erroC + 1,
            })
          
        }
        else {
            erro--;
            $("#name").removeClass('errorBorder');
            this.setState({
                erroC:  this.state.erroC - 1,
            })
        }

        //if (this.state.Descricao.length === 0) {
        //    $("#desc").addClass('errorBorder');
        //    this.setState({
        //        erroC:  this.state.erroC + 1,
        //    })
        //    erro++;
        //}
        //else {
        //    $("#desc").removeClass('errorBorder');
        //    this.setState({
        //        erroC:  this.state.erroC - 1,
        //    })
        //    erro--;
        //}

        if (this.state.Price.length === 0) {
            $("#valor").addClass('errorBorder');
            this.setState({
                erroC:  this.state.erroC + 1,
            })
            erro++;
        }
        else {
            $("#valor").removeClass('errorBorder');
            this.setState({
                erroC:  this.state.erroC - 1,
            })
            erro--;
        }

        if(this.state.list.initialTime > this.state.TempoFinal){
            console.log(this.state.list.initialTime,this.state.TempoFinal)
            $("#time").addClass('errorBorder');
            this.setState({
                erroC:  this.state.erroC + 1,
            })
            erro++;
        }
        else{
            $("#time").removeClass('errorBorder');
            this.setState({
                erroC:  this.state.erroC - 1,
            })
            erro--;
        }

        var finalizar = this.state.erroC;
        console.log(erro)
        //console.log(finalizar)
    /* Caso tudo der certo manda as coisas para o back*/
        if (erro <= -3) {
            //alert("entrou");
            console.log("Dados sendo retornado");
            event.preventDefault();

            var formData = new FormData();

            formData.append('name', String(this.state.Nome))
            //formData.append('description', String(this.state.Descricao))
            formData.append('initialTime', String(this.state.list.initialTime))
            formData.append('finalTime', String(this.state.TempoFinal))
            formData.append('price', String(this.state.Price))


            axios.post('/passportServices', formData)
                .then((response) => {
                    console.log(response)
                    //axios.get('/passportServices')
                       // .then((response) => {
                            console.log(response.data);
                            this.requisicao();
                       // })

                }).catch((error) => {
                    console.log(error)//LOG DE ERRO
                   //alert("Erro no Cadastro");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
        }else{
            this.setState({
                erroC: 0,
            })
        }
    }

    Salvar = (event) => {
        console.log('-------------------------------------')
        console.log(this.state.list2)
        console.log('-------------------------------------')
        // this.QuebraTempo = this.state.list2.time;
        // this.QuebraValor = this.state.list2.price;

        var formData = new FormData();

        formData.append('time', String(this.state.list2.time))
        formData.append('price', String(this.state.list2.price))


        axios.put('/passportServices/', formData)
            .then( (response)=>{
                console.log(response)
                this.requisicao();
                //window.location.href = '/ServicoPassaporte';
                this.setState({
                    salvarCerto:true,
                    mensApa:false,
                })
            }).catch( (error)=> {
                console.log(error)//LOG DE ERRO
                alert("Erro no Cadastro");
            })
    }

    Apagar = (event) => {
        const confirmacao = window.confirm("Deseja mesmo excluir esse serviço?");
        if (confirmacao === true) {
            this.setState({
                mensApa: true,
                salvarCerto:false,
            })
            const id = this.state.list[this.state.list.length - 1]._id;
            axios.delete(`/passportServices/${id}`)
                .then((response) => {
                    axios.get('/passportServices')
                        .then((response) => {
                            this.requisicao();
                        })
                });
        }
    }
    xaubanner(){
        this.state.mensApa = false;
    }
    Adicionar = (event) => {
        $.ajax({
            url: "/passportServices/initialTime",
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
                    console.log("Olar",response)
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
                    <div >
                        {this.state.mensApa  &&
                            (<div className="alert lert-danger" role="alert" style={{ background: "#00FF7F", width: 100 + '%' }}>
                                <strong style={{ color: 'white' }}>Serviço apagado com sucesso.</strong>
                            </div>)
                        }
                    </div>
                    <div >
                        {this.state.salvarCerto  &&
                            (<div className="alert lert-danger" role="alert" style={{ background: "#00FF7F", width: 100 + '%' }}>
                                <strong style={{ color: 'white' }}>Tempo excedente salvo com sucesso.</strong>
                            </div>)
                        }
                    </div>
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
                                                <th >Inicial (HH:MM)</th>
                                                <th> Final (HH:MM)</th>
                                                <th> Valor </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list.map((TempoServico, indice) => {
                                                return (
                                                    <tr key={TempoServico._id}>
                                                        <th id="paddingNome" scope="row">{indice + 1}</th>
                                                        <td id="paddingNome" > {TempoServico.name} </td>
                                                        <td id="paddingNome" >{TempoServico.initialTime} </td>
                                                        <td id="paddingNome" >{TempoServico.finalTime}</td>
                                                        <td id="paddingNome" > {TempoServico.price}</td>
                                                        {indice === (this.state.list.length - 1) && (<td> <button className="btn btn-md botao " onClick={this.Apagar}> <i className="fa fa-trash-o"></i> </button></td>)}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <div className="text-right">

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
                                                <input type="number" min={"0"} id="" name="QuebraTempo" className="form-QuebraTempo" min="1" className="text-center" placeholder="Tempo" value={this.state.list2.time} onChange={this.ChangeQuebraTempo} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12 text-center">
                                            <div className="graph" style={{ padding: 10 + "px" }} style={{ float: "none" }}>
                                                <h5 className="ltTitulo"><b> Valor (R$): </b></h5>
                                                <input type="number"  id="valor" name="QuebraValor" className="form-QuebraValor" min="0.00" className="text-center" placeholder="R$" step=".01" value={this.state.list2.price} onChange={this.ChangeQuebraValor} />
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
                    <div >
                        {this.state.erroC > 0 &&
                            (<div className="alert lert-danger" role="alert"  style ={{ background: "#ff6347",width: 100 + '%' }}>
                                <strong style ={{color: 'white'}}>Erro no preenchimento do formulário.</strong>
                            </div>)
                        }
                    </div>
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
                                            <input type="text" id="name" className="form-control " onChange={this.changueNome} value={this.state.Nome}></input>
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
                                                <input type="time" id="time"  className="form-control" onChange={this.changueTempoFinal} value={this.state.TempoFinal} style={{ width: 100 + "px", marginTop: -37 + "px" }}></input>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-12 col-xs-12 text-left">
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-xs-12 text-left">
                                            <br></br><br></br>
                                            <div className="graph" style={{ padding: 10 + "px" }} >
                                                <h5 className="ltTitulo"><b> Valor: </b></h5>
                                                <input type="text" id="valor" className="form-control text-center" onChange={this.changuePrice} value={this.state.Price} style={{ float: "none", margiTop: -30 + "px", }} placeholder={"R$"}></input>
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
