import React from 'react';
import $ from 'jquery';



import '../../assets/style/bootstrap.min.css';
import '../../assets/style/fontawesome.css';
import moment from 'moment';
import '../../assets/style/all.css';
import './css/GF.css';
import TypesInput from '../TypesInput.js';
import axios from 'axios';

//import { Tabs, Tab } from 'react-bootstrap-tabs';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,

    BarChart,
    Bar,
    ReferenceLine,
} from 'recharts';

{/* Dados responsáveis por gerar o gráfico da tela 1 */ }
const dados = [
    { name: '01/Jan', Passaporte: 4, Aniversario: 4, ServicoProduto: 4, Total: 2 },
    { name: '02/Jan', Passaporte: 7, Aniversario: 5, ServicoProduto: 4, Total: 0.1 },
    { name: '03/Jan', Passaporte: 6, Aniversario: 9, ServicoProduto: 4, Total: 8 },
    { name: '04/Jan', Passaporte: 1, Aniversario: 3, ServicoProduto: 4, Total: 2 },
    { name: '05/Jan', Passaporte: 8, Aniversario: 4, ServicoProduto: 4, Total: 6 },
    { name: '06/Jan', Passaporte: 5, Aniversario: 8, ServicoProduto: 4, Total: 9 },
    { name: '06/Jan', Passaporte: 10, Aniversario: 8, ServicoProduto: 4, Total: 8 },
    { name: '07/Jan', Passaporte: 11, Aniversario: 8, ServicoProduto: 4, Total: 68 },
    { name: '08/Jan', Passaporte: 1, Aniversario: 8, ServicoProduto: 4, Total: 8 },
    { name: '09/Jan', Passaporte: 0, Aniversario: 8, ServicoProduto: 4, Total: 78 },
    { name: '10/Jan', Passaporte: 16, Aniversario: 8, ServicoProduto: 4, Total: 88 },
    { name: '11/Jan', Passaporte: 14, Aniversario: 8, ServicoProduto: 4, Total: 8 },
    { name: '12/Jan', Passaporte: 20, Aniversario: 8, ServicoProduto: 4, Total: 18 },
    { name: '13/Jan', Passaporte: 10, Aniversario: 8, ServicoProduto: 4, Total: 38 },
    { name: '14/Jan', Passaporte: 50, Aniversario: 83, ServicoProduto: 4, Total: 8 },
    { name: '15/Jan', Passaporte: 50, Aniversario: 8, ServicoProduto: 4, Total: 8 },

];

class GerenciamentoFinanceiro extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            ListaGrafico: [],
            ListaFluxo: [],
            ROpr: "true",
            RAtv: "true",
            RData: "true",
            Operador: "",
            Atividade: "",
            DataEntrada: "",
            DataSaida: "",
            GraficoTab: "tab-current",
            FluxoTab: "",

            sectionGrafico: "content-current",
            sectionFluxo: "",

        };
        this.selectGrafico = this.selectGrafico.bind(this);
        this.selectFluxo = this.selectFluxo.bind(this);
        this.ChangeValue = this.ChangeValue.bind(this);
        this.requisicao = this.requisicao.bind(this);
        this.inteval = this.inteval.bind(this);
    }
    inteval(event) {

    }
    requisicao(event) {
        axios.get('/log')
            .then((response) => {
                this.setState({ ListaFluxo: response.data });
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    }
    componentWillMount() {

        this.requisicao();
        this.inteval = setInterval(this.requisicao, 60000);

    }
    componentWillUnmount() {
        clearInterval(this.inteval);
    }
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    selectGrafico(event) {
        this.setState({
            GraficoTab: "tab-current",
            FluxoTab: "",

            sectionGrafico: "content-current",
            sectionFluxo: "",
        })
    }
    selectFluxo(event) {
        this.setState({
            GraficoTab: "",
            FluxoTab: "tab-current",

            sectionGrafico: "",
            sectionFluxo: "content-current",
        })
    }

    ROpe = (event) => {
        event.preventDefault();
        if (this.state.ROpr === "true") {
            $("#Operador").addClass('displaynone');
            this.setState({
                ROpr: "false",
                Operador: "",
            })
        }
        else {
            $("#Operador").removeClass('displaynone');
            this.setState({
                ROpr: "true",
            })
        }
    }
    RAtv = (event) => {
        event.preventDefault();
        console.log("entrei");
        if (this.state.RAtv === "true") {
            $("#Atividade").addClass('displaynone');
            this.setState({
                RAtv: "false",
                Atividade: "",
            })
        }
        else {
            $("#Atividade").removeClass('displaynone');
            this.setState({
                RAtv: "true",
            })
        }
    }
    RData = (event) => {
        event.preventDefault();
        if (this.state.RData === "true") {
            $("#DataEntrada").addClass('displaynone');
            $("#DataSaida").addClass('displaynone');
            this.setState({
                RData: "false",
                DataEntrada: "",
                DataSaida: "",
            })
        }
        else {
            $("#DataEntrada").removeClass('displaynone');
            $("#DataSaida").removeClass('displaynone');
            this.setState({
                RData: "true",
            })
        }
    }

    BuscarFluxo = (event) => {
        event.preventDefault();

        console.log(this.state);

        var erros = [];

        if (this.state.Operador === "" && this.state.Atividade === "" && this.state.DataEntrada === "" && this.state.DataSaida === "") {
            $("#Operador").addClass('errorBorder');
            $("#Atividade").addClass('errorBorder');
            $("#DataEntrada").addClass('errorBorder');
            $("#DataSaida").addClass('errorBorder');
            erros.push("Busca não pode ser em branco");
        }
        else {
            $("#Operador").removeClass('errorBorder');
            $("#Atividade").removeClass('errorBorder');
            $("#DataEntrada").removeClass('errorBorder');
            $("#DataSaida").removeClass('errorBorder');
        }
        if (erros.length > 0) {
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            $("#SucessDiv").addClass('displaynone').removeClass('alert-success');
            return;
        }
        else {
            $("#alertDiv").addClass('displaynone').removeClass('alert-danger');
            $("#SucessDiv").addClass('alert-success').removeClass('displaynone');

            // axios.get()
            //     .then(function (response) {
            //         this.setState({ ListaFluxo: response.data });
            //         console.log(response);
            //         $("#SucessDiv").addClass('alert-success').removeClass('displaynone');
            //     }).catch(function (error) {
            //         console.log(error)//LOG DE ERRO
            //         $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
            //         // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            //         // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            //         // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
            //     })

        }
    }

    grafico(event) {
        event.preventDefault();
        for (var i = 1; i <= 30; i++) {
            let hj = moment().format("MM/DD/YYYY");
            var novo = moment(hj).subtract(i, 'days').calendar();
            console.log(novo);

            axios.get('http://localhost:3001/TelaMKT' + novo)
                .then((response) => {
                    console.log(response.data);
                    this.setState.ListaGrafico.pop(response.data);
                })
                .catch((err) => console.log(err));
        }
    }


    render() {
        return (

            <div className="container-fluid" >
                <script src="js/jquery-1.10.2.min.js"></script>
                <script type="text/javascript" src="js/modernizr.custom.04022.js"></script>

                <div className="sub-heard-part" >
                    <ol className="breadcrumb m-b-0" >
                        <li > < a href="/" > Home </a></li >
                        <li > Gerenciamento Financeiro </li >
                    </ol >
                </div>


                <div id="tabs" class="tabs">

                    <div class="graph">
                        <nav>
                            <ul>
                                <li id="GraficoTab" name="GraficoTab" onClick={this.selectGrafico} className={this.state.GraficoTab}><a><span class="far fa-chart-bar"></span> <span>Grafico</span></a></li>

                                <li id="FluxoTab" name="FluxoTab" onClick={this.selectFluxo} className={this.state.FluxoTab}><a><span class="fas fa-chart-pie"></span> <span>Fluxo Operacional</span></a></li>


                            </ul>
                        </nav>
                        <div className="content tab">
                            <section className={this.state.sectionGrafico}  >
                                <br></br>
                                <div class="graph graph-visual text-center">
                                    <h5>Janeiro/2012</h5>
                                    <LineChart className="grafico" width={800} height={600} data={dados} margin={{ top: 5, right: 30, bottom: 5 }}>
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Passaporte" stroke="rgb(5, 41, 99)" />
                                        <Line type="monotone" dataKey="Aniversario" stroke="rgb(0, 198, 215)" />
                                        <Line type="monotone" dataKey="ServicoProduto" stroke="rgb(234, 76, 137)" />
                                        <Line type="monotone" dataKey="Total" stroke="#82ca98" />
                                    </LineChart>
                                    <br></br>
                                    <div className="text-center">
                                        <button className="btn botaoAvancar" onClick={this.grafico}>Atualizar</button>
                                    </div>
                                </div>
                            </section>

                            <section className={this.state.sectionFluxo}>
                                <br></br>
                                <div class="graph graph-visual tables-main">
                                    <div className="graph-visual">
                                        <div id="alertDiv" className="alert displaynone" role="alert">
                                            <b>ERRO!</b> Ah algo de errado em seu formulario ou busca.
                                        </div>
                                        <div id="SucessDiv" className="alert displaynone" role="alert">
                                            <b>Sucesso!</b> Busca Concluida.
                                        </div>
                                        <form id="busca-fluxo">
                                            <div className="row">
                                                <div className="col-md-1 col-sm-1 col-xs-1">
                                                    <button className="btn botao tam" onClick={this.ROpe}><i class="fas fa-times"></i></button>
                                                </div>
                                                <TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Operador: "} type={"text"} id={"Operador"} name={"Operador"} Class={"form-control"}
                                                    value={this.state.Operador} onChange={this.ChangeValue}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-1 col-sm-1 col-xs-1">
                                                    <button className="btn botao tam" onClick={this.RAtv}><i class="fas fa-times"></i></button>
                                                </div>
                                                <TypesInput cod={1} ClassDiv={"col-md-11 col-sm-11 col-xs-11"} ClassLabel={"LetraFormulario"} NameLabel={"Ativdade: "} type={"test"} id={"Atividade"} name={"Atividade"} Class={"form-control"}
                                                    value={this.state.Atividade} onChange={this.ChangeValue} />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-1 col-sm-1 col-xs-1">
                                                    <button className="btn botao tam" onClick={this.RData}><i class="fas fa-times"></i></button>
                                                </div>
                                                <TypesInput cod={1} ClassDiv={"col-md-5 col-sm-5 col-xs-5"} ClassLabel={"LetraFormulario"} NameLabel={"Data Entrada: "} type={"date"} id={"DataEntrada"} name={"DataEntrada"} Class={"form-control"}
                                                    value={this.state.DataEntrada} onChange={this.ChangeValue}
                                                />
                                                <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-6 col-xs-6"} ClassLabel={"LetraFormulario"} NameLabel={"Data Saida: "} type={"date"} id={"DataSaida"} name={"DataSaida"} Class={"form-control"}
                                                    value={this.state.DataSaida} onChange={this.ChangeValue}
                                                />
                                            </div>
                                            <br></br>
                                            <div className="text-right">
                                                <button className="btn botaoAvancar " onClick={this.BuscarFluxo}>Buscar</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="tables table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th style={{ textAlign: "center" }}>Atividade</th>
                                                    <th style={{ textAlign: "center" }}>Ação</th>
                                                    <th style={{ textAlign: "center" }}>Data</th>
                                                    <th style={{ textAlign: "center" }}>Operador</th>
                                                    <th style={{ textAlign: "center" }}>Operado</th>
                                                    <th style={{ textAlign: "center" }}>Operado Carbono</th>
                                                    <th style={{ textAlign: "center" }}>Valor</th>
                                                    <th style={{ textAlign: "center" }}>Metodo de Pagamento</th>
                                                    <th style={{ textAlign: "center" }}>Data Entrada</th>
                                                    <th style={{ textAlign: "center" }}>Data Saída</th>
                                                    <th style={{ textAlign: "center" }}>Disconto Codigo</th>
                                                    <th style={{ textAlign: "center" }}>Disconto Tipo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.ListaFluxo.map((fluxo, indice) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row" >{indice + 1}</th>
                                                            <td style={{ textAlign: "center" }}><a style={{ color: "inherit" }} >{fluxo.activity}</a></td>
                                                            <td style={{ textAlign: "center" }}>{fluxo.action}</td>
                                                            <td style={{ textAlign: "center" }} ><a >{moment(fluxo.dateOperation).format("DD/MM/YYYY HH:mm")}</a></td>
                                                            <td style={{ textAlign: "center" }}>{fluxo.from}</td>

                                                            {fluxo.to !== undefined && (<td style={{ textAlign: "center" }}>{fluxo.to}</td>)}
                                                            {fluxo.to === undefined && (<td style={{ textAlign: "center" }}>--</td>)}

                                                            {fluxo.cco !== undefined && (<td style={{ textAlign: "center" }}>{fluxo.cco}</td>)}
                                                            {fluxo.cco === undefined && (<td style={{ textAlign: "center" }}>--</td>)}

                                                            {fluxo.price !== undefined && (<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }}>{fluxo.price}</a></td>)}
                                                            {fluxo.price === undefined && (<td style={{ textAlign: "center" }}><a style={{ color: "inherit" }}>--</a></td>)}

                                                            {fluxo.priceMethod !== undefined && (<td style={{ textAlign: "center" }}>{fluxo.priceMethod}</td>)}
                                                            {fluxo.priceMethod === undefined && (<td style={{ textAlign: "center" }}>--</td>)}

                                                            {fluxo.timeLojaFirst !== undefined && (<td style={{ textAlign: "center" }}>{fluxo.timeLojaFirst}</td>)}
                                                            {fluxo.timeLojaFirst === undefined && (<td style={{ textAlign: "center" }}>--</td>)}

                                                            {fluxo.timeLojaLast !== undefined && (<td style={{ textAlign: "center" }}>{fluxo.timeLojaLast}</td>)}
                                                            {fluxo.timeLojaLast === undefined && (<td style={{ textAlign: "center" }}>--</td>)}


                                                            {fluxo.priceDiscount == undefined && (<td style={{ textAlign: "center" }} ><a>--</a></td>)}
                                                            {fluxo.priceDiscount != undefined && (<td style={{ textAlign: "center" }} ><a>{fluxo.priceDiscount.code}</a></td>)}

                                                            {fluxo.priceDiscount === undefined && (<td style={{ textAlign: "center" }} ><a>--</a></td>)}
                                                            {fluxo.priceDiscount !== undefined && (<td style={{ textAlign: "center" }} ><a>{fluxo.priceDiscount.type}</a></td>)}
                                                        </tr>
                                                    );
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>


                </div>
            </div>
        );
    }
}
export default GerenciamentoFinanceiro;
