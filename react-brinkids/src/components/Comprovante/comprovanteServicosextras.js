
import React from 'react';
import './comprovante.css';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import moment from 'moment';
var servico;
class Comprovanteservico extends React.Component {
    servico = this.props.serviso;


    render() {
        // getFuncionario = () => {


        //     const a = getToken();
        //     const b = jwt.verify(a, config.secret_auth);
    
        //     axios.get(`/employees/${b.id}`)
        //         .then((response) => {
    
        //             this.setState({
        //                 nomeFunc: response.data[0].name.firstName + " " + response.data[0].name.surName,
        //             })
    
        //         })
        //         .catch((err) => console.log(err));
    
        // }
        const rederizar = () => {
            
            var conteudo = document.getElementById('print').innerHTML;
            const tela_impressao = window.open('about:blank');
            tela_impressao.document.write('<html><head>');
            tela_impressao.document.write('<link rel="stylesheet" type="text/css" href="comprovante.css" />');
            tela_impressao.document.write(('</head><style>html {background:transparent !important; color:#000 !important; text-shadow:none !important; filter:none !important; -ms-filter:none !important; width: 77mm; font-family: Consolas, monaco, monospace; font-style: normal; font-variant: normal; justify-content: center; align-items: center; } html body {width: 74mm; } .trilha {width: 100%; font-size: 3.5mm; word-wrap: break-word; } .naoFiscal {width: 100%; font-size: 3.5mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .textos {width: 100%; font-size: 3.3mm; word-wrap: break-word; } .titulo7 {width: 100%; font-size: 3.6mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .espacoTitulo {margin-right: 1mm; } .textos .direita {float: right; padding-right: 2mm; } .criancas {margin-bottom: 2mm; } .atendente {margin-bottom: 2mm; } .rodape {width: 100%; font-size: 3.3mm; word-wrap: break-word; justify-content: center; align-items: center; display: flex; } table, th, td {border: 0px solid black; } th, td {padding: 0px; text-align: left; }</style><body>'));
            tela_impressao.document.write(conteudo);
            tela_impressao.document.write('</body></html>');
        }
        if (this.props.teste) {
            setTimeout(function () {
                rederizar();

            }, 1000);
        }
        return (
            <div style={{ display: 'none' }} id='print' className='conteudo'>

                <a class="trilha">----------------------------------</a>
                <a class="naoFiscal">*** NÃO É DOCUMENTO FISCAL ***</a>
                <div class="titulo">
                    <a class="espacoTitulo">BRINKIDS</a>
                    <a class="espacoTitulo">-</a>
                    <a id="data">{new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()}</a>
                    <a class="espacoTitulo">-</a>
                    <a id="hora">{new Date().getHours() + ':' + new Date().getMinutes()}</a>
                </div>
                <div class="titulo">
                    <a class="espacoTitulo">Produto / Serviço</a>
                </div>
                <div id="datalhamento" class="textos">
                    <a>Detalhamento</a>
                    <table style="width:100%">
                        <thead>
                            <tr>
                                <td>Serviço / Produto</td>
                                <td>Quant.</td>
                                <td>Valor</td>
                            </tr>
                        </thead>
                        <tbody id="servicos">

                        </tbody>
                    </table>
                    <div class="direita" style="margin-bottom: 2mm;">
                        <a>Total:  R$</a>
                        <a id="valorServicos">0000,00</a>
                    </div>
                    <div style="margin-top: 6mm;">
                        <a>Valor pago: R$</a>
                        <a id="valor">1234,00</a>
                        <a>em</a>
                        <a id="metodo">1234567891123</a>
                    </div>
                </div>
                <div id="atendente" class="atendente textos" style="margin-top: 3mm;">
                    <a>Atendente:</a>
                    <a>1234567891123456789212345678</a>
                </div>
                <div>
                    <div class="rodape">
                        <a>www.brinkidsonline.com.br</a>
                    </div>
                    <div class="rodape">
                        <a>contato@brinkidsonline.com.br</a>
                    </div>
                    <div class="rodape">
                        <a>Fone: (84) 3206-8293</a>
                    </div>
                </div>
                <a class="trilha">----------------------------------</a>

            </div >
        );
    }

}


export default Comprovanteservico;