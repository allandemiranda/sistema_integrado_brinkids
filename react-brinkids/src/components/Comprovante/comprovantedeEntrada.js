
import React from 'react';
import './comprovante.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';


var servico;
class Comprovante extends React.Component {
    servico = this.props.serviso;

    
    render  () {
       
        const rederizar = () => {
            var conteudo = document.getElementById('print').innerHTML;
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
        if (this.props.teste) {
            setTimeout(function () {
                rederizar();

            }, 1000);
        }
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
                <div id="crianca" key={events.children.id}>
                    <div id="dados">
                        <a>Criança:</a>
                        <a id="nome"> {events.children.name}</a>
                        <div className="direita">
                        </div>
                    </div>
                    <div id="info">
                        <a>Parentesco:</a>
                        <a id="parentesco">nao ta e4nviando</a>
                        <div className="direita">
                            <a>Idade:</a>
                            <a id="idade">{Idade(events.children.birthday)}</a>
                        </div>
                    </div>
                    <div>
                        <a>Pacote:</a>
                        <a id="pacote">Passaporte</a>
                        <div className="direita">
                            <a>Entrada:</a>
                            <a id="hora">{new Date().getHours() + ':' + new Date().getMinutes()}</a>
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
                    <a>-</a>
                </div>

            );




        }



        if (this.props.teste) {
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
                            <a id="nome"> {this.props.tabela.i[0].adult.name}</a>
                        </div>
                        <div>
                            <a>Telefone:</a>
                            <a id="telefone"> {this.props.tabela.i[0].adult.phone}</a>

                        </div>
                        <div id="obs">
                            <a>Observações:</a>
                            <a id="obsTexto">{this.props.tabela.i[0].adult.observations}</a>
                        </div>
                        <a>-</a>
                    </div>
                    <div className="criancas textos">
                        {this.props.tabela.i.map((evento) => byChild(evento))}
                        <div>
                            <a>Pertences: Gaveta</a>
                            <a id="gaveta"> {this.props.tabela.i[0].belongings}</a>
                        </div>
                    </div>
                    <div id="atendente" className="atendente textos">
                        <a>Atendente:</a>
                        <a> {this.props.tabela.funcionario}</a>
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


export default Comprovante;