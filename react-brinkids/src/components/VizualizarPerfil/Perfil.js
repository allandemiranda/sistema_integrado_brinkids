import React from 'react';

import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import './icones.css';
import axios from 'axios';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import Moment from 'moment';
var foto;
class Perfil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reserva: [],
            //lista de funcionarios recebida do banco de dados
            listaFuncionarios: [],
            //lista de funcionarios apos a busca pelo nome
            list: [],
            //Funcionario selecionado para vizualizar o perfil
            perfilAtual: [],
            //barra de busca
            selectedSearch: '',
            //tipo da pagina 'Busca' ou 'Perfil'
            page: 'Busca',
            //n tem uma função especifica mas o universo não aceita funcionar sem ele
            flut: true,
            //Aparecer as opçoes quando clikar em editar
            editar: false,
            senhaNova: '',
            senhaAtual: '',
            //Perfil sendo editado
            perfilEdicao: [],

            obs: '',
            email: '',
            phone: '',
            estado: '',
            pais: '',
            bairro: '',
            cep: '',
            cidade: '',
            numero: '',
            endereco: '',
            user:"",

        }
        //funçoes para mudar os values e afins
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchFuncionario = this.SearchFuncionario.bind(this);
        this.ChangePage = this.ChangePage.bind(this);
        this.editavel = this.editavel.bind(this);
        
        this.changueObs = this.changueObs.bind(this);
        this.changueCep = this.changueCep.bind(this);
        this.changueEndereco = this.changueEndereco.bind(this);
        this.changueBairro = this.changueBairro.bind(this);
        this.changueCidade = this.changueCidade.bind(this);
        this.changueEstado = this.changueEstado.bind(this);
        this.changuePais = this.changuePais.bind(this);
        this.changueNumero = this.changueNumero.bind(this);
        this.changueEmail = this.changueEmail.bind(this);
        this.changuePhone = this.changuePhone.bind(this);
        
        this.salvar = this.salvar.bind(this);
        this.voltar = this.voltar.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.changuePassword = this.changuePassword.bind(this);
        this.changueSenha = this.changueSenha.bind(this);
        this.changueSenhaAtual = this.changueSenhaAtual.bind(this);
        this.excluir = this.excluir.bind(this);
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
        this.Funcionario(10);
    }
    excluir(event,indice){
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

                            if (map.id === 11) {

                                podeentrar = true;

                            }

                        })

                        return podeentrar;

                    }).then((eventu) => {
                        if (eventu) {
                            let temporario = this.state.list;
                            axios.delete(`adult/${event}`)
                                .then((response) => {
                                   
                                    temporario.splice(indice,1);
                                    this.setState({
                                        list:temporario
                                    })
                                })
                                .catch((err) => console.log(err));

                        } else {

                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");

                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        
    }
    changuePassword(event) {

        this.setState({
            page: 'Senha',
        })
    }
    mudarSenha = ()=>{
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);
        axios.put(`/employees/reset-password`,{identifier:b._id})
        .then((response) => {
           
            this.setState(
                {   
                    page: 'Perfil'
                })
                alert("Senha alterada para a padrão")
            
        }).catch((err) => {
            console.log(err);
        });
    }
    //lembrar de terminar as funçoes changue
    changueObs(event) { this.setState({ obs: event.target.value }) }
    changueBairro(event) { this.setState({ bairro: event.target.value }) }
    changueCep(event) { this.setState({ cep: event.target.value }) }
    changueEndereco(event) { this.setState({ endereco: event.target.value }) }
    changueCidade(event) { this.setState({ cidade: event.target.value }) }
    changueEstado(event) { this.setState({ estado: event.target.value }) }
    changuePais(event) { this.setState({ pais: event.target.value }) }
    changueNumero(event) { this.setState({ numero: event.target.value }) }
    changueEmail(event) { this.setState({ email: event.target.value }) }
    changuePhone(event) { this.setState({ phone: event.target.value }) }
    changueSenha(event) { this.setState({ senhaNova: event.target.value }) }
    changueSenhaAtual(event) { this.setState({ senhaAtual: event.target.value }) }
    //funçao que salva apos o editar
    salvar(event) {
        let listatemporaria = this.state.perfilAtual;

        var formData = new FormData();

        formData.append('observations', this.state.obs);
        formData.append('phone', this.state.phone);
        if (foto) {
            formData.append('photo', this._dataURItoBlob(foto));
        }
        formData.append('number', this.state.numero);
        formData.append('state', this.state.estado);
        formData.append('district', this.state.bairro);
        formData.append('city', this.state.cidade);
        formData.append('cep', this.state.cep);
        formData.append('street', this.state.endereco);
        formData.append('country', this.state.pais);
        formData.append('email', this.state.email);
        console.log("form: ", formData);


        axios.put(`adult/${this.state.perfilAtual._id}`, formData)
            .then((response) => {

            })
            .catch((err) => console.log(err));
        listatemporaria.address.number = this.state.numero;
        listatemporaria.address.state = this.state.estado;
        listatemporaria.address.district = this.state.bairro;
        listatemporaria.phone = this.state.phone;
        listatemporaria.address.city = this.state.cidade;
        listatemporaria.address.cep = this.state.cep;
        listatemporaria.observations = this.state.obs;
        listatemporaria.email = this.state.email;
        listatemporaria.address.street = this.state.endereco;
        listatemporaria.address.country = this.state.pais;
        this.setState({
            perfilAtual: listatemporaria,
            editar: false,
        });
      
      
    }
    //função que alterna as paginas
    ChangePage(event) {
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

                            if (map.id === 9) {

                                podeentrar = true;

                            }

                        })

                        return podeentrar;

                    }).then((eventu) => {
                        if (eventu) {
                            axios.get(`/authentication/mostra_usuarios/${event._id}`)
                            .then((response) => {
                               
                                this.setState(
                                    {   user:response.data[0].user,
                                        perfilEdicao: event,
                                        perfilAtual: event,
                                        reserva: event,
                                        page: 'Perfil'
                                    })
                        
                                
                            }).catch((err) => {
                                console.log(err);
                            });

                        } else {

                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");

                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
      

        

    }
    voltar(event) {
        this.setState({
            page: 'Busca',
            selectedSearch: '',
            list: [],

        })
    }
    cancelar(event) {
        this.setState({
            perfilAtual: this.state.reserva,
            editar: false,

        })

    }
    editavel(event) {
        this.setState({
            editar: true,

        });

        this.setState({
            obs: this.state.perfilEdicao.observations,
            numero: this.state.perfilEdicao.address.number,
            estado: this.state.perfilEdicao.address.state,
            bairro: this.state.perfilEdicao.address.district,
            phone: this.state.perfilEdicao.phone,
            cidade: this.state.perfilEdicao.address.city,
            cep: this.state.perfilEdicao.address.cep,
            email: this.state.perfilEdicao.email,
            endereco: this.state.perfilEdicao.address.street,
            pais: this.state.perfilEdicao.address.country,
        })

    }
    SearchFuncionario(event) {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);
        
        axios.get(`/employees/search/${this.state.selectedSearch}`)
            .then((response) => {
                let temporario = response.data;
                temporario.map((event,indice)=>{
                  
                    if(event._id===b.id){
                       temporario.splice(indice,1)
                    }
                })
                
                return temporario;
            }).then((event)=>{
                this.setState({ list: event });
            }).catch((err) => {
                console.log(err);
            });
    }
    ChangeSearch(event) {
        this.setState({ selectedSearch: event.target.value });
    }
    render() {



        if (this.state.page === 'Busca') {
            return (

                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a hre="/" > Home </a></li >
                            <li > Procurar Perfil </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <div>
                                <h3 className="inner-tittle " >Selecionar Perfil</h3>
                            </div>
                            <div className=" text-center">
                                <input type="search" id="selectAdult" name="selectAdult" className="form-control text-center" value={this.state.selectedSearch} onChange={this.ChangeSearch} placeholder="Pesquisar" />
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.SearchFuncionario}> Pesquisar </button>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Nome</th>
                                        <th >CPF</th>
                                        <th className="text-center"> Vizualizar </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findAdult, indice) => {

                                        return (
                                            <tr key={findAdult._id}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findAdult.name.firstName + ' ' + findAdult.name.surName} </td>
                                                <td > {findAdult.cpf} </td>
                                                <td className="text-center"> <button onClick={() => this.ChangePage(findAdult)}><span className="glyphicon">&#xe065;</span></button><button onClick={() => this.excluir(findAdult._id,indice)}><span className="glyphicon">&#xe014;</span></button></td>
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
        if (this.state.page === 'Perfil') {
            function converter(evente) {
                console.log(evente);
                Moment.locale('pt');


                console.log(Moment(evente).format('DD MM YYYY'));
                return Moment(evente).format('DD MM YYYY');
            }
            if (this.state.editar) {
                setTimeout(function () {
                    const uploadfoto = document.getElementById('tipofile');
                    const fotopreview = document.getElementById('fotopreview');

                    uploadfoto.addEventListener('change', function (e) {
                        showThumbnail(this.files);
                    });
                    function showThumbnail(files) {


                        if (files && files[0]) {
                            const reader = new FileReader();

                            reader.onload = function (e) {
                                fotopreview.src = e.target.result;
                            }

                            reader.readAsDataURL(files[0]);
                        }

                    }
                }, 100);
            }



            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >

                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Vizualizar </li>
                            <li > Perfil </li>
                        </ol >

                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" >  </h3>

                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil Funcionário</h3>
                            <div className="row">


                                <div className="col-md-4 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <br></br>

                                        <img id='fotopreview' style={{ width: 'auto', minHeight: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
                                        {this.state.editar && (
                                            <div>
                                                <button className="btn btn-md botao botaoAvançar" style={{ background: ' #2ab7ec' }}><label>
                                                    Trocar imagem <span className="glyphicon">&#xe065;</span>

                                                    <input id="tipofile" type="file" name="foto" defaultValue="" />
                                                </label>
                                                </button><br /></div>)
                                        }
                                    </div>
                                    <br></br>
                                </div>
                                <div className="col-md-4 col-sm-12 text-center">

                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.perfilAtual.name.firstName}</p>
                                    </div>
                                    <br></br>
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sobrenome: </b></h5>
                                        <p>{this.state.perfilAtual.name.surName}</p>
                                    </div>

                                </div>
                                <div className="col-md-4 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo" ><b> Login </b></h5>
                                        <p>{this.state.user}</p>
                                    </div>
                                    <br></br>


                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo" ><b> Status no Sistema  </b></h5>
                                        <p>Ativo</p>
                                    </div><br />
                                </div>




                                <div className="col-md-4 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  CPF: </b> </h5>
                                        <p>{this.state.perfilAtual.cpf} </p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  RG: </b> </h5>
                                        <p> {this.state.perfilAtual.rg} </p>
                                    </div>
                                </div>
                            </div>
                            <br></br>

                            <div className="row" >
                                <div className="col-md-4 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                        <p>{converter(this.state.perfilAtual.birthday)}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nacionalidade: </b></h5>
                                        <p>{this.state.perfilAtual.nacionality}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sexo: </b></h5>
                                        <p>{this.state.perfilAtual.sexuality}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.phone}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.phone} onChange={this.changuePhone} />)}

                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }} >
                                        <h5 className="ltTitulo"><b> Estado Civil: </b></h5>
                                        <p>{this.state.perfilAtual.maritalStatus}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className='row'>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="graph " style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Email:</b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.email}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.email} onChange={this.changueEmail} />)}
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Endereço: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.street}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.endereco} onChange={this.changueEndereco} />)}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-10">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Bairro: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.district}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.bairro} onChange={this.changueBairro} />)}
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Número: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.number}</p>)}
                                        {this.state.editar && (<input className="form-control" style={{ float: 'none' }} type="text" value={this.state.numero} onChange={this.changueNumero} />)}
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> CEP: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.cep}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.cep} onChange={this.changueCep} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Cidade: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.city}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.cidade} onChange={this.changueCidade} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Estado: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.state}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.estado} onChange={this.changueEstado} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> País: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.country}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.pais} onChange={this.changuePais} />)}
                                    </div>
                                </div>
                            </div>

                            <br></br>
                            <div className="row">

                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 128 + 'px' }}>

                                        <h5 className="ltTitulo" > <b>Educação:</b> </h5>

                                        <p>{this.state.perfilAtual.education}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 128 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>Parentesco:</b>  </h5>

                                        <p><b>Nome do pai:</b> {this.state.perfilAtual.identifierEmployee.kinship.fatherName}</p>
                                        <p><b>Nome do Mae:</b> {this.state.perfilAtual.identifierEmployee.kinship.fatherName}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 128 + 'px' }}>

                                        <h5 className="ltTitulo" > <b>Lugar de Origem:</b> </h5>

                                        <p><b>Cidade:</b> {this.state.perfilAtual.identifierEmployee.birthplace.city}</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.identifierEmployee.birthplace.state}</p>
                                    </div>
                                </div>
                            </div >
                            <br></br>
                            <div className="row">


                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 255 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>Carteira de trabalho:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.identifierEmployee.workPortifolio.number}</p>
                                        <p><b>Series:</b> {this.state.perfilAtual.identifierEmployee.workPortifolio.series}</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.identifierEmployee.workPortifolio.state}</p>
                                        <p><b>PISPASEP:</b> {this.state.perfilAtual.identifierEmployee.workPortifolio.PIS_PASEP}</p>
                                        <p><b>Data de Emissão:</b> {converter(this.state.perfilAtual.identifierEmployee.workPortifolio.dateIssue)}</p>
                                        <p><b>Lugar de Emissão:</b> {this.state.perfilAtual.identifierEmployee.workPortifolio.placeIssued}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 255 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>Título de Eleitor:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.identifierEmployee.electionTitle.number}</p>
                                        <p><b>Zona:</b> {this.state.perfilAtual.identifierEmployee.electionTitle.zone}</p>
                                        <p><b>Seção:</b> {this.state.perfilAtual.identifierEmployee.electionTitle.section}</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.identifierEmployee.electionTitle.state}</p>

                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 255 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>Registro Geral:</b>  </h5>

                                        <p><b>Orgão Emissor:</b> {this.state.perfilAtual.identifierEmployee.rg.issuingBody}</p>
                                        <p><b>Data de Emissão:</b> {converter(this.state.perfilAtual.identifierEmployee.rg.dateIssue)}</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.identifierEmployee.rg.state}</p>

                                    </div>
                                </div>
                            </div >
                            <br></br>
                            <div className="row">


                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 255 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>Reservista:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.identifierEmployee.militaryReservist.number}</p>
                                        <p><b>Series:</b> {this.state.perfilAtual.identifierEmployee.militaryReservist.series}</p>
                                        <p><b>Categoría:</b> {this.state.perfilAtual.identifierEmployee.militaryReservist.category}</p>

                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 255 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>Passaporte:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.identifierEmployee.passport.number}</p>
                                        <p><b>Tipo:</b> {this.state.perfilAtual.identifierEmployee.passport.type}</p>
                                        <p><b>Continente de Emissão:</b> {this.state.perfilAtual.identifierEmployee.passport.issuingCountry}</p>
                                        <p><b>Data de Emissão:</b> {converter(this.state.perfilAtual.identifierEmployee.passport.dateIssue)}</p>
                                        <p><b>Data de Expiração:</b> {converter(this.state.perfilAtual.identifierEmployee.passport.expirationDate)}</p>

                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", minHeight: 255 + 'px' }}>

                                        <h5 className="ltTitulo" ><b>CNH:</b>  </h5>

                                        <p><b>Registro:</b> {this.state.perfilAtual.identifierEmployee.cnh.record}</p>
                                        <p><b>Categoria:</b> {this.state.perfilAtual.identifierEmployee.cnh.category}</p>
                                        <p><b>Data de Expiração:</b> {converter(this.state.perfilAtual.identifierEmployee.cnh.expirationDate)}</p>
                                        <p><b>Comentários:</b> {this.state.perfilAtual.identifierEmployee.cnh.comments}</p>
                                        <p><b>Local de Emissão:</b> {this.state.perfilAtual.identifierEmployee.cnh.placeIssue}</p>
                                        <p><b>Data de Emissão:</b> {converter(this.state.perfilAtual.identifierEmployee.cnh.dateIssue)}</p>
                                    </div>
                                </div>
                            </div >
                            <br></br>

                            <div className="row">

                                <div className="graph" >
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <h3 className="inner-tittle" > Observações </h3>
                                            <br></br>
                                            <textarea className="form-control" rows="4" cols="50" id="Observacoes" name="Observacoes" onChange={this.changueObs} value={this.state.perfilAtual.observations}></textarea>
                                        </div>
                                    </div>
                                </div >

                                {!this.state.editar && (
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={this.editavel} className="btn btn-md botao botaoAvançar" > Editar</button>
                                        <button onClick={this.voltar} className="btn btn-md botao botaoAvançar" > Voltar</button>
                                        <button onClick={this.changuePassword} className="btn btn-md botao botaoAvançar" > Alterar Senha</button>
                                    </div>

                                )}
                                {this.state.editar && (
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={this.salvar} className="btn btn-md botao botaoAvançar" > Salvar</button>
                                        <button onClick={this.cancelar} className="btn btn-md botao botaoAvançar" > Cancelar</button>
                                    </div>
                                )}
                            </div>
                            <br></br>
                        </div >
                    </div>
                </div>

            );
        }
        if (this.state.page === 'Senha') {
            return (
                <div className="container-fluid" >
                <div className="sub-heard-part" >

                    <ol className="breadcrumb m-b-0" >
                        <li > < a href="/" > Home </a></li >
                        <li > Vizualizar </li>
                        <li > Perfil </li>
                    </ol >
                </div>
                <div className="graph-visual" >
                    <h3 className="inner-tittle" > Vizualizar Perfil </h3>
                    <div className="graph" >
                        <h3 className="inner-tittle" style={{textAlign:"center"}} > Resetar para senha padrão (senha123)</h3>                            
                        
                        <br></br><br></br>
                        <div className="text-center" >
                            <button onClick={this.mudarSenha} className="btn btn-md botao botaoAvançar text-center" style={{}}> Resetar Senha</button>                                      
                        </div>                              
                    </div>                    
                </div>
            </div>
            );
        }
    }
}
export default Perfil;
