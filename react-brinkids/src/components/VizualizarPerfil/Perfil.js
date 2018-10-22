import React from 'react';
import listaa from './gato';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import './icones.css';
import axios from 'axios';


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
            perfilAtual: listaa,
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
        /*const lista = [];
        this.setState({ list: [] });
        this.state.listaFuncionarios.forEach(element => {

            if (element.name.firstName == this.state.selectedSearch) {

                lista.push(element);
                this.setState({ list: lista });
            }
        });*/
        axios.get(`/employees/filter/${this.state.selectedSearch}`)
            .then((response) => {
                console.log(this.state.selectedSearch);
                console.log(response.data);
                this.setState({ list: response.data });
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


                            </h3>
                            <div className="col-md-6 col-sm-12 text-center">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <br></br>
                                    {this.state.editar && (
                                        <div>
                                            <button className="btn btn-md botao botaoAvançar" style={{ background: ' #2ab7ec' }}><label>
                                                Trocar imagem <span className="glyphicon">&#xe065;</span>

                                                <input id="tipofile" type="file" name="foto" defaultValue="" />
                                            </label>
                                            </button><br /></div>)
                                    }
                                    <img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
                                
                                </div>
                                <br></br>
                            </div>
                            <div className="col-md-6 col-sm-12 text-center">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo" ><b> LOGIN </b></h5>
                                    <p>ffffffff</p>
                                </div>
                                <br></br>

                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo" ><b> STATUS DE EMPREGO  </b></h5>
                                    <p>ffffffff</p>
                                </div><br />
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nome: </b></h5>
                                        <p>{this.state.perfilAtual.name.firstName}</p>
                                    </div><br></br>
                            </div>

                            <div className="row">

                                <div className="col-md-12 col-sm-12">
                                    
                                    
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
                                        {this.state.editar && (<input type="text" style={{ float: 'none' }} className="form-control" value={this.state.email} onChange={this.changueEmail} />)}

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
                                    <div className="graph" style={{ padding: 10 + "px", height: 128+'px' }}>

                                        <h5 className="ltTitulo" > <b>Educação:</b> </h5>
                                        
                                        <p>{this.state.perfilAtual.education}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", height: 128+'px' }}>

                                        <h5 className="ltTitulo" ><b>Parentesco:</b>  </h5>

                                        <p><b>Nome do pai:</b> {this.state.perfilAtual.kinship.fatherName}</p>
                                        <p><b>Nome do Mae:</b> {this.state.perfilAtual.kinship.fatherName}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px", height: 128+'px' }}>

                                        <h5 className="ltTitulo" > <b>Lugar de Origem:</b> </h5>
                                        
                                        <p><b>Cidade:</b> {this.state.perfilAtual.birthplace.city}</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.birthplace.state}</p>
                                    </div>
                                </div>
                            </div >
                            <br></br>
                            <div className="row">

                                
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px",height: 255+'px' }}>

                                        <h5 className="ltTitulo" ><b>Carteira de trabalho:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.workPortfolio.number}d</p>
                                        <p><b>Series:</b> {this.state.perfilAtual.workPortfolio.series}d</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.workPortfolio.state}d</p>
                                        <p><b>PIS_PASEP:</b> {this.state.perfilAtual.workPortfolio.PIS_PASEP}d</p>
                                        <p><b>Data de Emissão:</b>{this.state.perfilAtual.workPortfolio.dateIssue}d</p>
                                        <p><b>Lugar de Emissão:</b> {this.state.perfilAtual.workPortfolio.placeIssued}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px",height: 255+'px' }}>

                                        <h5 className="ltTitulo" ><b>Título de Eleitor:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.electionTitle.number}d</p>
                                        <p><b>Zona:</b> {this.state.perfilAtual.electionTitle.zone}d</p>
                                        <p><b>Seção:</b> {this.state.perfilAtual.electionTitle.section}d</p>
                                        <p><b>Estado:</b> {this.state.perfilAtual.electionTitle.state}d</p>
                                        
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px",height: 255+'px' }}>

                                        <h5 className="ltTitulo" ><b>Registro Geral:</b>  </h5>

                                        <p><b>Orgão Emissor:</b> {this.state.perfilAtual.rg.issuingBody}d</p>
                                        <p><b>Data de Emissão:</b> {this.state.perfilAtual.rg.dateIssue}d</p>             
                                        <p><b>Estado:</b> {this.state.perfilAtual.rg.state}d</p>
                                        
                                    </div>
                                </div>
                            </div >
                            <br></br>
                            <div className="row">

                                
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px",height: 255+'px' }}>

                                        <h5 className="ltTitulo" ><b>Reservista:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.militaryReservist.number}d</p>
                                        <p><b>Series:</b> {this.state.perfilAtual.militaryReservist.series}d</p>
                                        <p><b>Categoría:</b> {this.state.perfilAtual.militaryReservist.category}d</p>
                                       
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px",height: 255+'px' }}>

                                        <h5 className="ltTitulo" ><b>Passaporte:</b>  </h5>

                                        <p><b>Numero:</b> {this.state.perfilAtual.passport.number}d</p>
                                        <p><b>Tipo:</b> {this.state.perfilAtual.passport.type}d</p>
                                        <p><b>Continente de Emissão:</b> {this.state.perfilAtual.passport.issuingCountry}d</p>
                                        <p><b>Data de Emissão:</b> {this.state.perfilAtual.passport.dateIssue}d</p>
                                        <p><b>Data de Expiração:</b> {this.state.perfilAtual.passport.expirationDate}d</p>
                                        
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px",height: 255+'px' }}>

                                        <h5 className="ltTitulo" ><b>CNH:</b>  </h5>

                                        <p><b>Registro:</b> {this.state.perfilAtual.cnh.record}d</p>
                                        <p><b>Categoria:</b> {this.state.perfilAtual.cnh.category}d</p>             
                                        <p><b>Data de Expiração:</b> {this.state.perfilAtual.cnh.expirationDate}d</p>
                                        <p><b>Comentários:</b> {this.state.perfilAtual.cnh.comments}d</p>
                                        <p><b>Local de Emissão:</b> {this.state.perfilAtual.cnh.placeIssue}d</p>
                                        <p><b>Data de Emissão:</b> {this.state.perfilAtual.cnh.dateIssue }d</p>
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
                        <h3 className="inner-tittle" > Vizualizar Perfil Funcionario </h3>

                        <div className="graph" >
                            <h3 className="inner-tittle" > Mudar Senha</h3>
                        </div>

                    </div>
                    <div className="col-md-12 col-sm-12 text-center">
                        <div className="col-md-6 col-sm-12 text-center" >
                            <div className="graph" style={{ padding: 10 + "px" }}>
                                <h5 className="ltTitulo" style={{ color: 'red' }}><b> DIGITE A SENHA ATUAL </b></h5>
                                <p><input type="password" value={this.state.senhaAtual} onChange={this.changueSenhaAtual} style={{ background: 'white', textAlign: 'center', fontSize: 125 + '%' }} /></p>
                            </div>
                            <br></br>
                            <div className="graph" style={{ padding: 10 + "px" }}>
                                <h5 className="ltTitulo" style={{ color: 'red' }}><b> DIGITE A NOVA SENHA </b></h5>
                                <p><input type="password" value={this.state.senhaNova} onChange={this.changueSenha} style={{ background: 'white', textAlign: 'center', fontSize: 125 + '%' }} /></p>

                            </div>
                            <div className="graph" style={{ padding: 10 + "px" }}>
                                <button onClick={() => this.setState({ page: 'Perfil', editar: false })} className="btn btn-md botao botaoAvançar" style={{}}> Alterar Senha</button>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }
}
export default Perfil;
