import React from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import ConfirmaAdulto from './ConfirmaAdulto.js';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/CadastroAdulto.css';
import './css/style.css';





class BuscaCrianca extends React.Component {
    constructor(){
        super();
        this.state = {
            childSearch: '',
        };  

       this.ChangechildSearch = this.ChangechildSearch.bind(this);
    }

    //Bloco que muda o status para o atual do formulario.
    ChangechildSearch(event){
        this.setState({childSearch: event.target.value});
    }  
    render() {

         return (
             <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > Cadastro </li>
                        <li >Adulto </li>
                    </ol >
                </div>
                <div className = "graph-visual" > 
                   <div className = "graph" >    
                        <h3 className = "inner-tittle" > Buscar Criança</h3>       
                        <div className=" text-center">       
                            <input type = "search" id = "childSearch" name = "childSearch"  className="form-control" value={this.state.childSearch} onChange={this.ChangechildSearch} />  
                            <button type="button" className="btn btn-md botao botaoAvançar"> Pesquisar </button>
                        </div>
                   </div>
               </div>
            </div>
        )
    }
}

export default BuscaCrianca;

