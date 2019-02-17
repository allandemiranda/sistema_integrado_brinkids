
import React from 'react';
import './comprovante.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';
import axios from 'axios';
var servico;
var conteudo;
var nomeFunc;
class ComprovanteParcial extends React.Component {
    servico = this.props.serviso;
    constructor(props) {
        super(props)
        this.state = {

            nomef: ""
        }

    }
    componentWillMount() {
        this.getFuncionario();
    }
    componentDidMount() {
        conteudo = document.getElementById('print').innerHTML;

        this.rederizar();
    }
    getFuncionario = () => {


        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);

        axios.get(`/employees/${b.id}`)
            .then((response) => {

                console.log(response.data)
                this.setState({
                    nomef: response.data[0].name.firstName + " " + response.data[0].name.surName
                })
                nomeFunc = response.data[0].name.firstName + " " + response.data[0].name.surName;


            })
            .catch((err) => console.log(err));

    }

    byChild = (events) => {

        return (
            <div id="crianca" key={events._id.toString()}>
                <div id="dados">
                    <a>Criança:</a>
                    <a id="nome"> {events.children.name}</a>
                    <div className="direita">
                    </div>
                </div>
                <div id="info">
                    <a>Parentesco:</a>
                    <a id="parentesco">{events.kinship}</a>
                    <div className="direita">
                        <a>Idade:</a>
                        <a id="idade">{moment(events.children.birthday, "YYYYMMDD").toNow(true)}</a>
                    </div>
                </div>
                <div>
                    <a>Pacote:</a>
                    <a id="pacote">{events.service}</a>
                    <div className="direita">
                        <a>Entrada:</a>
                        <a id="hora">{moment(events.time).format("HH:mm")}</a>
                        <a>h</a>
                    </div>
                </div>
                <div id="obs">
                    <a>Observações:</a>
                    <a id="obsTexto">{events.children.observations}</a>
                </div>
                <div id="restrioes">
                    <a>Restrições:</a>
                    <a id="restricoesTexto">{events.children.restrictions}</a>
                </div>
                {events.birthdayName != undefined && (<div id="aniversario">
                    <br/>
                        <div>
                            <a>Aniversariante:</a>
                            <a id="nome">{events.birthdayName}</a>
                        </div>
                        <div>
                            <a>Início:</a>
                            <a id="horaInicio">{moment(events.birthdayStart).format("HH:mm")} </a>
                            <a> h</a>
                            <div class="direita">
                                <a>Finaliza:</a>
                                <a id="horaFim">{moment(events.birthdayEnd).format("HH:mm")} </a>
                                <a> h</a>
                            </div>
                        </div>
                    </div>)}
                <a>-</a>
            </div>

        );



    }
    rederizar = () => {

        const tela_impressao = window.open('about:blank');
        tela_impressao.document.write('<!DOCTYPE html><html><head>');
        tela_impressao.document.write('<link rel="stylesheet" type="text/css" href="comprovante.css" />');
        tela_impressao.document.write(('</head><style>html {background:transparent !important; color:#000 !important; text-shadow:none !important; filter:none !important; -ms-filter:none !important; width: 77mm; font-family: Consolas, monaco, monospace; font-style: normal; font-variant: normal; justify-content: center; align-items: center; } html body {width: 80mm; height: auto; } .trilha {width: 100%; font-size: 3.5mm; word-wrap: break-word; } .naoFiscal {width: 100%; font-size: 3.5mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .textos {width: 100%; font-size: 3.3mm; word-wrap: break-word; } .titulo7 {width: 100%; font-size: 3.6mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .espacoTitulo {margin-right: 1mm; } .textos .direita {float: right; padding-right: 2mm; } .criancas {margin-bottom: 2mm; } .atendente {margin-bottom: 2mm; } .rodape {width: 100%; font-size: 3.3mm; word-wrap: break-word; justify-content: center; align-items: center; display: flex; } table, th, td {border: 0px solid black; } th, td {padding: 0px; text-align: left; }</style><body>'));
        tela_impressao.document.write(conteudo);
        tela_impressao.document.write('</body></html>');


        tela_impressao.focus();

        setTimeout(function () {
            tela_impressao.print();

        }, 400);

    }
    render() {

        return (

            <div style={{ display: 'none' }} id='print' className='conteudo' >


                <a className="trilha" >-------------------------------------</a>
                <a className="naoFiscal">****** NÃO É DOCUMENTO FISCAL ******</a>
                <div className="titulo7">
                    <a className="espacoTitulo">BRINKIDS</a>
                    <a className="espacoTitulo">-</a>
                    <a id="doc" className="espacoTitulo">ENTRADA</a>
                    <a className="espacoTitulo">-</a>
                    <a id="data">{new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()}</a>

                </div>
                <div id="responsavel" className="textos">
                    <div>
                        <a>Responsável:</a>
                        <a id="nome"> {this.props.tabela.adult.name}</a>
                    </div>
                    <div>
                        <a>Telefone:</a>
                        <a id="telefone"> {this.props.tabela.adult.phone}</a>

                    </div>
                    <div id="obs">
                        <a>Observações:</a>
                        <a id="obsTexto">{this.props.tabela.adult.observations}</a>
                    </div>
                    <a>-</a>
                </div>
                <div className="criancas textos">
                    {this.byChild(this.props.tabela)}
                    <div>
                        <a>Pertences: Gaveta</a>
                        <a id="gaveta"> {this.props.tabela.belongings }</a>
                    </div>
                    <br/>
                    <div id="datalhamento" className="textos">
                        <a>Detalhamento</a>
                        <br/>
                        <table style={{ width: 100 + '%' }}>
                            <thead>
                                <tr>
                                    <td>Serviço</td>

                                    <td>Quant.</td>
                                    <td>Valor</td>
                                </tr>
                            </thead>
                            <br/>
                            <tbody id="servicos">

                                <tr>
                                    <td><a>{this.props.tabela.service}</a></td>

                                    <td><a id="tempo" className="espacoTitulo">{this.props.tabela.valores.time}</a><a>min</a></td>
                                    <td><a className="espacoTitulo">R$</a><a id="valor">{this.props.tabela.valores.value}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <div id="atendente" className="atendente textos">
                        <a>Atendente:</a>
                        <a> {this.props.tabela.nomef}</a>
                    </div>
                    <div>
                        <div className="rodape">
                            <a>www.brinkidsonline.com.br</a>
                        </div>
                        <div className="rodape">
                            <a>contato@brinkidsonline.com.br</a>
                        </div>
                        <div className="rodape">
                            <a>Fone: (84) 3206-8293</a>
                        </div>
                    </div>
                    <a className="trilha">-------------------------------------</a>
                </div>
                </div>
                );
        
            }
        }
        
        
        
export default ComprovanteParcial;