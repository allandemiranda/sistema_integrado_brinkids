
import React from 'react';
import './comprovante.css';

class Comprovante extends React.Component {

render(){

    return(
    <body>
        <a className="trilha">﻿﻿--------------------------------------</a>
        <a className="naoFiscal">****** NÃO É DOCUMENTO FISCAL ******</a>
        <div className="titulo">
            <a className="espacoTitulo">BRINKIDS</a>
            <a className="espacoTitulo">-</a>
            <a id="data">01/01/2001</a>
        </div>
        <div className="titulo">
            <a className="espacoTitulo">SAÍDA</a>
            <a id="hora">01:01</a>
            <a className="espacoTitulo">h</a>
            <a className="espacoTitulo">-</a>
            <a className="espacoTitulo">PARCIAL</a>
        </div>
        <div id="responsavel" className="textos">
            <div>
                <a>Responsável:</a>
                <a id="nome">12345678911234567892123456</a>
            </div>
            <div>
                <a>Telefone:</a>
                <a id="telefone">(84)991151610</a>
                <div className="direita">
                    <a>ID:</a>
                    <a id="id">A01</a>
                </div>
            </div>
            <div id="obs">
                <a>Observações:</a>
                <a id="obsTexto">123456789112345678921234567893123456789123456789112345678921234567893123456789</a>
            </div>
            <a>-</a>
        </div>
        <div className="criancas textos">
            <div id="crianca">
                <div id="dados">
                    <a>Criança:</a>
                    <a id="nome">1234567891123456789212</a>
                    <div className="direita">
                        <a>ID:</a>
                        <a id="id">C01</a>
                    </div>
                </div>
                <div id="info">
                    <a>Parentesco:</a>
                    <a id="parentesco">12345678911234567</a>
                    <div className="direita">
                        <a>Idade:</a>
                        <a id="idade">12</a>
                    </div>
                </div>
                <div>
                    <a>Pacote:</a>
                    <a id="pacote">PASSAPORTE</a>
                    <div className="direita">
                        <a>Entrada:</a>
                        <a id="hora">10:10</a>
                        <a>h</a>
                    </div>
                </div>
                <div id="obs">
                    <a>Observações:</a>
                    <a id="obsTexto">123456789112345678921234567893123456789123456789112345678921234567893123456789</a>
                </div>
                <div id="restrioes">
                    <a>Restrições:</a>
                    <a id="restricoesTexto">123456789112345678921234567893123456789123456789112345678921234567893123456789</a>
                </div>
                <a>-</a>
            </div>
            <div id="crianca">
                <div id="dados">
                    <a>Criança:</a>
                    <a id="nome">1234567891123456789212</a>
                    <div className="direita">
                        <a>ID:</a>
                        <a id="id">C02</a>
                    </div>
                </div>
                <div id="info">
                    <a>Parentesco:</a>
                    <a id="parentesco">12345678911234567</a>
                    <div className="direita">
                        <a>Idade:</a>
                        <a id="idade">12</a>
                    </div>
                </div>
                <div>
                    <a>Pacote:</a>
                    <a id="pacote">ANIVERSÁRIO</a>
                    <div className="direita">
                        <a>Entrada:</a>
                        <a id="hora">10:10</a>
                        <a>h</a>
                    </div>
                </div>
                <div id="obs">
                    <a>Observações:</a>
                    <a id="obsTexto">123456789112345678921234567893123456789123456789112345678921234567893123456789</a>
                </div>
                <div id="restrioes">
                    <a>Restrições:</a>
                    <a id="restricoesTexto">123456789112345678921234567893123456789123456789112345678921234567893123456789</a>
                </div>
                <div id="aniversario">
                    <div>
                        <a>Aniversariante:</a>
                        <a id="nome">12345678912345678921234</a>
                    </div>
                    <div>
                        <a>Início:</a>
                        <a id="horaInicio">10:10</a>
                        <a>h</a>
                        <div className="direita">
                            <a>Finaliza:</a>
                            <a id="horaFim">10:10</a>
                            <a>h</a>
                        </div>
                    </div>
                </div>
                <a>-</a>
            </div>
            <div>
                <a>Pertences: Gaveta</a>
                <a id="gaveta">001</a>
            </div>
        </div>
        <div id="datalhamento" className="textos">
            <a>Detalhamento</a>
            <table style="width:100%">
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
                        <td><a id="tempo" className="espacoTitulo">123</a><a>min</a></td>
                        <td><a className="espacoTitulo">R$</a><a id="valor">50,00</a></td>
                    </tr>
                    <tr>
                        <td><a>ANIVERSÁRIO</a></td>
                        <td><a id="id">C02</a></td>
                        <td><a id="tempo" className="espacoTitulo">123</a><a>min</a></td>
                        <td><a className="espacoTitulo">R$</a><a id="valor">0,00</a></td>
                    </tr>
                    <tr>
                        <td><a>12345678911234567</a></td>
                        <td><a id="id">123</a></td>
                        <td><a id="tempo" className="espacoTitulo">123</a><a>min</a></td>
                        <td><a className="espacoTitulo">R$</a><a id="valor">1234,12</a></td>
                    </tr>
                </tbody>
            </table>
            <div className="direita" style="margin-bottom: 2mm;">
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
                        <td><a className="espacoTitulo">R$</a><a id="valor">10,00</a></td>
                    </tr>
                    <tr>
                        <td><a>LOGISTA 10%</a></td>
                        <td><a id="id">C02</a></td>
                        <td><a className="espacoTitulo">R$</a><a id="valor">20,00</a></td>
                    </tr>
                    <tr>
                        <td><a>12345678911234567892123</a></td>
                        <td><a id="id">123</a></td>
                        <td><a className="espacoTitulo">R$</a><a id="valor">1234,12</a></td>
                    </tr>
                </tbody>
            </table>
            <div className="direita">
                <a>Total:  R$</a>
                <a id="valorDescontos">0000,00</a>
            </div>
            <div style="margin-top: 6mm;">
                <a>Valor a pagar: R$</a>
                <a id="valor">1234,00</a>
            </div>
        </div>
        <div id="atendente" className="atendente textos" style="margin-top: 3mm;">
            <a>Atendente:</a>
            <a>1234567891123456789212345678</a>
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
    </body>

    );


}




}

export default Comprovante;