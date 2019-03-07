import React from 'react';

import listaa from './gato';
import moment from 'moment';
import axios from 'axios';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import './icones.css';
import { SSL_OP_ALL } from 'constants';

var foto;
class PerfilAdulto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reserva: [],
            //lista de funcionarios recebida do banco de dados
            listaFuncionarios: [],
            //lista de funcionarios apos a busca pelo nome
            list: [],
            listaAdultos: [],
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

            childSearch: '',
            confirmaCrianca: [],
            kinship: 'Outros',
            photo: '',
            pode: false,
            deletado: false,
            naoEncontrada: false,
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
        this.ChangechildSearch = this.ChangechildSearch.bind(this);
        this.Search = this.Search.bind(this);
        this.selecionaCrianca = this.selecionaCrianca.bind(this);
        this.Changekinship = this.Changekinship.bind(this);
        this.TheEnd = this.TheEnd.bind(this);
        this.Adicionar = this.Adicionar.bind(this);
        this.mudarfoto = this.mudarfoto.bind(this);
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
        this.Funcionario(2);
    }

    excluir(event, indice) {
        const confirmacao = window.confirm("Deseja mesmo excluir esse adulto do sistema?");

        if (confirmacao === true) {
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

                                if (map.id === 3) {

                                    podeentrar = true;

                                }

                            })

                            return podeentrar;

                        }).then((eventu) => {
                            if (eventu) {

                                let temporario = this.state.list;

                                axios.delete(`adult/${event}`)
                                    .then((response) => {

                                        temporario.splice(indice, 1);
                                        this.setState({
                                            list: temporario,
                                            deletado: true,
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

        return new Blob([ia], { type: mimeString });
    }
    mudarfoto(event) {
        this.setState({
            photo: event,
        })
    }
    Adicionar(event) {
        this.setState({
            page: 'Adicionar',
            list: [],
            confirmaCrianca: [],
        })
    }
    changuePassword(event) {
        this.setState({
            page: 'Senha',
        })
    }
    //lembrar de terminar as funçoes changue
    ChangechildSearch(event) { this.setState({ childSearch: event.target.value }) }
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
        formData.append('children',  JSON.stringify(this.state.perfilAtual.children.map((child) => {
            return { identifier: child.identifier, kinship: child.kinship ? child.kinship : 'others' }
        })))
        

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
    async ChangePage(event) {
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

                            if (map.id === 1) {

                                podeentrar = true;

                            }

                        })

                        return podeentrar;

                    }).then((eventu) => {
                        if (eventu) {

                            if (false) {
                                this.setState({
                                    page: "Perfil",
                                })
                            } else {

                                const criancas = event.children.map(async (crianca, index) => {
                                    
                                    if (crianca !== null) {
                                        console.log("entrei aki",crianca.identifier)
                                        const response = await axios.get(`/child/indentifier/${crianca.identifier}`);
                                        console.log(response.data)
                                        return response.data;
                                    }
                                });

                                Promise.all(criancas).then((listaCriancas) => {
                                    
                                    this.setState({
                                        listaFuncionarios: listaCriancas,
                                        page: "Perfil",
                                    })
                                });
                            }

                        } else {

                            alert("Acesso Negado. Você não possui permisão para estar nessa área!");

                        }
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));





        this.setState(
            {
                perfilEdicao: event,
                perfilAtual: event,
                reserva: event,

            });








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
            obs: this.state.perfilAtual.observations,
            numero: this.state.perfilAtual.address.number,
            estado: this.state.perfilAtual.address.state,
            bairro: this.state.perfilAtual.address.district,
            phone: this.state.perfilAtual.phone,
            cidade: this.state.perfilAtual.address.city,
            cep: this.state.perfilAtual.address.cep,
            email: this.state.perfilAtual.email,
            endereco: this.state.perfilAtual.address.street,
            pais: this.state.perfilAtual.address.country,
        })

    }
    SearchFuncionario(event) {
        // const lista = [];
        // this.setState({ list: [] });
        // this.state.listaFuncionarios.forEach(element => {

        //     if (element.name.firstName == this.state.selectedSearch) {

        //         lista.push(element);
        //         this.setState({ list: lista });
        //     }
        // });
        axios.get(`/adult/filter/${this.state.selectedSearch}/nome`)
            .then((response) => {
                console.log(response.data);
                this.setState({ list: response.data, naoEncontrada: false });
            }).catch((err) => {
                console.log(err);
                this.setState({ naoEncontrada: true });
            });


    }
    Search(event) {

        axios.get(`/child/filter/${this.state.childSearch}`)
            .then((response) => {
               
                this.setState({ list: response.data });
            }).catch((err) => {
                console.log(err);
            });
        // const lista = [];
        // this.setState({ list: [] });
        // this.state.listaFuncionarios.forEach(element => {

        //     if (element.name.firstName == this.state.childSearch) {

        //         lista.push(element);
        //         this.setState({ list: lista });
        //     }
        // });

    }
    ChangeSearch(event) {
        this.setState({ selectedSearch: event.target.value });
    }
    selecionaCrianca(identifier) {
        let achou = false;

        this.state.confirmaCrianca.forEach((crianca, indice, array) => {
            if (crianca._id === identifier) {
                delete array[indice];
                achou = true;
            }
        });

        if (!(achou)) {
            this.state.list.forEach((crianca) => {
                if (crianca._id === identifier) {
                    this.state.confirmaCrianca.push(crianca);
                }
            });
        }

        this.setState({ confirmaCrianca: this.state.confirmaCrianca });
    }
    Changekinship(evento, identifier) {
        this.setState({ kinship: evento.target.value })

        
        this.state.confirmaCrianca.forEach((crianca) => {
            if (crianca._id === identifier) {
                crianca.kinship = evento.target.value
            }
        });

        this.setState({ confirmaCrianca: this.state.confirmaCrianca });
    }
    TheEnd(event) {
        let listacrianca = [];
        this.state.confirmaCrianca.map((crianca, indice) => {

            listacrianca.push({ identifier: crianca._id, kinship: crianca.kinship })

        });
     
        const data = {

            identifierParent: this.state.perfilAtual._id,
            listChildren: listacrianca,

        }
        console.log(data);



        axios.post('/adult/appendChild', data)
            .then((response) => {

                this.setState({ list: response.data });
                axios.get(`/adult/${this.state.perfilAtual._id}`)
                    .then((response) => {


                        this.setState({ perfilAtual: response.data, listaFuncionarios: [] });


                        const criancas = this.state.perfilAtual.children.map(async (crianca, index) => {
                            if (crianca !== null) {
                                const response = await axios.get(`/child/indentifier/${crianca.identifier}`);
                                return response.data;
                            }
                        });
                        Promise.all(criancas).then((listaCriancas) => {
                          
                            this.setState({
                                listaFuncionarios: listaCriancas,
                                page: "Perfil",
                            })
                        });



                    }).catch((err) => {
                        console.log(err);
                    });
            }).catch((err) => {
                console.log(err);
            });

    }
    excluirCria = (event) => {
        const confirmacao = window.confirm("Deseja mesmo excluir essa criança?");
        if (confirmacao === true) {
            let temporario = this.state.perfilAtual;
            temporario.children.splice(event, 1);
            
            this.setState({
                perfilAtual: temporario,
                perfilEdicao: temporario
            })
        }
    }
    render() {
        if (this.state.page === 'Busca') {
            return (
                <div className="container-fluid" >
                    {this.state.naoEncontrada &&
                        (<div className="alert lert-danger" role="alert" style={{ background: "#ff6347", width: 100 + '%' }}>
                            <strong style={{ color: 'white' }}>Nenhum adulto encontrda com esse nome. </strong>
                        </div>)
                    }
                    {this.state.deletado &&
                        (<div className="alert lert-danger" role="alert" style={{ background: "#00FF7F", width: 100 + '%' }}>
                            <strong style={{ color: 'white' }}>Adulto deletado com sucesso do sistema. </strong>
                        </div>)
                    }
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
                                                <td className="text-center"> <button onClick={() => this.ChangePage(findAdult)}><span className="glyphicon">&#xe065;</span></button><button onClick={() => this.excluir(findAdult._id, indice)}><span className="glyphicon">&#xe014;</span></button></td>
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
            if (this.state.editar) {
                setTimeout(function () {
                    const uploadfoto = document.getElementById('tipofile');
                    const fotopreview = document.getElementById('fotopreview');
                    uploadfoto.onchange = function () {
                       
                        if (this.files[0].size > 307200) {
                            alert("Tamanho da Foto Muito Grande");
                            this.value = "";
                        } else {
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
                        }
                    };


                }, 100);
            };
            const byCrianca = function (events, index) {
                return (

                    <tr style={{ textAlign: 'justify' }} key={events._id}>
                        <td>{events.index + 1}</td>
                        <td>{events.name}</td>
                        <td>{events.kinship}</td>
                    </tr>


                )
            };
            function converter(evento) {
                const data = evento.match(/([T,\w\*]+)/g);
                const dia = data[2].split(/[T]/g);

                return dia[0] + "-" + data[1] + '-' + data[0];
            }


            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >

                        <ol className="breadcrumb m-b-0" >
                            <li > < a hre="/" > Home </a></li >
                            <li > Perfil </li>
                            <li > Vizualizar </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle" > Vizualizar Perfil Adulto </h3>

                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil
                            </h3>
                            <div className="row">
                                <div className="col-md-4 col-sm-4 text-center">
                                    <div className="graph" >
                                        <h5 className="ltTitulo"><b>  </b></h5>

                                        <img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
                                        {this.state.editar && (
                                            <div>
                                                <button className="btn btn-md botao botaoAvançar" style={{ background: ' #2ab7ec' }}>
                                                    <label style={{ color: 'white' }}>
                                                        Trocar imagem <span className="glyphicon">&#xe065;</span>
                                                        <input id="tipofile" accept="image/*" type="file" name="foto" defaultValue="" />
                                                    </label>
                                                </button>
                                            </div>)
                                        }
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                    <div className="graph" style={{ padding: 10 + "px" }} >
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.perfilAtual.name.firstName}</p>
                                    </div>
                                    <br></br>
                                    <div className="graph" style={{ padding: 10 + "px" }} >
                                        <h5 className="ltTitulo"><b> Sobrenome: </b></h5>
                                        <p>{this.state.perfilAtual.name.surName}</p>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  CPF: </b> </h5>
                                        <p>{this.state.perfilAtual.cpf} </p>
                                    </div>
                                    <br></br>
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
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph " style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Email:</b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.email}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.email} onChange={this.changueEmail} />)}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Telefone: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.phone}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.phone} onChange={this.changuePhone} style={{ float: 'none' }} />)}
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }} >
                                        <h5 className="ltTitulo"><b> Estado Civil: </b></h5>
                                        <p>{this.state.perfilAtual.maritalStatus}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className='row'>

                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-4 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Endereço: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.street}</p>)}
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.endereco} onChange={this.changueEndereco} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-10">
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
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> CEP: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.cep}</p>)}
                                        {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.cep} onChange={this.changueCep} />)}
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">

                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Cidade: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.city}</p>)}
                                        {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.cidade} onChange={this.changueCidade} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Estado: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.state}</p>)}
                                        {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.estado} onChange={this.changueEstado} />)}
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> País: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.country}</p>)}
                                        {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" value={this.state.pais} onChange={this.changuePais} />)}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo" > <b>Observações</b> </h5>

                                        {!this.state.editar && (<p>{this.state.perfilAtual.observations}</p>)}
                                        {this.state.editar && (<textarea style={{ float: 'none' }} className="form-control" rows="4" cols="50" id="Observacoes" name="Observacoes" onChange={this.changueObs} value={this.state.obs}></textarea>)}
                                    </div></div>
                            </div>

                            <br></br>
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-12 col-sm-8 text-center">
                                        <div className="graph" >
                                            <div className="tables table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="text-center">
                                                        <tr >
                                                            <th>#</th>
                                                            <th>Nome</th>
                                                            <th>Parentesco</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="CriaTabela">
                                                        {this.state.perfilAtual.children.map((events, index) => {


                                                            if (events != null && this.state.listaFuncionarios[index] !== null) {
                                                                console.log(events, this.state.listaFuncionarios)
                                                                return (

                                                                    <tr style={{ textAlign: 'justify' }} key={events._id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{this.state.listaFuncionarios[index].name.firstName + " " + this.state.listaFuncionarios[index].name.surName}</td>
                                                                        {events.kinship === undefined && (<td>Outros</td>)}
                                                                        {events.kinship === "others" && (<td>Outros</td>)}
                                                                        {events.kinship === "grandchildren" && (<td>Neto(a)</td>)}
                                                                        {events.kinship === "Brother" && (<td>Irmão/Irmã</td>)}
                                                                        {events.kinship === "nephews" && (<td>Sobrinho(a)</td>)}
                                                                        {events.kinship === "children" && (<td>Filho(a)</td>)}
                                                                        {events.kinship === "Stepson" && (<td>Enteado(a)</td>)}
                                                                        {this.state.editar && (<td><button onClick={() => this.excluirCria(index)}><span className="glyphicon">&#xe014;</span></button></td>)}
                                                                    </tr>
                                                                )
                                                            }
                                                        })}

                                                    </tbody>
                                                </table>

                                            </div>

                                        </div>
                                        {this.state.editar && (<button className="btn btn-md botao botaoAvançar" id="fontBranca" onClick={this.Adicionar}><label style={{ color: 'white' }}>
                                            Adicionar Criança <span className="glyphicon">&#xe065;</span>


                                        </label>
                                        </button>)}
                                    </div>
                                </div>
                                <br></br>

                                {!this.state.editar && (
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={this.editavel} className="btn btn-md botao botaoAvançar" > Editar</button>
                                        <button onClick={this.voltar} className="btn btn-md botao botaoAvançar" > Voltar</button>
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
        if (this.state.page === 'Adicionar') {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a hre="/" > Home </a></li >
                            <li > Adulto </li>
                            <li >Adicionar novas crianças </li>
                        </ol >
                    </div>
                    <div className="graph-visual" >
                        <div className="graph" >
                            <h3 className="inner-tittle" > Buscar Criança</h3>
                            <div className=" text-center">
                                <input type="search" id="childSearch" name="childSearch" className="form-control" value={this.state.childSearch} onChange={this.ChangechildSearch} />
                                <button type="button" className="btn btn-md botao botaoAvançar" onClick={this.Search}> Pesquisar </button>
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
                                        <th >numero de registro</th>

                                        <th className="text-center"> Selecionar </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.map((findChild, indice) => {
                                        return (
                                            <tr key={findChild._id}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findChild.name.firstName} </td>
                                                <td >{findChild.number} </td>

                                                <td className="text-center">    <input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(findChild._id)} /> </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div className="text-center">
                                <button className="btn btn-md botao" onClick={() => this.setState({ page: 'Perfil' })}>Voltar</button>
                                <button className="btn btn-md botao botaoAvançar" onClick={() => this.setState({ page: 'ConfirmarCriança' })}> Adicinar Criança </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.page === 'ConfirmarCriança') {
            return (
                <div className="container-fluid">

                    <div className="graph-visual" >
                        <br></br>
                        <br></br>
                        <div className="graph" >
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Nome</th>
                                        <th >Idade</th>
                                        <th >RG</th>
                                        <th className="text-center"> Parentesco </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.confirmaCrianca.map((findChild, indice) => {
                                        return (
                                            <tr key={findChild._id}>
                                                <th scope="row">{indice + 1}</th>
                                                <td > {findChild.name.firstName} </td>
                                                <td >{moment(findChild.birthday, "YYYYMMDD").toNow(true)} </td>
                                                <td >{findChild.number} </td>
                                                <td className="text-center">
                                                    <select id="kinship" name="kinship" className="form-control optionFomulario" onChange={(event) => this.Changekinship(event, findChild._id)} >
                                                        <option value="others" > Outros </option>
                                                        <option value="children" > Filho(a) </option>
                                                        <option value="Stepson" > Enteado(a) </option>
                                                        <option value="grandchildren"  > Neto(a) </option>
                                                        <option value="nephews"  > Sobrinho(a) </option>
                                                        <option value="Brother" > Irmão/Irmã </option>
                                                    </select >
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                        <button className="btn btn-md botao" onClick={() => this.setState({ page: 'Adicionar' })}>Voltar</button>
                        <button className="btn btn-md botao botaoAvançar" onClick={this.TheEnd}>Finalizar</button>
                    </div>
                </div>
            );
        }
    }
}
export default PerfilAdulto;
