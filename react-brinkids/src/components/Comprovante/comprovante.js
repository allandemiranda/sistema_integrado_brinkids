
import React from 'react';
import './comprovante.css';
//import NewWindow from 'react-new-window';
const stylse = {
    width: '74 mm',


}
class Comprovante extends React.Component {
    constructor(props) {
        super(props);

        this.imprimir = this.imprimir.bind();
    }

    imprimir() {

    }

    render() {
        if (this.props.teste) {
            var conteudo = document.getElementById('print').innerHTML,
            tela_impressao = window.open('about:blank');
            tela_impressao.document.write(conteudo);
            
            console.log('oakpoaf');
        }

        return (
            
                
            <div id='print' className='conteudo'>
            
                <body style={stylse}>
                <a className="trilha">﻿﻿--------------------------------------</a>
                <a className="naoFiscal">****** NÃO É DOCUMENTO FISCAL ******</a>
                <div className="titulo7">
                    <a className="espacoTitulo">BRINKIDS</a>
                    <a className="espacoTitulo">-</a>
                    <a id="doc" className="espacoTitulo">ENTRADA</a>
                    <a className="espacoTitulo">-</a>
                    <a id="data">01/01/2001</a>
                    
                </div>
                </body>
                </div>
                
            
           

        );



    }




}

export default Comprovante;