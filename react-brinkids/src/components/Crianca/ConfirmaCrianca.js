import React from 'react';

import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/Cadastro_Crianca.css';
import moment from 'moment';

class ConfirmaCrianca extends React.Component {
    render() {
        return (
            <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > Usuario </li>
                        <li > Crianças </li>
                    </ol >
                </div>
                <div className = "graph-visual" >
                    <h3 className = "inner-tittle" > Confirmando Cadastro </h3>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Perfil </h3>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome: </b></h5>
                                    <p>{this.props.Name}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data: </b></h5>
                                    <p>{moment(this.props.Date).format('DD/MM/YYYY')} </p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Sexo: </b></h5>
                                    <p>{this.props.Sexo}</p>
                                </div>    
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nacionalidade: </b></h5>
                                    <p>{this.props.Nacionalidade}</p>
                                </div>                            
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> RG/CPF/Passaporte: </b></h5>
                                    <p>{this.props.Number}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Restrições: </b></h5>
                                    <p>{this.props.Restricao}</p>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Observações: </b></h5>
                                    <p>{this.props.Observacao}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12 text-center">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Sua Foto: </b></h5>
                                    <img src = {this.props.File}/>
                                </div>
                            </div>
                        </div>
                        <br></br>
                    </div >
                </div>
            </div>
        )
    }
}

export default ConfirmaCrianca;


