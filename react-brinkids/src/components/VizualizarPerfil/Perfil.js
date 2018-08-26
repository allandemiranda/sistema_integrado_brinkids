import React from 'react';

import listaa from './gato';

// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import './icones.css';



class Perfil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            reserva: [],
            //lista de funcionarios recebida do banco de dados
            listaFuncionarios: listaa,
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
    //funçao que salva apos o editar
    salvar(event) {
        this.state.perfilAtual.observations = this.state.obs,
            this.state.perfilAtual.address.number = this.state.numero,
            this.state.perfilAtual.address.state = this.state.estado,
            this.state.perfilAtual.address.district = this.state.bairro,
            this.state.perfilAtual.phone = this.state.phone,
            this.state.perfilAtual.address.city = this.state.cidade,
            this.state.perfilAtual.address.cep = this.state.cep,
            this.state.perfilAtual.email = this.state.email,
            this.state.perfilAtual.address.street = this.state.endereco,
            this.state.perfilAtual.address.country = this.state.pais,
            this.setState({

                editar: false,

            })
    }
    //função que alterna as paginas
    ChangePage(event) {
        this.setState(
            {
                perfilEdicao: event,
                perfilAtual: event,
                reserva: event,
                page: 'Perfil'
            })


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
        const lista = [];
        this.setState({ list: [] });
        this.state.listaFuncionarios.forEach(element => {

            if (element.name.firstName == this.state.selectedSearch) {

                lista.push(element);
                this.setState({ list: lista });
            }
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
                            <li > < a href="/" > Home </a></li >
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
                                                <td className="text-center"> <button onClick={() => this.ChangePage(findAdult)}><span className="glyphicon">&#xe065;</span></button></td>
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
                        <h3 className="inner-tittle" > Vizualizar Perfil Funcionario </h3>

                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil
                            {!this.state.editar && (
                                    <div>
                                        <button onClick={this.editavel} className="btn btn-md botao botaoAvançar" style={{ float: 'right' }}> Editar</button>
                                        <button onClick={this.voltar} className="btn btn-md botao botaoAvançar" style={{ float: 'right' }}> Voltar</button>
                                    </div>

                                )}
                                {this.state.editar && (
                                    <div>
                                        <button onClick={this.salvar} className="btn btn-md botao botaoAvançar" style={{ float: 'right' }}> Salvar</button>
                                        <button onClick={this.cancelar} className="btn btn-md botao botaoAvançar" style={{ float: 'right' }}> Cancelar</button>
                                    </div>
                                )}
                            </h3>
                            <div className="col-md-6 col-sm-12 text-center">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                    {this.state.editar && (
                                        <div>
                                            <button className="btn btn-md botao botaoAvançar" onClick={() => console.log(this.state.flut)} style={{ background: ' #2ab7ec' }}><label>
                                                Trocar imagem <span className="glyphicon">&#xe065;</span>

                                                <input id="tipofile" type="file" name="foto" value="" />
                                            </label>
                                            </button><br /></div>)
                                    }
                                    <img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 450 + 'px' }} src='https://i.pinimg.com/originals/12/74/4e/12744effc2ecc1d84ca7d7e01f9c6bc5.jpg' />
                                </div>

                            </div>
                            <div className="col-md-6 col-sm-12 text-center">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo" style={{ color: 'red' }}><b> LOGIN </b></h5>
                                    <p>ffffffff</p>
                                </div>
                                <br></br>
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo" style={{ color: 'red' }}><b> SENHA </b></h5>
                                    <p>ffffffff</p>
                                </div>
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo" style={{ color: 'red' }}><b> STATUS DE EMPREGO  </b></h5>
                                    <p>ffffffff</p>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-12 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.perfilAtual.name.firstName}</p>
                                    </div>
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> SOBRENOME: </b></h5>
                                        <p>{this.state.perfilAtual.name.surName}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b>  CPF: </b> </h5>
                                        <p>{this.state.perfilAtual.cpf} </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12" >
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
                                        <p>{this.state.perfilAtual.birthday}</p>
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
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.phone} onChange={this.changuePhone} />)}
                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-6 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Estado Civil: </b></h5>
                                        <p>{this.state.perfilAtual.maritalStatus}</p>
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className='row'>
                                <div className="col-md-12 col-sm-12 col-xs-12">
                                    <div className="graph ">
                                        <h5 className="ltTitulo"> <b> Email:</b> </h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.email}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.email} onChange={this.changueEmail} />)}
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Endereço: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.street}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.endereco} onChange={this.changueEndereco} />)}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-10">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Bairro: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.district}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.bairro} onChange={this.changueBairro} />)}
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Número: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.number}</p>)}
                                        {this.state.editar && (<input className="form-control" type="text" value={this.state.numero} onChange={this.changueNumero} />)}
                                    </div>
                                </div>
                            </div>

                            <br></br>

                            <div className="row">
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> CEP: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.cep}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.cep} onChange={this.changueCep} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Cidade: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.city}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.cidade} onChange={this.changueCidade} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Estado: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.state}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.estado} onChange={this.changueEstado} />)}
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> País: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.address.country}</p>)}
                                        {this.state.editar && (<input type="text" className="form-control" value={this.state.pais} onChange={this.changuePais} />)}
                                    </div>
                                </div>
                            </div>

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


                            </div>
                            <br></br>
                        </div >
                    </div>
                </div>

            );
        }

    }
}
export default Perfil;
