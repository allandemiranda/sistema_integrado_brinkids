
import React from 'react';
import './comprovante.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';


var servico;
var conteudo;
class ComprovanteDesconto extends React.Component {
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
        tela_impressao.document.write(('</head><style type="text/css">html{background:transparent!important;color:#000!important;text-shadow:none!important;filter:none!important;-ms-filter:none!important;font-family:Consolas,monaco,monospace;font-style:normal;font-variant:normal;justify-content:center;align-items:center}html body{width:210mm;height:auto;font-size:4mm;margin-left:5mm;margin-right:5mm}.textoum{width:100%;font-weight:bolder;word-wrap:break-word;justify-content:center;align-items:center;display:flex;margin-bottom:2mm}table,th,td{border:0 solid black}table{width:100%}th,td{padding:0;text-align:left}</style><body>'));
        tela_impressao.document.write(conteudo);
        tela_impressao.document.write('</body></html>');


        tela_impressao.focus();

        setTimeout(function () {
            tela_impressao.print();

        }, 400);

    }
    render() {


        if (this.props.teste) {
            return (
                <div style={{ display: 'none' }} id='print' className='conteudo' >
                    <div>
                        <a class="textoum">----------------------------------------------------------------------------------------</a>
                    </div>
                    <br />
                    <div>
                        <a class="textoum">***** DESCONTOS GERADOS *****</a>
                    </div>
                    <br />
                    <div>
                        <a class="nome">Nome: </a>
                        <a class="nomeTexto">{this.props.tabela.name}</a>
                    </div>
                    <br />
                    <div>
                        <a class="descricao">Descrição: </a>
                        <a class="descricaoTexto">{this.props.tabela.description}</a>
                    </div>
                    <br/>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Codigo</th>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                    <th>Para</th>
                                    <th>Tipo C.</th>
                                    <th>Intervalo</th>
                                    <th>Validade</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.props.tabela.codes.map((desconto, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {desconto.numberCode} </td>
                                                    <td >{this.props.tabela.type} </td>
                                                    <td >{this.props.tabela.value} </td>
                                                    <td >{this.props.tabela.to} </td>
                                                    <td >{this.props.tabela.temporalityType} </td>
                                                    <td >{this.props.tabela.temporalityDate} </td>
                                                    <td >{moment(this.props.tabela.validity).add(1,"days").format("DD/MM/YYYY")} </td>
                                                </tr>
                                            );
                                        })}
                               
                            </tbody>
                        </table>
                        <br /><br/>
                    <a class="textoum">----------------------------------------------------------------------------------------</a>
                </div>
            );
        }

    }
}


export default ComprovanteDesconto;