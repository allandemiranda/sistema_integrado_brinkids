
import React from 'react';
import './comprovante.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';


var servico;
var conteudo;
class Comprovantesaida extends React.Component {
    servico = this.props.serviso;

    componentDidMount() {
        conteudo = document.getElementById('print').innerHTML;
        console.log(conteudo)
        this.rederizar();
    }
    rederizar = () => {
        console.log(conteudo)
        const tela_impressao = window.open('about:blank');
        tela_impressao.document.write('<html><head>');
        tela_impressao.document.write('<link rel="stylesheet" type="text/css" href="comprovante.css" />');
        tela_impressao.document.write(('</head><style>html {background:transparent !important; color:#000 !important; text-shadow:none !important; filter:none !important; -ms-filter:none !important; width: 77mm; font-family: Consolas, monaco, monospace; font-style: normal; font-variant: normal; justify-content: center; align-items: center; } html body {width: 80mm; height: auto; } .trilha {width: 100%; font-size: 3.5mm; word-wrap: break-word; } .naoFiscal {width: 100%; font-size: 3.5mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .textos {width: 100%; font-size: 3.3mm; word-wrap: break-word; } .titulo7 {width: 100%; font-size: 3.6mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .espacoTitulo {margin-right: 1mm; } .textos .direita {float: right; padding-right: 2mm; } .criancas {margin-bottom: 2mm; } .atendente {margin-bottom: 2mm; } .rodape {width: 100%; font-size: 3.3mm; word-wrap: break-word; justify-content: center; align-items: center; display: flex; } table, th, td {border: 0px solid black; } th, td {padding: 0px; text-align: left; }</style><body>'));
        tela_impressao.document.write(conteudo);
        tela_impressao.document.write('</body></html>');


        tela_impressao.focus();

        setTimeout(function () {
            tela_impressao.print();

        }, 200);

    }
    render() {








        const byChild = function (events) {
            console.log(events);
            function Idade(aniversario) {
                const hoje = new Date;
                const nascimento = moment(aniversario).format('YYYYMMDD');
                console.log(nascimento);
                const a = moment(nascimento, "YYYYMMDD").fromNow();
                a.split(' ');
                console.log(a);
                return moment(nascimento, "YYYYMMDD").fromNow();
            }




            return (
                <div id="crianca" key={events.entrada.children.id}>
                    <div id="dados">
                        <a>Criança:</a>
                        <a id="nome"> {events.entrada.children.name}</a>
                        <div className="direita">
                        </div>
                    </div>
                    <div id="info">
                        <a>Parentesco:</a>
                        <a id="parentesco">{events.entrada.kinship}</a>
                        <div className="direita">
                            <a>Idade:</a>
                            <a id="idade">{Idade(events.entrada.children.birthday)}</a>
                        </div>
                    </div>
                    <div>
                        <a>Pacote:</a>
                        <a id="pacote">Passaporte</a>
                        <div className="direita">
                            <a>Entrada:</a>
                            <a id="hora">{moment(events.entrada.time).format("HH:MM")}</a>
                            <a>h</a>
                        </div>
                    </div>
                    <div id="obs">
                        <a>Observações:</a>
                        <a id="obsTexto">{events.entrada.children.observations}</a>
                    </div>
                    <div id="restrioes">
                        <a>Restrições:</a>
                        <a id="restricoesTexto">{events.entrada.children.restrictions}</a>
                    </div>
                    <a>-</a>
                </div>

            );




        }



        if (this.props.teste) {
            console.log(this.props.tabela)
            return (

                <div style={{ display: 'none' }} id='print' className='conteudo' >


                    <a className="trilha" >﻿﻿--------------------------------------</a>
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
                            <a id="nome"> {this.props.tabela[0].entrada.adult.name}</a>
                        </div>
                        <div>
                            <a>Telefone:</a>
                            <a id="telefone"> {this.props.tabela[0].entrada.adult.phone}</a>

                        </div>
                        <div id="obs">
                            <a>Observações:</a>
                            <a id="obsTexto">{this.props.tabela[0].entrada.adult.observations}</a>
                        </div>
                        <a>-</a>
                    </div>
                    <div className="criancas textos">
                        {this.props.tabela.map((evento) => byChild(evento))}
                        <div>
                            <a>Pertences: Gaveta</a>
                            <a id="gaveta"> {this.props.tabela[0].entrada.belongings + 1}</a>
                        </div>
                    </div>
                    <div id="datalhamento" class="textos">
                        <a>Detalhamento</a>
                        <table style={{width:100+'%'}}>
                            <thead>
                                <tr>
                                    <td>Serviço</td>
                                    <td>ID</td>
                                    <td>Quant.</td>
                                    <td>Valor</td>
                                </tr>
                            </thead>
                            <tbody id="servicos">
                                <tr>
                                    <td><a>PASSAPORTE</a></td>
                                    <td><a id="id">C01</a></td>
                                    <td><a id="tempo" class="espacoTitulo">123</a><a>min</a></td>
                                    <td><a class="espacoTitulo">R$</a><a id="valor">50,00</a></td>
                                </tr>
                                <tr>
                                    <td><a>ANIVERSÁRIO</a></td>
                                    <td><a id="id">C02</a></td>
                                    <td><a id="tempo" class="espacoTitulo">123</a><a>min</a></td>
                                    <td><a class="espacoTitulo">R$</a><a id="valor">0,00</a></td>
                                </tr>
                                <tr>
                                    <td><a>12345678911234567</a></td>
                                    <td><a id="id">123</a></td>
                                    <td><a id="tempo" class="espacoTitulo">123</a><a>min</a></td>
                                    <td><a class="espacoTitulo">R$</a><a id="valor">1234,12</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="direita" style={{marginBottom: 2+'mm'}}>
                            <a>Total:  R$</a>
                            <a id="valorServicos">0000,00</a>
                        </div>
                        <table style="width:100%">
                            <thead>
                                <tr>
                                    <td>Desconto</td>
                                    <td>ID</td>
                                    <td>Valor</td>
                                </tr>
                            </thead>
                            <tbody id="descontos">
                                <tr>
                                    <td><a>ANIVERSÁRIO 10%</a></td>
                                    <td><a id="id">C01</a></td>
                                    <td><a class="espacoTitulo">R$</a><a id="valor">10,00</a></td>
                                </tr>
                                <tr>
                                    <td><a>LOGISTA 10%</a></td>
                                    <td><a id="id">C02</a></td>
                                    <td><a class="espacoTitulo">R$</a><a id="valor">20,00</a></td>
                                </tr>
                                <tr>
                                    <td><a>12345678911234567892123</a></td>
                                    <td><a id="id">123</a></td>
                                    <td><a class="espacoTitulo">R$</a><a id="valor">1234,12</a></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="direita">
                            <a>Total:  R$</a>
                            <a id="valorDescontos">0000,00</a>
                        </div>
                        <div style={{marginTop: 6+'mm'}}>
                            <a>Valor pago: R$</a>
                            <a id="valor">1234,00</a>
                            <a>em</a>
                            <a id="metodo">1234567891123</a>
                        </div>
                    </div>
                    <div id="atendente" className="atendente textos">
                        <a>Atendente:</a>
                        <a> {this.props.tabela[0].funcionario}</a>
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
                    <a className="trilha">﻿﻿--------------------------------------</a>
                </div>
            );
        }
    }

}


export default Comprovantesaida;