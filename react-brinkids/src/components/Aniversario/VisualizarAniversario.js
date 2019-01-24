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
            Page: "Lista",

            TituloDoAni: "",
            NomeDoAni: "",
            IdadeDoAni: "",
            DataDoAni: "",
            HoraInicio: "",
            HoraFinal: "",
            QuantCrianca: "",
            QuantAdulto: "",
            DescriçãoDoAni: "",
            ObsDoAni: "",
            ValorPg: "",
            MetodoPg: "",
            AniAtual:"",
        }
        this.requisicao = this.requisicao.bind(this);
        this.editar = this.editar.bind(this);
        this.excluir = this.excluir.bind(this);
        this.inteval = this.inteval.bind(this);
        this.voltar = this.voltar.bind(this);

        this.selecionar = this.selecionar.bind(this);
        this.salvar = this.salvar.bind(this);

    }
    salvar(event){
        console.log('entrei')
        var formData = new FormData();

        formData.append('title', String(this.state.TituloDoAni))
        formData.append('name', String(this.state.NomeDoAni))
        formData.append('age', String(this.state.IdadeDoAni))
        formData.append('start', String(this.state.HoraInicio))
        formData.append('end', String(this.state.HoraFinal))
        formData.append('description', String(this.state.DescriçãoDoAni))
        formData.append('observations', String(this.state.ObsDoAni))
        formData.append('value', String(this.state.ValorPg))
        formData.append('method', String(this.state.MetodoPg))
        formData.append('children', String(this.state.QuantCrianca))
        formData.append('adults', String(this.state.QuantAdulto))


        // let guestList = this.state.ListaAdul.concat(this.state.ListaCria)
        // this.state.ListaAdul.map((guest) => {
        //     guest.type = guest.hasOwnProperty('idade') ? 'child' : 'adult';
        //     return guest;
        // })

        // formData.append('guestList', JSON.stringify(guestList));
        console.log(this.state.AniAtual)
        axios.put(`/birthday/${this.state.AniAtual._id}`)
        .then((response) => {


            console.log(response.data);

        })
        .catch((err) => console.log(err));
        // listaTemporaria.splice(event, 1);
        // this.setState({
        //     list: listaTemporaria,
        // })
    }
    editar(event){
        this.setState({
            Page:"FormularioCad"
        })
    }
    voltar(event){
        this.setState({
            Page: "Lista",
        })
    }
    inteval(event){

    }
    excluir(event){
        let listaTemporaria = this.state.list;
        axios.delete(`/birthday/${listaTemporaria[event]._id}`)
        .then((response) => {


            console.log(response.data);

        })
        .catch((err) => console.log(err));
        listaTemporaria.splice(event, 1);
        this.setState({
            list: listaTemporaria,
        })
    }
    selecionar(event) {
        let aniversarioAtual = this.state.list[event];
        this.setState({
            TituloDoAni: aniversarioAtual.title,
            NomeDoAni: aniversarioAtual.birthdayPerson.name,
            IdadeDoAni: aniversarioAtual.birthdayPerson.age,
            DataDoAni: aniversarioAtual.start,
            HoraInicio: "13:00",
            HoraFinal: "14:00",
            QuantCrianca: aniversarioAtual.amount.children,
            QuantAdulto: aniversarioAtual.amount.adults,
            DescriçãoDoAni: aniversarioAtual.description,
        
            ObsDoAni: aniversarioAtual.observations,
            ValorPg: aniversarioAtual.payment.value,
            MetodoPg: aniversarioAtual.payment.method,
            Page:"ConfDadosAni",

            AniAtual:aniversarioAtual,
        })
    }
    requisicao(event) {
        axios.get('/birthday')
            .then((response) => {
                this.setState({ list: response.data });
                console.log(response.data);
            })
            .catch((err) => console.log(err));
    }
    componentWillMount() {

        this.requisicao();
        this.inteval = setInterval(this.requisicao, 60000);

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
                                                <td><button onClick={() => this.selecionar(indice)}><span className="glyphicon">&#x270f;</span></button> <button onClick={() => this.excluir(indice)}><span className="glyphicon">&#xe014;</span></button></td>
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
        if (this.state.Page === "ConfDadosAni") {
            return (
                <div>
                    <ConfDadosAni Titulo={this.state.TituloDoAni} Name={this.state.NomeDoAni} Idade={this.state.IdadeDoAni}
                        Date={this.state.DataDoAni} HI={this.state.HoraInicio} HF={this.state.HoraFinal}
                        CC={this.state.QuantCrianca} AC={this.state.QuantAdulto} Valor={this.state.ValorPg} Metodo={this.state.MetodoPg}
                        Descricao={this.state.DescriçãoDoAni} Obs={this.state.ObsDoAni} />
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick={this.voltar}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.editar}>Editar</button>
                    </div>
                </div>
            )
        }
        if(this.state.Page === "FormularioCad") {
            return (
                <div className = "container-fluid" >
                    <div className = "sub-heard-part" >
                        <ol className = "breadcrumb m-b-0" >
                            <li > < a href = "/" > Home </a></li >
                            <li > Aniversario </li>
                        </ol >
                    </div>
                    <div className = "graph-visual" >
                        <h3 className = "inner-tittle" > Dados do Aniversariante </h3>
                        <div id="alertDiv" className = "alert displaynone" role = "alert">
                            <b>ERRO!</b> Ah algo de errado em seu formulario.
                        </div>
                        
                            <div className = "graph" >
                                <div className = "form-group" >
                                    <div className ="row">
                                        <TypesInput cod = {1} ClassDiv = {"col-md-12 col-sm-12 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Título do Aniversário: "} type = {"text"} id = {"titulo"} name= {"titulo"} Class = {"form-control"} value={this.state.TituloDoAni} onChange={this.ChangeTitulo} />
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-10 col-sm-10 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Nome do Aniversáriante: "} type = {"text"} id = {"nome"} name= {"nome"} Class = {"form-control"} value = {this.state.NomeDoAni} onChange={this.ChangeName}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-2 col-sm-2 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Idade: "} type = {"number"} id = {"idade"} name= {"idade"} Class = {"form-control"} value = {this.state.IdadeDoAni} onChange={this.ChangeIdade}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Data do Aniversario: "} type = {"date"} id = {"Data"} name= {"Data"} Class = {"form-control"} value = {this.state.DataDoAni} onChange={this.ChangeDate}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Hora incial: "} type = {"time"} id = {"HI"} name= {"HI"} Class = {"form-control"} value = {this.state.HoraInicio} onChange={this.ChangeHInicial}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-4 col-sm-4 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Hora Final: "} type = {"time"} id = {"HF"} name= {"HF"} Class = {"form-control"} value = {this.state.HoraFinal} onChange={this.ChangeHFinal}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Quantidade de Convidados Crianças: "} type = {"number"} id = {"QCC"} name= {"QCC"} Class = {"form-control"} value = {this.state.QuantCrianca} onChange={this.ChangeQCria}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Quantidade de Convidados Adultos: "} type = {"number"} id = {"QCA"} name= {"QCA"} Class = {"form-control"} value = {this.state.QuantAdulto} onChange={this.ChangeQAdul}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className = "row" >
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario"} NameLabel = {"Valor Pago: "} type = {"number"} id = {"VP"} name= {"VP"} Class = {"form-control"} placeholder = {"R$"} value = {this.state.ValorPg} onChange={this.ChangeValorPg}/>
                                        <TypesInput cod = {1} ClassDiv = {"col-md-6 col-sm-6 col-xs-12"} ClassLabel = {"LetraFormulario brlabel"} NameLabel = {"Metodo de Pagamento: "} type = {"text"} id = {"MP"} name= {"MP"} Class = {"form-control"} value = {this.state.MetodoPg} onChange={this.ChangeMetodoPg}/>
                                    </div>
                                </div>
                                <div className = "form-group" >
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Descrição do Aniversario </h3>
                                            <br></br>
                                            <TypesInput cod = {2} Label = {0} cols = {"50"} rows = {"4"} id = {"Descricao"} name= {"Descricao"} Class = {"form-control"} value={this.state.DescriçãoDoAni} onChange={this.ChangeDescricao} />
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                            <h3 className = "inner-tittle" > Observações </h3>
                                            <br></br>
                                            <TypesInput cod = {2} Label = {0} cols = {"50"} rows = {"4"} id = {"Observacoes"} name= {"Observacoes"} Class = {"form-control"} value={this.state.ObsDoAni} onChange={this.ChangeObs}/>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                            <br></br>
                            <div className="text-center">
                                <button className="btn btn-md botao" onClick={this.voltar} >Cancelar</button>
                                <button className="btn btn-md botao botaoAvançar" onClick={this.salvar}>Salvar</button>
                            </div>                      
                       
                    </div>
                </div>
            )
        }
    }
}
export default VisualizarAniversario; 