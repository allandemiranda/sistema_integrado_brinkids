import React from 'react';
import update from 'react-addons-update';
import axios from 'axios';
import $ from 'jquery';
import TypesInput from '../TypesInput.js';
import ConfDadosAni from './ConfirmaDadosAniversariante.js'
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Cadastro_Aniversario.css';
import './css/style.css';

class VisualizarAniversario extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            list: [],
            Page:"Lista",
        }



    }
    render() {
        if (this.state.Page === "Lista") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li >Visualizar Aniversarios </li>
                        </ol >
                    </div>
                    <div className="graph-visual">
                        <h3 className="inner-tittle">Aniversarios </h3>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titulo</th>
                                        <th >Aniversariante</th>
                                        <th >Responsavel</th>
                                        <th> Data </th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {


                                        return (
                                            <tr key={indice + 1}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.title} </td>
                                                <td > {findAdult.birthdayPerson.name} </td>
                                                <td > {findAdult.cpf} </td>
                                                <td > {findAdult.start} </td>

                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default VisualizarAniversario; 