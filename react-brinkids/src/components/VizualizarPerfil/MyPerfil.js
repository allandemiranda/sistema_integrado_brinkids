import React from 'react';
import listaa from './gato';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import './icones.css';
import './css/My_Perfil.css';
import jwt from 'jsonwebtoken';
import { Route, Redirect } from 'react-router'
import { getToken } from "../Login/service/auth";
import { logout } from "../Login/service/auth";
import { getFuncionario } from "../Login/service/auth";
import axios from 'axios';
import config from '../Login/service/config';
import moment from 'moment'
import $ from 'jquery'
var foto;
class MeuPerfil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reserva: [],
            //lista de funcionarios recebida do banco de dados

            //lista de funcionarios apos a busca pelo nome
            list: [],
            //Funcionario selecionado para vizualizar o perfil
            perfilAtual: [],
            //barra de busca
            selectedSearch: '',
            //tipo da pagina 'Busca' ou 'Perfil'
            page: '',
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

            user: "",
            password: "",

        }
        //funçoes para mudar os values e afins


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

        this.cancelar = this.cancelar.bind(this);
        this.changuePassword = this.changuePassword.bind(this);
        this.changueSenha = this.changueSenha.bind(this);
        this.changueSenhaAtual = this.changueSenhaAtual.bind(this);
        this.requisicao = this.requisicao.bind(this);
        this.salvar = this.salvar.bind(this);
        this.mudarSenha = this.mudarSenha.bind(this);
    }
    _dataURItoBlob(dataURI) { //Pega a foto e converte num formato específico para enviar ao servidor
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], { type: mimeString })};
    mudarSenha(event) {
        if (this.state.senhaAtual === this.state.password) {
            const a = getToken();
            const b = jwt.verify(a, config.secret_auth);
            console.log(b);
            $("#alertDiv").removeClass('displaynone');
            $("#senhaantiga").removeClass('errorBorder');
            const data = {
                identifier: b._id,
                password: this.state.senhaNova,
            };
            alert("Por favor, é necessário fazer um novo Login no sistema.")
            axios.put(`/employees/password`, data)
                .then((response) => {
                    logout()
                    this.sair()
                })
                .catch((err) => console.log(err));
        } else {
            const a = getToken();
            const b = jwt.verify(a, config.secret_auth);
            console.log(b);
            $("#senhaantiga").addClass('errorBorder');
            $("#alertDiv").addClass('alert-danger').removeClass('displaynone');
        }
    }
    sair=()=>{
        this.props.history.push("login"); //lembrar q é assim q se redireciona com react
    }
    funcionarios=()=>{
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);
        console.log(b)
        axios.get(`/employees/${b.id}`)
            .then((response) => {
               
                console.log(response.data);
            })
            .catch((err) => console.log(err));

    }
    requisicao() {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);
        console.log(b)
        axios.get(`/employees/${b.id}`)
            .then((response) => {
                let id = response.data[0].identifierEmployee.employeeData.officialPosition;
                console.log(response.data);

                this.setState({
                    page: "Perfil",
                    perfilAtual: response.data[0],
                    perfilEdicao: response.data[0],
                    user: b.user,
                    password: b.password,
                })

            })
            .catch((err) => console.log(err));

    }
    salvar(event) {
        let listatemporaria = this.state.perfilAtual;
        const modifiedDate = {
            observations: this.state.obs,
            phone: this.state.phone,
            email: this.state.email,
            photo: foto,
            address: {
                number: this.state.numero,
                state: this.state.estado,
                district: this.state.bairro,

                city: this.state.cidade,
                cep: this.state.cep,

                street: this.state.endereco,
                country: this.state.pais,
            }
        };

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


        axios.put(`/employees/exchange-data/${this.state.perfilAtual._id}`, formData)
            .then((response) => {
                console.log(response.data)
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
    componentWillMount() {

        this.requisicao();

    }
    changuePassword(event) {
        this.setState({
            page: 'Senha',

        })
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

    //função que alterna as paginas

    cancelar(event) {
        this.setState({
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


    render() {


        if (this.state.page === 'Perfil') {
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
                                foto = e.target.result;
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
                            <li > Meu Perfil </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Meu Perfil  </h3>

                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil
                            </h3>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 text-center">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  </b></h5>

                                        <img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
                                        {this.state.editar && (
                                            <div>
                                                <button className="btn btn-md botao botaoAvançar">
                                                    <label className="corbotao">
                                                        Trocar imagem <span className="glyphicon">&#xe065;</span>

                                                        <input id="tipofile" type="file" name="foto" value="" />
                                                    </label>
                                                </button><br /></div>)
                                        }
                                    </div>
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
                                        <h5 className="ltTitulo" ><b> Login: </b></h5>
                                        <p>{this.state.user}</p>
                                    </div>
                                    <br></br>


                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo" ><b> Status do Usuário:  </b></h5>
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
                                        <p>{moment(this.state.perfilAtual.birthday).add(1,"days").format("DD/MM/YYYY")}</p>
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
                                        {this.state.editar && (<input type="text" className="form-control" style={{ float: 'none' }} value={this.state.phone} onChange={this.changuePhone} />)}
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



                                {!this.state.editar && (
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={this.editavel} className="btn btn-md botao botaoAvançar" > Editar</button>
                                        
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
        } else if (this.state.page === "") {
            return (<div>Página em carregamento...  </div>);
        }
        if (this.state.page === 'Senha') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >

                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Vizualizar </li>
                            <li > Meu Perfil </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Meu Perfil </h3>
                        <div id="alertDiv" className = "alert displaynone" role = "alert">
                            <b>ERRO!</b> Há algo de errado em seu formulário.
                        </div>
                        <div className="graph" >
                            <h3 className="inner-tittle" > Mudar Senha</h3>                            
                            <div className="col-md-6 col-sm-12 text-center" >
                                <h5 className="ltTitulo" style={{ color: '#00C6D7' }}><b> DIGITE A SENHA ATUAL </b></h5>
                                <p><input id="senhaantiga" type="password" value={this.state.senhaAtual} onChange={this.changueSenhaAtual} style={{ background: 'white', textAlign: 'center', fontSize: 130 + '%' }} /></p>
                            </div>
                            <div className="col-md-6 col-sm-12 text-center" >
                                <h5 className="ltTitulo" style={{ color: '#00C6D7' }}><b> DIGITE A NOVA SENHA </b></h5>
                                <p><input id="senhaanova" type="password" value={this.state.senhaNova} onChange={this.changueSenha} style={{ background: 'white', textAlign: 'center', fontSize: 130 + '%' }} /></p>
                            </div>  
                            <br></br><br></br>
                            <div className="text-center" >
                                <button onClick={()=>this.setState({page:"Perfil",senhaAtual:"",senhaNova:""})} className="btn btn-md botao botaoAvançar text-center" style={{}}>voltar</button>    
                                <button onClick={this.mudarSenha} className="btn btn-md botao botaoAvançar text-center" style={{}}> Alterar Senha</button>                                      
                            </div>                              
                        </div>                    
                    </div>
                </div>
            );
        }
    }
}
export default MeuPerfil;
