import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Saida_Crianca.css';
import './css/style.css';


class SaidaCrianca extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "Adultos",
            listAdultos: [],
            NameAdult: "",
            PhoneAdult: "",
            CPFAdult: "",
            ObsAdult: "",
            PhotoAdult: "",
        }

        this.ChangeValue = this.ChangeValue.bind(this);

        axios.get('/dashboards')
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listAdultos: response.data.adult,
                });
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })

    }
    
    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    Selecionar = (resp) => {
        console.log(resp);
        axios.get(`/adult/filter/${resp}`)
        .then((response) => {
            console.log("Dentro do axios: " + this)
            this.setState({
                NameAdult: response.data.name,
                PhoneAdult: response.data.prone,
                CPFAdult: response.data.cpf,
                ObsAdult: response.data.observations,
                PhotoAdult: response.data.photo,
            });
        }).catch((error) => {
            console.log("Não deu certo");
            console.log(error)//LOG DE ERRO
            // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
            // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
            // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
        })
    }


    render() {
        if (this.state.page === "Adultos") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saida de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Escolha o Responsavel</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th>Nome</th>
                                            <th>Telefone</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>1</th>
                                            <td>João</td>
                                            <td>(84) 996778800</td>
                                            <td>
                                                <button className="btn botao btn-sm" onClick={() => this.Selecionar("João")}>Selecionar</button>
                                            </td>
                                        </tr>
                                        {/* {this.state.listAdultos.map((resp, indice) => {
                                            return (
                                                <tr key={desconto._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td > {resp.name} </td>
                                                    <td >{resp.phone} </td>
                                                    <td ><button className="btn botao btn-xs" onClick={() => this.Selecionar(resp.name)}>Selecionar</button></td>
                                                </tr>
                                            );
                                        })} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SaidaCrianca;
