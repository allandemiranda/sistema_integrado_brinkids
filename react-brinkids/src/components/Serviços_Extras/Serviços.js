import React from 'react';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import TypesInput from '../TypesInput.js';
import './estilo.css'

class Servico extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Nome:'',
            Tipo:'Serviço',
            Text:201,
        }
        this.enviar = this.enviar.bind(this);
    }
    enviar(event) {
       this.setState({
           Text:event.target.value,
       })
    }

    render() {

        
        return (
            <div className="container-fluid" >
                <div className="sub-heard-part" >
                    <ol className="breadcrumb m-b-0" >
                        <li > < a href="/" > Home </a></li >
                        <li > Serviços </li>
                        <li > Novo </li>
                    </ol >
                </div>
                <div className="graph-visual" >
                    <h3 className="inner-tittle" > Novo </h3>
                    <div className="graph" >
                        <div className="graph" >


                            <div className="row" > <p className=" col-md-1">Nome:</p>
                                <div className="col-md-4 col-sm-8 col-xs-12">
                                    <input type="text" className="form-control "></input>
                                </div>
                            </div>

                            <br></br>

                            <div className="row" > <p className="col-md-1 col-sm-8 col-xs-12">Tipo:</p>
                                <div className="col-md-2 col-sm-8 col-xs-12">
                                    <select type="select" className=" form-control col-md-4 col-sm-8 col-xs-12 " style={{ height: 47 + 'px' }}>
                                        <option value="volvo">Serviço</option>
                                        <option value="saab">Produto</option>
                                    </select>
                                </div>
                            </div>
                            
                            <br></br>
                            
                            <div className="row" >  <p className="col-md-1 col-sm-8 col-xs-12" style={{width: 10+'%'}} >ValorP/unid:</p>
                                <div className="col-md-4 col-sm-8 col-xs-12">
                                
                               <input type="number" id='forms' onChange={this.enviar} value={this.state.Text} size='10' min='0' step=".10" />
                                </div>
                            </div>
                            <br></br>
                            
                            <div className="row" >  <p className="col-md-2 col-sm-8 col-xs-12" style={{width: 10+'%'}}>Quantidade:</p>
                                <div className="col-md-4 col-sm-8 col-xs-12">
                                <input type="number" id='forms' onChange={this.enviar} value={this.state.Text} size='10' min='0'  />
                                </div>
                            </div>
                            <br></br>
                            <button className="btn btn-md botao botaoAvançar" onClick={()=> console.log(this.state.Text)} style={{ background: ' #2ab7ec'  }}>Enviar</button>
                        </div>


                        <div className="graph">
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>CPF</th>
                                            <th>Selecionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Servico;