
import React from 'react';

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
            tela_impressao.document.write('<!DOCTYPE html><html><head>');

            tela_impressao.document.write('<link rel="stylesheet" type="text/css" href="comprovante.css" />');
            tela_impressao.document.write(('</head><style>html {background:transparent !important; color:#000 !important; text-shadow:none !important; filter:none !important; -ms-filter:none !important; width: 77mm; font-family: Consolas, monaco, monospace; font-style: normal; font-variant: normal; justify-content: center; align-items: center; } html body {width: 80mm; height: auto; } .trilha {width: 100%; font-size: 3.5mm; word-wrap: break-word; } .naoFiscal {width: 100%; font-size: 3.5mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .textos {width: 100%; font-size: 3.3mm; word-wrap: break-word; } .titulo7 {width: 100%; font-size: 3.6mm; font-weight: bolder; word-wrap: break-word; justify-content: center; align-items: center; display: flex; margin-bottom: 2mm; } .espacoTitulo {margin-right: 1mm; } .textos .direita {float: right; padding-right: 2mm; } .criancas {margin-bottom: 2mm; } .atendente {margin-bottom: 2mm; } .rodape {width: 100%; font-size: 3.3mm; word-wrap: break-word; justify-content: center; align-items: center; display: flex; } table, th, td {border: 0px solid black; } th, td {padding: 0px; text-align: left; }</style><body>'));
            tela_impressao.document.write(conteudo);
            tela_impressao.document.write('</body></html>');
            tela_impressao.focus();
            
            setTimeout( () =>{
                tela_impressao.print();

            }, 200);
        }
        if (this.props.teste) {
            setTimeout(function () {
                rederizar();

            }, 400);
        }

        const produtos = () => {

        }
        return (
            <div style={{ display: 'none' }} id='print' className='conteudo'>

                <a className="trilha">----------------------------------</a>
                <a className="naoFiscal">*** NÃO É DOCUMENTO FISCAL ***</a>
                <div className="titulo7">
                    <a className="espacoTitulo">BRINKIDS</a>
                    <a className="espacoTitulo">-</a>
                    <a id="data">{new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()}</a>
                    <a className="espacoTitulo">-</a>
                    <a id="hora">{new Date().getHours() + ':' + new Date().getMinutes()}</a>
                </div>
                <div className="titulo7">
                    <a className="espacoTitulo">Produto / Serviço</a>
                </div>
                <div id="datalhamento" className="textos">
                    <a>Detalhamento</a>
                    <table style={{ width: 100 + '%' }} >
                        <thead>
                            <tr>
                                <td>Serviço / Produto</td>
                                <td>Quant.</td>
                                <td>Valor</td>
                            </tr>
                        </thead>
                        <tbody id="servicos">
                            {this.props.tabela.carrinho.map((findproduct, indice) => {
                                console.log(this.props.tabela.carrinho)
                                console.log(findproduct)
                                return (

                                    <tr key={findproduct._id}>
                                        <td><a>{findproduct.produto.name}</a></td>
                                        <td><a id="quantidade" class="espacoTitulo">{findproduct.quan} </a></td>
                                        <td><a classa="espacoTitulo">R$</a><a id="valor">{findproduct.produto.value}</a></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="direita" style={{marginBottom: 2+'mm'}}>
                        <a>Total:  R$</a>
                        <a id="valorServicos">{this.props.tabela.Total}</a>
                    </div>
                    <div  style={{marginTop: 6+'mm'}} >
                        <a>Valor pago: R$</a>
                        <a id="valor">{this.props.tabela.Total} </a>
                        <a> em </a>
                        {this.props.tabela.metodo === "Debito" && (<a id="metodo">Débito</a>)}
                        {this.props.tabela.metodo === "Credito" && (<a id="metodo">Crédito</a>)}
                        {this.props.tabela.metodo=== "Dinheiro" && (<a id="metodo">Dinheiro</a>)}     
                        
                    </div>
                </div>
                <div id="atendente" className="atendente textos" style={{marginTop: 3+'mm'}} >
                    <a>Atendente:</a>
                    <a>{this.props.tabela.name}</a>
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
                <a className="trilha">----------------------------------</a>

            </div >

        );
    }

}


export default Comprovanteservico;