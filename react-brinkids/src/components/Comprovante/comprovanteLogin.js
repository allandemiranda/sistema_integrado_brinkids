
import React from 'react';
import './comprovante.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';


var servico;
var conteudo;
class ComprovanteLogin extends React.Component {
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

        }, 300);

    }
    render() {

       
        if (this.props.teste) {
            return (
                <div style={{ display: 'none' }} id='print' className='conteudo' >
                <div id="crianca" key={1}>
                    <a class="trilha">﻿﻿--------------------------------------</a>
                    <a class="naoFiscal">***** NOVO FUNCIONÁRIO *****</a>
                    <div id="funcinário" className="textos">
                        <div>
                            <a>Nome:</a>
                            <a id="nome">{this.props.tabela.nome}</a>
                        </div>
                        <div>
                            <a>Login:</a>
                            <a id="login">{this.props.tabela.login}</a>
                        </div>
                        <div>
                            <a>Senha:</a>
                            <a id="senha">senha123</a>
                        </div>
                        <div>
                            <a id="dia">{new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()}</a>
                            <a>-</a>
                            <a id="hora">{moment().format("HH:mm")}</a>
                        </div>
                    </div>
                    <a class="trilha">﻿﻿--------------------------------------</a>
                </div>
                </div>
            );
        }
    
    }
}


export default ComprovanteLogin;