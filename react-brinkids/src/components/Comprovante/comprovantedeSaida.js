
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

        this.rederizar();
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
    total = (event) => {
        let n = 0.0;
        event.map((aaa, indice) => {
            if (indice === 0 && aaa.hasOwnProperty('adult')) {
                
                if (aaa.hasOwnProperty('codigos')) {
                     n = n + parseFloat(aaa.adult.value) + parseFloat(aaa.codigos.value);
                } else {
                   
                    n = n + parseFloat(aaa.adult.value);
                }

            } else   if (aaa.hasOwnProperty('codigos')){
                
                n = n + parseFloat(aaa.codigos.value);
            }

        })
        return n.toFixed(2);
    }
    render() {








        const byChild = function (events) {

            function Idade(aniversario) {
                const hoje = new Date;
                const nascimento = moment(aniversario).format('YYYYMMDD');
                console.log(nascimento);
                const a = moment(nascimento, "YYYYMMDD").toNow(true);
                a.split(' ');

                return moment(nascimento, "YYYYMMDD").toNow(true);
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
                            <a id="hora">{moment(events.entrada.time).format("HH:mm")}</a>
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

            return (

                <div style={{ display: 'none' }} id='print' className='conteudo' >


                    <a className="trilha" >------------------------------------</a>
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
                    <div id="datalhamento" className="textos">
                        <a>Detalhamento</a>
                        <table style={{ width: 100 + '%' }}>
                            <thead>
                                <tr>
                                    <td>Serviço</td>

                                    <td>Quant.</td>
                                    <td>Valor</td>
                                </tr>
                            </thead>
                            <tbody id="servicos">
                                {this.props.tabela[0].valor3.map((event) => {
                                    return (
                                        <tr>
                                            <td><a>{event.service}</a></td>

                                            <td><a id="tempo" className="espacoTitulo">{event.time}</a><a>min</a></td>
                                            <td><a className="espacoTitulo">R$</a><a id="valor">{event.value}</a></td>
                                        </tr>
                                    );
                                })}

                            </tbody>
                        </table>
                        <div className="direita" style={{ marginBottom: 2 + 'mm' }}>
                            <a>Total:  R$</a>
                            <a id="valorServicos">{this.props.tabela[0].valor2}</a>
                        </div>
                        <table style={{ width: 100 + '%' }}>
                            <thead>
                                <tr>
                                    <td>Desconto</td>

                                    <td>Valor</td>
                                </tr>
                            </thead>
                            <tbody id="descontos">
                                {this.props.tabela[0].desconto.map((event, indice) => {
                                    if (indice === 0 && event.hasOwnProperty('adult')) {
                                        return (
                                            <>
                                                <tr>
                                                    {event.adult.type === "Porcentagem" && (<td><a>{event.adult.discount + " " + event.adult.ValueD + " %"}</a></td>)}
                                                    {event.adult.type === "Fixo" && (<td><a>{event.adult.discount + " " + event.adult.ValueD}</a></td>)}

                                                    <td><a className="espacoTitulo">R$</a><a id="valor"> {event.adult.value}</a></td>
                                                </tr>
                                                {event.hasOwnProperty('codigos') && (
                                                    <tr>
                                                        {event.codigos.type === "Porcentagem" && (<td><a>{event.codigos.discount + " " + event.codigos.ValueD + " %"}</a></td>)}
                                                        {event.codigos.type === "Fixo" && (<td><a>{event.codigos.discount + " " + event.codigos.ValueD}</a></td>)}

                                                        <td><a className="espacoTitulo">R$</a><a id="valor"> {event.codigos.value}</a></td>
                                                    </tr>
                                                )}
                                            </>
                                        );
                                    } else if (event.hasOwnProperty('codigos')) {
                                        return (
                                            <tr>
                                                {event.codigos.type === "Porcentagem" && (<td><a>{event.codigos.discount + " " + event.codigos.valueD + " %"}</a></td>)}
                                                {event.codigos.type === "Fixo" && (<td><a>{event.codigos.discount + " " + event.codigos.ValueD}</a></td>)}

                                                <td><a className="espacoTitulo">R$</a><a id="valor"> {event.codigos.value}</a></td>
                                            </tr>
                                        );
                                    }
                                })}

                            </tbody>
                        </table>
                        <div className="direita">
                            <a>Total:  R$</a>
                            <a id="valorDescontos">{this.total(this.props.tabela[0].desconto)}</a>
                        </div>
                        <div style={{ marginTop: 6 + 'mm' }}>
                            <a>Valor pago: R$ </a>
                            <a id="valor"> {this.props.tabela[0].valor} </a>
                            <a>em</a>
                            <a id="metodo"> {this.props.tabela[0].Form}</a>
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
                    <a className="trilha">------------------------------------</a>
                </div>
            );
        }
    }

}


export default Comprovantesaida;