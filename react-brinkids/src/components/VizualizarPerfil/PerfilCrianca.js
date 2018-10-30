import React from 'react';
import listaa from './gato';
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import '../Adultos/css/style.css';
import './icones.css';
import axios from 'axios';

var foto;
class PerfilCrianca extends React.Component {
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

            firstName:'',
            surName:'',
            number:'',
            aniversario:'',
            sexualidade:'',
            nacionalidade:'',

        }
        //funçoes para mudar os values e afins
        this.ChangeSearch = this.ChangeSearch.bind(this);
        this.SearchFuncionario = this.SearchFuncionario.bind(this);

        this.ChangePage = this.ChangePage.bind(this);

        this.editavel = this.editavel.bind(this);

        this.changue = this.changue.bind(this);


        this.salvar = this.salvar.bind(this);
        this.voltar = this.voltar.bind(this);
        this.cancelar = this.cancelar.bind(this);


    }

    //lembrar de terminar as funçoes changue
    changue(event) { this.setState({ [event.target.name]: event.target.value }) }
    //funçao que salva apos o editar
    salvar(event) {
        // this.state.perfilAtual.observations = this.state.obs;

        var formData = new FormData();

        
        if (foto) {
            formData.append('photo', this._dataURItoBlob(foto));
        }
        formData.append('observations', this.state.obs);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.surName);
        formData.append('number', this.state.number);
        formData.append('birthday', this.state.aniversario);
        formData.append('nacionality', this.state.nacionalidade);
        formData.append('sexuality', this.state.sexualidade);
          
        axios.put(`child/${this.state.perfilAtual._id}`, formData)
            .then((response) => {

            })
            .catch((err) => console.log(err));
        

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
        console.log(this.state.perfilAtual);
        const data = this.state.perfilAtual.birthday.match(/([T,\w\*]+)/g);
        const dia = data[2].split(/[T]/g);
        this.setState({
            editar: true,
            aniversario: data[0]+"-"+data[1]+'-'+dia[0],
            surName: this.state.perfilAtual.name.surName,
            firstName: this.state.perfilAtual.name.firstName,
            number:this.state.perfilAtual.number,
            nacionalidade:this.state.perfilAtual.nacionality,
            sexualidade:this.state.perfilAtual.sexuality,
        });

        this.setState({
            obs: this.state.perfilEdicao.observations,
        })
        console.log(this.state.surName);
    }
    SearchFuncionario(event) {
        /*onst lista = [];
        this.setState({ list: [] });
        this.state.listaFuncionarios.forEach(element => {

            if (element.name.firstName == this.state.selectedSearch) {

                lista.push(element);
                this.setState({ list: lista });
            }
        });*/
        axios.get(`/child/filter/${this.state.selectedSearch}`)
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
                                                <td > {findAdult.number} </td>
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
                                foto = e.target.result;
                            }

                            reader.readAsDataURL(files[0]);
                        }

                    }
                }, 100);
            };

            function converter(evento) {
                const data = evento.match(/([T,\w\*]+)/g);
                const dia = data[2].split(/[T]/g);
                
               return dia[0]+"-"+data[1]+'-'+data[0];
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
                        <h3 className="inner-tittle" > Vizualizar Perfil Criança </h3>

                        <div className="graph" >
                            <h3 className="inner-tittle" > Perfil


                            </h3>
                            <div className="col-md-4 col-sm-12 text-center">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo"><b></b></h5>

                                    <img id='fotopreview' style={{ width: 'auto', height: 'auto', maxWidth: 250 + 'px' }} src={this.state.perfilAtual.photo} />
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
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo"><b> Nome: </b></h5>
                                    {!this.state.editar && (<p>{this.state.perfilAtual.name.firstName}</p>)}
                                    {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" name="firstName" onChange={this.changue} value={this.state.firstName} />)}
                                </div>
                                <br></br>
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo"><b> SOBRENOME: </b></h5>
                                    {!this.state.editar && (<p>{this.state.perfilAtual.name.surName}</p>)}
                                    {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" name="surName" onChange={this.changue} value={this.state.surName} />)}
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-6 col-xs-12" >
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo"><b>  Numero de Registro: </b> </h5>
                                    {!this.state.editar && (<p>{this.state.perfilAtual.number} </p>)}
                                    {this.state.editar && (<input style={{ float: 'none' }} type="text" className="form-control" name="number" onChange={this.changue} value={this.state.number} />)}
                                </div>
                                <br></br>
                            </div>
                            <br></br><br></br>
                            <div className="col-md-4 col-sm-12">
                                <div className="graph" style={{ padding: 10 + "px" }}>
                                    <h5 className="ltTitulo"><b> Data de Nascimento: </b></h5>
                                    {!this.state.editar && (<p>{converter(this.state.perfilAtual.birthday)}</p>)}
                                    {this.state.editar && (<input style={{ float: 'none' }} type="date" className="form-control" name="aniversario" onChange={this.changue} value={this.state.aniversario} />
                                    )}
                                </div>
                            </div>
                            <div className="row">


                            </div>

                            <br></br>



                            <div className="row" >

                                <div className="col-md-4 col-sm-4 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Nacionalidade: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.nacionality}</p>)}
                                        {this.state.editar && (<input style={{ float: 'none' }} type="text" name="nacionalidade" className="form-control" onChange={this.changue} value={this.state.nacionalidade} />)}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4 col-xs-12" >
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sexo: </b></h5>
                                        {!this.state.editar && (<p>{this.state.perfilAtual.sexuality}</p>)}
                                        {this.state.editar && (
                                            <select className="form-control" onChange={this.changue} name="sexualidade" style={{height: 46+'px', float:"none"}}>
                                            
                                            {this.state.perfilAtual.sexuality === "Masculino" && (<option value="Masculino" selected>Masculino</option>)}
                                            {this.state.perfilAtual.sexuality != "Masculino" && (<option value="Masculino" >Masculino</option>)}
                                            {this.state.perfilAtual.sexuality === "Feminino" && (<option value="Feminino" selected>Feminino</option>)}
                                            {this.state.perfilAtual.sexuality != "Feminino" && (<option value="Feminino" >Feminino</option>)}
                                            
                                           
                                          </select>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo" ><b> Observações:</b> </h5>

                                        {!this.state.editar && (<p>{this.state.perfilAtual.observations}</p>)}
                                        {this.state.editar && (<textarea style={{ float: 'none' }} className="form-control" name="obs" rows="4" cols="50" id="Observacoes" name="Observacoes" onChange={this.changue} value={this.state.obs}></textarea>)}
                                    </div></div>
                            </div>
                            <br></br>
                            <div className="row">

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

    }
}
export default PerfilCrianca;
