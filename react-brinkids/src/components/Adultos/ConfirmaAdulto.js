import React from 'react';

import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/CadastroAdulto.css';

class ConfirmaAdulto extends React.Component {
    render() {
        return (
            <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > Cadastro </li>
                        <li > Adulto </li>
                    </ol >
                </div>
                <div className = "graph-visual" >
                    <h3 className = "inner-tittle" > Confirmando Cadastro </h3>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Perfil </h3>
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nome: </b></h5>
                                    <p>{this.props.Name}</p>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className = "row">
                            <div className = "col-md-6 col-sm-6 col-xs-12" >
                                <div className = "graph" style = {{ padding:10 + "px"}}>
                                    <h5 className="ltTitulo"><b>  CPF: </b> </h5>
                                    <p> {this.props.Cpf} </p>
                                </div>
                            </div>
                            <div className = "col-md-6 col-sm-6 col-xs-12" >
                                <div className = "graph" style = {{ padding:10 + "px"}}>
                                    <h5 className="ltTitulo"><b>  RG: </b> </h5>
                                    <p> {this.props.Rg} </p>
                                </div>            
                            </div>
                        </div>  

                        <br></br> 

                        <div className = "row" >
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Data de Nascimento: </b></h5>
                                    <p>{this.props.Date}</p>
                                </div>
                            </div>
                            <div className = "col-md-4 col-sm-4 col-xs-12" >
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Nacionalidade: </b></h5>
                                    <p>{this.props.Nacionalidade}</p>
                                </div>   
                            </div>                                        
                            <div className = "col-md-4 col-sm-4 col-xs-12" >
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Sexo: </b></h5>
                                    <p>{this.props.Sexo}</p>
                                </div> 
                            </div>
                        </div>   
                        
                        <br></br> 

                        <div className = "row">
                            <div className = "col-md-6 col-sm-6 col-xs-12" >
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Telefone: </b></h5>
                                    <p>{this.props.PhoneNumber}</p>
                                </div>  
                            </div>
                            <div className = "col-md-6 col-sm-6 col-xs-12" >
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Estado Civil: </b></h5>
                                    <p>{this.props.MaritalStatus}</p>
                                </div>  
                            </div>
                        </div>

                        <br></br>

                        <div className='row'>
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="graph ">
                                <h5 className="ltTitulo"> <b> Email:</b> </h5>
                                <p> {this.props.Email}</p>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-md-8 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Endereço: </b></h5>
                                    <p>{this.props.Address}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Bairro: </b></h5>
                                    <p>{this.props.Neighborhood}</p>
                                </div>
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Cidade: </b></h5>
                                    <p>{this.props.City}</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> CEP: </b></h5>
                                    <p>{this.props.Cep}</p>
                                </div>
                            </div>                      
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="graph" style = {{ padding:10 + "px"}}>
                                    <h5 className = "ltTitulo"><b> Observações: </b></h5>
                                    <p>{this.props.Observation}</p>
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

export default ConfirmaAdulto;


