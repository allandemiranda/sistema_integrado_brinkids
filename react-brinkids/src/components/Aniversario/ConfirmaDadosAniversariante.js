import React from 'react';
import moment from 'moment';

import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/style.css';
import './css/Cadastro_Aniversario.css';

class ConfirmaCrianca extends React.Component {
    render() {
        return (
            <div className = "container-fluid" >
                <div className = "sub-heard-part" >
                    <ol className = "breadcrumb m-b-0" >
                        <li > < a href = "/" > Home </a></li >
                        <li > Aniversario </li>
                    </ol >
                </div>
                <div className = "graph-visual" >
                    <h3 className = "inner-tittle" > Confirmando Dados do Aniversariante </h3>
                    <div className = "graph" >
                        <div className="row graph">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <h5 className = "ltTitulo"><b> Titulo do Aniversario: </b></h5>
                                <p>{this.props.Titulo}</p>
                            </div>
                        </div>
                        <br></br>
                        <div className="row graph">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Nome do Aniversariante: </b></h5>
                                <p>{this.props.Name}</p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Idade: </b></h5>
                                <p>{this.props.Idade}</p>
                            </div>
                        </div>
                        <br></br>
                        <div className="row graph">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <h5 className = "ltTitulo"><b> Data do Aniversário: </b></h5>
                                <p>{moment(this.props.Date).format("DD/MM/YYYY")}</p>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <h5 className = "ltTitulo"><b> Hora Inical: </b></h5>
                                <p>{moment(this.props.HI).format("HH:mm")}</p>
                            </div>)
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <h5 className = "ltTitulo"><b> Hora Final: </b></h5>
                                <p>{moment(this.props.HF).format("HH:mm")}</p>
                            </div>
                        </div>
                        <br></br>
                        <div className="row graph">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Quantidade de Crianças Convidadas: </b></h5>
                                <p>{this.props.CC}</p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Quantidade de Adultos Convidadas: </b></h5>
                                <p>{this.props.AC}</p>
                            </div>
                        </div>
                        <br></br>
                        <div className="row graph">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Valor pago pelo Aniversário: </b></h5>
                                <p>{this.props.Valor}</p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Forma de Pagamento: </b></h5>
                                <p>{this.props.Metodo}</p>
                            </div>
                        </div>
                        <br></br>
                        <div className="row graph">
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Descrição do Aniversário: </b></h5>
                                <p>{this.props.Descricao}</p>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12">
                                <h5 className = "ltTitulo"><b> Observação: </b></h5>
                                <p>{this.props.Obs}</p>
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


