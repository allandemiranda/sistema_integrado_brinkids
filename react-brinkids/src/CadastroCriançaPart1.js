import React from 'react';


// CSS Layout
import './css/bootstrap.min.css';
import './css/font-awesome.css';
import './css/formulario_Criança.css';
import './css/style.css';





class CadastroCriançaPart1 extends React.Component {
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
                    <h3 className = "inner-tittle" > Novo </h3>
                    <div className = "graph" >
                        <h3 className = "inner-tittle" > Perfil </h3>   
                        <form id="form-criança" >
                            <div className = "form-group" >
                                <div className = "row" >
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario" > Nome: </label>
                                        <input type = "text" id = "nome" name = "nome" className = "form-control" />
                                    </div>   
                                    <div className = "col-md-6 col-sm-6 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Sobrenome: </label>
                                        <input type = "text" id = "Sbrenome" name = "Sbnome" className = "form-control" />
                                    </div>  
                                </div> 
                            </div>
                            <div className = "form-group" >
                                <div className = "row" >
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario" > RG: </label>
                                        <input type = "text" id = "RG" name = "RG" className = "form-control" />
                                    </div>
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > CPF: </label>   
                                        <input type = "text" id = "CPF" name = "CPF" className = "form-control" />
                                    </div>
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Data de Nascimento: </label>
                                        <input type = "date" id = "data" name = "data" className = "form-control" placeholder = "dd / mm / aa" />
                                    </div>
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Sexo: </label>
                                        <select id = "sexo" name = "sexo" className = "form-control optionFomulario" >
                                            <option value = "Masculino" > Masculino </option> 
                                            <option value = "Feminino" > Feminino </option>
                                        </select > 
                                    </div>
                                </div>
                            </div >
                            <div className = "form-group" >
                                <div className = "row" >
                                    <div className = "col-md-12" >
                                        <label className = "LetraFormulario" > Endereço: </label>
                                        <input type = "text" id = "Endereço" name = "Endereço" className = "form-control" />
                                    </div>
                                </div > 
                            </div >
                            <div className = "form-group" >
                                <div className = "row">
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario" > Bairro: </label>
                                        <input type = "text" id = "Barro" name = "Barro" className = "form-control" />
                                    </div>
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Cidade: </label>
                                        <input type = "text" id = "Cidade" name = "Cidade" className = "form-control" />
                                    </div>
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > Estado: </label>
                                        <select id = "Estado" name = "Estado" className = "form-control optionFomulario" >
                                            <option value = "AC" > AC </option>
                                            <option value = "AL" > AL </option>
                                            <option value = "AP" > AP </option>
                                            <option value = "AM" > AM </option>
                                            <option value = "BA" > BA </option>
                                            <option value = "CE" > CE </option>
                                            <option value = "DF" > DF </option>
                                            <option value = "ES" > ES </option>
                                            <option value = "GO" > GO </option>
                                            <option value = "MA" > MA </option>
                                            <option value = "MT" > MT </option>
                                            <option value = "MS" > MS </option>
                                            <option value = "MG" > MG </option>
                                            <option value = "PA" > PA </option>
                                            <option value = "PB" > PB </option>
                                            <option value = "PR" > PR </option>
                                            <option value = "PE" > PE </option>
                                            <option value = "PI" > PI </option> 
                                            <option value = "RJ" > RJ </option>
                                            <option value = "RN" > RN </option>
                                            <option value = "RS" > RS </option>
                                            <option value = "SC" > SC </option>
                                            <option value = "SP" > SP </option>
                                            <option value = "SE" > SE </option>
                                            <option value = "TO" > TO </option> 
                                        </select >
                                    </div >
                                    <div className = "col-md-3 col-sm-3 col-xs-12" >
                                        <label className = "LetraFormulario brlabel" > CEP: </label>
                                        <input type = "text" id = "CEP" name = "CEP" className = "form-control" />
                                    </div>
                                </div>
                            </div >
                            <div className = "graph" >
                                <h3 className = "inner-tittle" > Restrições </h3>
                                <br></br>
                                <div className = "form-group" >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <textarea className = "form-control" rows = "4" cols = "50" ></textarea>
                                            <input type="checkbox" id="Anexar" name="Anexar" value="Anexar"/> Anexar
                                        </div>
                                    </div>
                                </div>
                            </div >
                            <a className="btn btn-md botãoVoltar" href="www.google.com.br">Cencelar</a>
                            <button className="btn btn-md botãoAvançar" id="CriaCriança">Foto</button>
                        </form >
                    </div >
                </div>
            </div>
        )
    }
}

export default CadastroCriançaPart1;