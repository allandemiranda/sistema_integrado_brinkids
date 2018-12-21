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
        }



    }
    render() {
        return (
            <div className="container-fluid" >
                <div className="sub-heard-part" >
                    <ol className="breadcrumb m-b-0" >
                        <li > < a href="/" > Home </a></li >
                        <li >Visualizar Aniversarios </li>
                    </ol >
                </div>
                <div className="graph-visual" >
                    <h3 className="inner-tittle" >Aniversarios </h3>
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
                                            <td > {findAdult.name.firstName + ' ' + findAdult.name.surName} </td>
                                            <td > {findAdult.cpf} </td>
                                            <td className="text-center">
                                                <div className="form-group">

                                                    <select className="form-control" style={{ height: 47 + 'px' }} id="exampleFormControlSelect2" onChange={this.changueselect}>

                                                        {this.state.listadecargos.map((cargos, indice1) => {
                                                            if (findAdult.identifierEmployee.employeeData.officialPosition === cargos._id) {
                                                                console.log(cargos.name)
                                                                console.log(findAdult.identifierEmployee.employeeData.officialPosition, "----", cargos._id)
                                                                return (

                                                                    <option key={indice1 + 1} selected value={[indice, indice1]}  >{cargos.name}</option>
                                                                );
                                                            } else {
                                                                return (
                                                                    <option key={indice1 + 1} value={[indice, indice1]}>{cargos.name}</option>

                                                                );
                                                            }

                                                        })}
                                                    </select>
                                                </div>
                                            </td>
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
export default VisualizarAniversario; 