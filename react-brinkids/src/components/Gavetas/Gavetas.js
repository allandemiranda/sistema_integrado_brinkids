import React from 'react';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import axios from 'axios';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';


class Gaveta extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Ngavetas: '',
            cadastroOK:false,
        }
        this.Change = this.Change.bind(this);
        this.salvar = this.salvar.bind(this);

    }
    salvar(event){
         axios.put('/belongings', {number: this.state.Ngavetas})
            .then((response) => {

                this.setState({ Ngavetas: response.data[0].number });
            })
            .catch((err) => console.log(err));
        this.setState({cadastroOK: true})
    }
    Change(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    Funcionario = (number) => {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);

        axios.get(`/employees/${b.id}`)
            .then((response) => {
                let id = response.data[0].identifierEmployee.employeeData.officialPosition;



                axios.get(`/professionalPosition/indentifier/${id}`)
                    .then((response) => {
                        let functions;
                        return response.data.functions;
                    }).then((event) => {
                        let podeentrar = false;
                        event.map((map) => {
                            if (map.id === number) {
                                podeentrar = true;
                            }
                        })
                        return podeentrar;
                    }).then((event) => {
                        if (event) {
                            axios.get('/belongings')
                            .then((response) => {
                                console.log(response.data)
                                this.setState({ Ngavetas: response.data.number });
                            })
                            .catch((err) => console.log(err));
                        } else {
                            this.props.history.push("/");
                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");
                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));

    }
    componentWillMount() {
        this.Funcionario(29);
    }

    render() {
        return (
            <div className="container-fluid" >
                <div className="" >
                    {this.state.cadastroOK &&
                        (<div className="alert lert-danger" role="alert" style={{ background: "#00FF7F", width: 100 + '%' }}>
                            <strong style={{ color: 'white' }}>Salvo com sucesso.</strong>
                        </div>)
                    }
                </div>
                <div className="sub-heard-part" >
                    <ol className="breadcrumb m-b-0" >
                        <li > < a href="/" > Home </a></li >
                        <li > Gavetas </li>
                    </ol >
                </div>
                <div className="graph-visual" >
                    <div className="col-md-6 col-sm-12 text-center">
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Nº.gavetas</h3>
                            </div>
                            <div className=" text-center">
                                <input type="number" id="selectAdult" min="0" name="Ngavetas" className="form-control text-center" value={this.state.Ngavetas} onChange={this.Change} />
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.salvar}> Salvar </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
export default Gaveta;