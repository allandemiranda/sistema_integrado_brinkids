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

import $ from "jquery";



class childSearch extends React.Component {
    constructor(){
        super();
        this.state = {
            childSearch: '',
            list:[],
            errr:'',
            achado: false,
        };  

       this.ChangechildSearch = this.ChangechildSearch.bind(this);
       this.Search = this.Search.bind(this)
    }

    //Bloco que muda o status para o atual do formulario.
    ChangechildSearch(event){
        this.setState({childSearch: event.target.value});
    }  

    // Faz a busca das crianças
    Search(event){
        $.ajax({
            url: "http://localhost:3001/child/filter/" + this.state.childSearch,
            dataType:'json',
            type: 'GET',
            error: function(response){
              if( response.length === 0){this.setState({erro: "* Nenhum Criança Encontrada."})}           
            },
            success: function(response){    //Imprime os resutados encontrados na forma de tabela
                console.log(response);
                this.setState({achado: true});
                this.setState({list: response});
            }.bind(this)
          });
    }

    // (Gabriel): Essa função n desmonstrou funcionamento para renderizar os dados
    // Então eu coloquei tudo em 'render()' e ajeitei detalhes da função 'map' para
    // exibir os dados
    // componentDidMount(){
    //     if (this.state.achado === true){
    //     return(
    //         <table className="table">
    //             <thead>
    //                 <tr>
    //                     <th>#</th>
    //                     <th >Nome</th>
    //                     <th >Idade</th>
    //                     <th >RG</th>
    //                     <th className="text-center"> Selecionar </th>
    //                 </tr>
    //             </thead>
                
    //             <tbody>
    //                 {this.state.list.map((findChild) => {
    //                         return(
    //                             <tr>
    //                                 <th scope="row">{findChild._id}</th>
    //                                 <td > {findChild.firstName} </td>
    //                                 <td >{findChild.birthday} </td>
    //                                 <td >{findChild.rg} </td>
    //                                 <td className="text-center">    <input type="checkbox" name="selectchild" value="true" /> </td>
    //                             </tr>

    //                         );
    //                     })}
    //             </tbody>
    //     </table>
    //     )
    //     }
    //     <div className="text-center">
    //         <a className="btn btn-md botao" href="/">Cencelar</a>
    //         <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaBusca}>Avançar</button>
    //     </div>
    // }

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
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.Search}> Pesquisar </button>
                            </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className = "graph" > {/* (Gabriel): Aqui está o conteúdo da função 'componentDidMount' */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th >Nome</th>
                                    <th >Idade</th>
                                    <th >RG</th>
                                    <th className="text-center"> Selecionar </th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {this.state.list.map((findChild) => {
                                        return(
                                            <tr key={findChild._id}>
                                                <th scope="row">{findChild._id}</th>
                                                <td > {findChild.name.firstName} </td>
                                                <td >{findChild.birthday} </td>
                                                <td >{findChild.number} </td>
                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" /> </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.ValidaBusca}>Avançar</button>
                        </div>
                    </div> {/* (Gabriel): Fim do conteúdo de 'componentDidMount' */}
               </div>
            </div>
        )
    }
}

export default childSearch;

