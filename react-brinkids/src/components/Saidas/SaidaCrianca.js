import React from 'react';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import update from 'react-addons-update';
import moment from 'moment';
import ComprovantSaida from '../Comprovante/comprovantedeSaida';
// CSS Layout
import '../../assets/style/bootstrap.min.css';
import '../../assets/style/font-awesome.css';
import './css/Saida_Crianca.css';
import './css/style.css';

import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';
import { timingSafeEqual } from 'crypto';

class SaidaCrianca extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            comprovante: false,
            dadoscomprovante: [],
            page: "Adultos",
            namebutton: "Proxima Criança",
            indice: 0,
            FormPag: "",
            //VARIAVEL QUE FAZ A VERIFICAÇÂO SE O DESCONTO DEU CERTO
            verified: false,

            listAdultos: [],
            listAdultosSemDuplicado: [],
            listCrianca: [],
            CriancasSelecionadas: [],

            //ARRAY DE VARIAVEIS RELACIONADA AS CRIANÇAS
            ValorCria: [],

            //ARRAY DE VARIVEIS RALACIONADA AS CRIANÇAS COM DESCONTO INCLUSO
            ValorCriaDesc: [],

            //VARIAVEL PARA CODIGO DO DESCONTO
            CodDes: "",

            //ADULTO
            IDAdult: "",
            TimeAdult: "",
            NameAdult: "",
            PhoneAdult: "",
            CPFAdult: "",
            ObsAdult: "",
            PhotoAdult: "",

            //Criança
            Aux: "",
            NameCria: "",
            PhotoCria: "",
            IdadeCria: "",
            TimeCria: "",
            ObsCria: "",
            RetCria: "",
            ProdutoCria: "",
            //VARIAVEL PARA GUARDAR O VALOR DA CRIANÇA QUE ESTA SENDO ACESSADA NAQUELE INSTANTE
            ValorCrianca: "",

            //Ultima Tela
            TotalValor: 0.00,
            TotalValorDesc: 0.00,
            FinalValor: 0.00,
            nomeFuncionario: "",
            auxw: [],
        }

        this.ChangeValue = this.ChangeValue.bind(this);
        this.ProximaTela = this.ProximaTela.bind(this);

    }
    resetar = () => {
        this.setState({

            CriancasSelecionadas: [],

            //ARRAY DE VARIAVEIS RELACIONADA AS CRIANÇAS
            ValorCria: [],

            //ARRAY DE VARIVEIS RALACIONADA AS CRIANÇAS COM DESCONTO INCLUSO
            ValorCriaDesc: [],

            //VARIAVEL PARA CODIGO DO DESCONTO
            CodDes: "",

            //ADULTO


            //Criança
            Aux: "",
            NameCria: "",
            PhotoCria: "",
            IdadeCria: "",
            TimeCria: "",
            ObsCria: "",
            RetCria: "",
            ProdutoCria: "",
            //VARIAVEL PARA GUARDAR O VALOR DA CRIANÇA QUE ESTA SENDO ACESSADA NAQUELE INSTANTE
            ValorCrianca: "",

            //Ultima Tela
            TotalValor: 0.00,
            TotalValorDesc: 0.00,
            FinalValor: 0.00,
            nomeFuncionario: "",
        })
    }
    requisicao = () => {
        axios.get('/product')
            .then((response) => {
                console.log("Dentro do axios: " + this)
                console.log(response.data);
                this.setState({
                    listAdultos: response.data,
                    verified: true,
                });
                // console.log("adultos", this.state.listAdultos)
            }).catch((error) => {
                console.log("Não deu certo");
                console.log(error)//LOG DE ERRO
                alert("Nenhum Adulto está com criança na loja");
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        console.log(this.state.listAdultos)

        ///Função que limpa a lista de duplicatas.
        function noRepeat(arr) {
            var cleaned = [];
            arr.forEach(function (item) {
                var unique = true;
                cleaned.forEach(function (item2) {
                    console.log("item: ", item.adult.id);
                    console.log("item2: ", item2.adult.id)
                    if (item.adult.id === item2.adult.id) {//se os id forem iguais ele não salva na lista
                        unique = false//variavel de verificação necessária pq só vai salvar quando terminar o loop interno
                    };
                });
                if (unique) {  //agora se no loop interno nenhuma vez encontrou um id de adulto igual a outro, ele salva
                    cleaned.push(item)
                };
            });
            return cleaned;
        }

        setTimeout(_ => {

            if (this.state.verified === true) {

                var noRepeatedList = noRepeat(this.state.listAdultos); //chamando a função que limpa a lista
                console.log("unificado: ", noRepeatedList)

                for (var i = 0; i < noRepeatedList.length; i++) {
                    this.setState({
                        listAdultosSemDuplicado: update(this.state.listAdultosSemDuplicado, { $push: [noRepeatedList[i]] })//salavdno no this.state
                    })
                }

            }
            this.setState({
                verified: false,
            })
        }, 500)
    }
    Funcionario = (number) => {
        const a = getToken();
        const b = jwt.verify(a, config.secret_auth);

        axios.get(`/employees/${b.id}`)
            .then((response) => {
                let id = response.data[0].identifierEmployee.employeeData.officialPosition;

                const b = jwt.verify(getToken(), config.secret_auth);


                axios.get(`/adult/${b.id}`)
                    .then((response) => {

                        const name = response.data.name.firstName + " " + response.data.name.surName;
                        this.setState({
                            nomeFuncionario: response.data.name.firstName + " " + response.data.name.surName
                        })
                        console.log(name)
                    }).catch((err) => {
                        console.log(err);
                    });

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
                            this.requisicao();
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
        this.Funcionario(20);
    }
    //Bloco que muda o status para o atual do formulario.
    ChangeValue(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    //FUNÇÃO QUE SELECIONA O ADULTO DESEJADO
    Selecionar = (resp1, respName) => {
        console.log(resp1);
        var deubom = true;
        setTimeout(_ => {
            axios.get('/adult/' + resp1)
                .then((response) => {
                    console.log("Dentro do axios: " + this)
                    this.setState({
                        TimeAdult: moment().format(),
                        IDAdult: response.data._id,
                        NameAdult: response.data.name,
                        PhoneAdult: response.data.phone,
                        CPFAdult: response.data.cpf,
                        ObsAdult: response.data.observations,
                        PhotoAdult: response.data.photo,
                    });

                }).catch((error) => {
                    console.log("Não deu certo, Adulto não encontrado!");
                    console.log(error)//LOG DE ERRO
                    deubom = false;
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                })
        }, 1000);
        console.log(this.state.NameAdult)
        axios.get('/product/filter/' + respName)
            .then((response) => {
                console.log("Dentro do axios: " + this)
                this.setState({
                    listCrianca: response.data,
                });
            }).catch((error) => {
                console.log("Não deu certo, nenhuma criança esta com esse adulto!");
                console.log(error)//LOG DE ERRO
                //deubom = false;
                // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
            })
        setTimeout(_ => {
            //console.log(deubom);
            if (deubom === true) {
                this.setState({
                    page: "UsuarioAdulto",
                })
            }
        }, 1000);
    }

    //AQUi É A FUNÇÃO QUE SELECIONA AS CRIANÇAS QUE IRÃO SAIR
    selecionaCrianca(identifier) {
        console.log("Entrei aqui");
        this.state.listCrianca.forEach((crianca, indice) => {
            if (crianca.children.id === identifier) {
                console.log("Entrei aqui");
                this.setState({
                    CriancasSelecionadas: update(this.state.CriancasSelecionadas, { $push: [this.state.listCrianca[indice]] })
                })
            }
        });
    }

    //FUNÇÃO QUE PASSAR PARA PROXIMA TELA APOS ESCOLHA DAS CRIANÇAS
    ProximaTela(event) {

        let temporario = [];
        this.state.CriancasSelecionadas.map((event, indice) => {
            axios.get(`/passport/` + this.state.CriancasSelecionadas[indice].children.id + `/` + moment() + '/')
                .then((response) => {
                    console.log(response);
                    console.log(this.state.page)
                    temporario.push({ crianca: event, infocrianca: response.data })
                    this.setState({

                        ValorCria: update(this.state.ValorCria, { $push: [response.data] }),


                    })
                }).then(() => {
                    console.log(temporario)
                    this.setState({
                        CriancasSelecionadas: temporario,
                        page: "MostraCrianca",
                    })
                }).catch((error) => {
                    console.log(error)//LOG DE ERRO
                    alert("Erro no Cadastro");
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                })
        })
    }



    //FUNÇÃO QUE FAZ PASSAR AS CRIANÇAS 
    ProximaCria = () => {

        if (this.state.indice === (this.state.CriancasSelecionadas.length - 1)) {

            //AQUI ONDE FAZ O CALCULO FINAL DO PROCESSO TODO
            var j = 0.0;
            var k = 0.0;
            //AQUI É O VALOR FINAL
            this.state.CriancasSelecionadas.map((resp, indice) => {
                j += parseFloat(resp.infocrianca.value);
            })
            //AQUI É O VALOR FINAL COM DESCONTO
            this.state.CriancasSelecionadas.map((resp, indice) => {
                if (resp.hasOwnProperty('codigos')) {
                    k += parseFloat(resp.codigos.value);
                }

            })
            this.setState({
                TotalValor: (j).toFixed(2),
                TotalValorDesc: (k).toFixed(2),
                FinalValor: (j - k).toFixed(2),
                page: "FinalizarSaida",
                CodDes: "",
            })

        } else {
            this.setState({
                indice: this.state.indice + 1,
            })
        }

    }

    //FUNÇÃO QUE VERIFICA O DESCONTO PARA CRIANÇA E FAZ O DESCONTO CASO EXISTA!
    VerificaDescontoFilhos = (Codigo) => {
        var tipo = "";
        var valued = 0;
        let codigonaousado = true;
        for (var d = 0; d < this.state.CriancasSelecionadas.length; d++) {
            if (this.state.CriancasSelecionadas[d].hasOwnProperty('codigos')) {
                if (this.state.CriancasSelecionadas[d].codigos.code === Codigo) {
                    codigonaousado = false;
                    break;
                }
            }
        }
        if (codigonaousado) {
            axios.get(`/discount/filter/${Codigo}/Child`)
                .then((response) => {
                    if (response.data.length > 0) {
                        let temporario = this.state.CriancasSelecionadas;
                        tipo = response.data[0].type;
                        valued = response.data[0].value;
                        console.log(temporario)
                        alert("Desconto Validado")
                        this.setState({
                            verified: true,
                            CriancasSelecionadas: temporario
                        })
                    } else {
                        let temporario = this.state.CriancasSelecionadas;
                        delete temporario[this.state.indice].codigos;
                        console.log(temporario)
                        this.setState({
                            CriancasSelecionadas: temporario,
                        })

                        alert("Desconto não encontrado")
                    }
                }).catch((error) => {
                    console.log("Não deu certo");
                    console.log(error)//LOG DE ERRO
                    alert("Desconto não encontrado")
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                })
        } else {
            alert("Codigo ja utilizado por uma criança durante essa saida")
        }
        setTimeout(_ => {
            let temporario = this.state.CriancasSelecionadas;

            if (this.state.verified == true) {

                axios.get(`/passport/discount/` + this.state.CriancasSelecionadas[this.state.indice].crianca.children.id + '/' + this.state.CodDes + `/` + this.state.CriancasSelecionadas[this.state.indice].infocrianca.value + `/` + this.state.IDAdult)
                    .then((response) => {

                        if (response.data === 1) {
                            alert("Desconto Diario ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 2) {
                            alert("Desconto Semanal ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 3) {
                            alert("Desconto Mensal ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 4) {
                            alert("Desconto Anual ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 5) {
                            alert("Desconto Unico Não Pertence a Essa Pessoa")
                        } else if (response.data === 6) {
                            alert("Codigo do Desconto Não Encontrado")
                        } else if (response.data === 7) {

                            alert("Desconto Fora da Validade")
                        } else if (response.data === 9) {

                            alert("Desconto Unico ja usado")
                        } else {

                            temporario[this.state.indice].codigos = response.data;
                            temporario[this.state.indice].codigos.type = tipo;
                            temporario[this.state.indice].codigos.ValueD = valued;
                            this.setState({
                                ValorCriaDesc: update(this.state.ValorCriaDesc, { $push: [response.data] }),
                                CriancasSelecionadas: temporario
                            })
                            alert("Desconto Concluído")

                        }




                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        alert("Erro no Cadastro");
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })
            }
        }, 1000);
        this.setState({
            verified: false,
        })
    }
    //FUNÇÃO QUE VERIFICA O DESCONTO PARA ADULTO E FAZ O DESCONTO CASO EXISTA!
    VerificaDescontoPAi = (Codigo) => {
        var tipo = "";
        let codigonaousado = true;
        var valued = 0;

        if (this.state.CriancasSelecionadas[0].hasOwnProperty('adult')) {
            if (this.state.CriancasSelecionadas[0].adult.code === Codigo) {
                codigonaousado = false;

            }
        }
        if (codigonaousado) {
            axios.get(`/discount/filter/${Codigo}/Adult`)
                .then((response) => {
                    console.log(response.data)
                    if (response.data.length > 0) {
                        let temporario = this.state.CriancasSelecionadas;
                        tipo = response.data[0].type;
                        valued = response.data[0].value;
                        alert("Desconto Validado")
                        this.setState({
                            verified: true,

                        })
                    } else {
                        let temporario = this.state.CriancasSelecionadas;
                        delete temporario[0].adult;

                        var j = 0.0;
                        var k = 0.0;
                        //AQUI É O VALOR FINAL
                        this.state.CriancasSelecionadas.map((resp, indice) => {
                            j += parseFloat(resp.infocrianca.value);
                        })
                        //AQUI É O VALOR FINAL COM DESCONTO
                        this.state.CriancasSelecionadas.map((resp, indice) => {
                            if (resp.hasOwnProperty('codigos')) {
                                k += parseFloat(resp.codigos.value);
                            }


                        })
                        if (k > j) {
                            this.setState({
                                TotalValor: (j).toFixed(2),
                                TotalValorDesc: (k).toFixed(2),
                                FinalValor: (0).toFixed(2),
                            })
                        } else {
                            this.setState({
                                TotalValor: (j).toFixed(2),
                                TotalValorDesc: (k).toFixed(2),
                                FinalValor: (j - k).toFixed(2),
                            })
                        }
                        this.setState({
                            CriancasSelecionadas: temporario,
                        })
                        alert("Desconto não encontrado ou invalido")
                    }

                }).catch((error) => {
                    console.log("Não deu certo");
                    console.log(error)//LOG DE ERRO
                    alert("Desconto não encontrado")
                    // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                    // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                    // alert("Erro na Busca: " + error.response.status + " --> " + error.response.data);
                })
        } else {
            alert("Codigo Ja Usado Para essa saida")
        }
        setTimeout(_ => {
            console.log(this.state.FinalValor)
            if (this.state.verified == true) {
                axios.get(`/passport/discountAdult/` + this.state.IDAdult + `/` + this.state.FinalValor + `/` + this.state.CodDes)
                    .then((response) => {
                        if (response.data === 1) {
                            alert("Desconto Diario ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 2) {
                            alert("Desconto Semanal ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 3) {
                            alert("Desconto Mensal ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 4) {
                            alert("Desconto Anual ja usado, Por Favor Espere o Tempo Para Poder Usar Novamente")
                        } else if (response.data === 5) {
                            alert("Desconto Unico Não Pertence a Essa Pessoa")
                        } else if (response.data === 6) {
                            alert("Codigo do Desconto Não Encontrado")
                        } else if (response.data === 7) {
                            alert("Desconto Fora da Validade")
                        } else if (response.data === 9) {

                            alert("Desconto Unico ja usado")
                        } else {

                            let temporario = this.state.CriancasSelecionadas;
                            console.log(response.data)
                            temporario[0].adult = response.data;
                            temporario[0].adult.type = tipo;
                            temporario[0].adult.ValueD = valued;
                            console.log(temporario)
                            this.setState({
                                //CodDes:"",
                                ValorCriaDesc: update(this.state.ValorCriaDesc, { $push: [response.data] }),
                                CriancasSelecionadas: temporario,
                            })
                            alert("Desconto Concluído");
                            //AQUI É O VALOR FINAL

                            var j = 0.0;
                            var k = 0.0;
                            //AQUI É O VALOR FINAL
                            this.state.CriancasSelecionadas.map((resp, indice) => {

                                j += parseFloat(resp.infocrianca.value);
                            })
                            //AQUI É O VALOR FINAL COM DESCONTO
                            this.state.CriancasSelecionadas.map((resp, indice) => {
                                if (indice === 0 && resp.hasOwnProperty('adult')) {
                                    if (resp.hasOwnProperty('codigos')) {
                                        console.log(response.data, resp.codigos,resp.adult)
                                        k += parseFloat(resp.adult.ValueD);
                                        k += parseFloat(resp.codigos.value);
                                    } else {
                                        k += parseFloat(resp.adult.ValueD);
                                    }

                                    console.log(k)
                                } else if (resp.hasOwnProperty('codigos')) {
                                    k += parseFloat(resp.codigos.value);
                                }


                            })
                            if (k > j) {
                                this.setState({
                                    TotalValor: (j).toFixed(2),
                                    TotalValorDesc: (k).toFixed(2),
                                    FinalValor: (0).toFixed(2),
                                })
                            } else {
                                this.setState({
                                    TotalValor: (j).toFixed(2),
                                    TotalValorDesc: (k).toFixed(2),
                                    FinalValor: (j - k).toFixed(2),
                                })
                            }
                            this.setState({
                                CriancasSelecionadas: temporario
                            })
                        }


                    }).catch((error) => {
                        console.log(error)//LOG DE ERRO
                        alert("Erro ao colocar Desconto");
                        // console.log("Status do erro: " + error.response.status) //HTTP STATUS CODE
                        // console.log("Dados do erro: " + error.response.data) //HTTP STATUS TEXT
                        // alert("Erro ao Cadastar: " + error.response.status + " --> " + error.response.data);
                    })
            }
        }, 1000);
        this.setState({
            verified: false,
        });
    }

    //Função que finaliza tudo
    Finalizar = (event) => {

        event.preventDefault();

        if (this.state.FormPag !== "") {
            let temporario = [];
           

            for (var i = 0; i < this.state.CriancasSelecionadas.length; i++) {
                var entradas = this.state.listCrianca[i];
                var comprovante=[];
                if (this.state.CriancasSelecionadas[i].hasOwnProperty('codigos')) {
                    console.log(entradas)
                    delete entradas.desconto.crianca.photo;
                    delete entradas.photo;
                    comprovante = {
                        
                        valor: String(this.state.FinalValor),
                        valor2: String(this.state.TotalValor),
                        idpai: String(this.state.IDAdult),
                        Form: String(this.state.FormPag),
                        idcria: String(this.state.CriancasSelecionadas[i].crianca.children.id),
                        entrada: entradas,
                        funcionario: String(this.state.nomeFuncionario),
                        valor3: this.state.ValorCria,
                        desconto: this.state.CriancasSelecionadas,
                        valorcria: parseFloat(this.state.CriancasSelecionadas[i].codigos.ValueD)
                    }
                }
                else {
                    console.log(entradas)
                   
                    delete entradas.photo;
                     comprovante = {

                        valor: String(this.state.FinalValor),
                        valor2: String(this.state.TotalValor),
                        idpai: String(this.state.IDAdult),
                        Form: String(this.state.FormPag),
                        idcria: String(this.state.CriancasSelecionadas[i].crianca.children.id),
                        entrada: entradas,
                        funcionario: String(this.state.nomeFuncionario),
                        valor3: this.state.ValorCria,
                        desconto: this.state.CriancasSelecionadas,
                        valorcria: parseFloat(this.state.CriancasSelecionadas[i].infocrianca.value)
                    }
                }
                console.log(this.state.ValorCriaDesc)
                temporario.push(comprovante);
                console.log(temporario)

            }

            axios.post(`/passport/a/`, temporario)
                .then((response) => {


                    this.setState({
                        dadoscomprovante: temporario,
                    });

                }).then(() => {
                    this.setState({
                        comprovante: true,
                    });
                }).then(() => {

                    const criancas = this.state.CriancasSelecionadas.map(async (crianca, index) => {
                        console.log(crianca)
                        if (index == 0 && crianca.hasOwnProperty('adult')) {
                            if (crianca.hasOwnProperty('codigos')) {
                                const response = await axios.post(`/passport/discont/${crianca.adult.idAdult}/${crianca.adult.code}/${crianca.adult.indicecodes}`);
                                const response1 = await axios.post(`/passport/discont/${crianca.codigos.idcria}/${crianca.codigos.code}/${crianca.codigos.indicecodes}`);
                            } else {
                                const response = await axios.post(`/passport/discont/${crianca.adult.idAdult}/${crianca.adult.code}/${crianca.adult.indicecodes}`);
                            }


                        } else if (crianca.hasOwnProperty('codigos')) {
                            const response1 = await axios.post(`/passport/discont/${crianca.codigos.idcria}/${crianca.codigos.code}/${crianca.codigos.indicecodes}`);
                        }


                    });
                }).then(() => {
                    this.props.history.push("/");
                }).catch((err) => console.log(err));

        } else {
            alert("Selecione uma forma de pagamento");
            return (0);
        }

    }

    //Função para voltar a tela de escolha de responsavel
    VoltarEscolhaAdulto = (event) => {
        this.setState({
            page: "Adultos",
        })
    }
    VoltarCrianca = (nomeCrianca, check) => {
        if (this.state.indice === (this.state.CriancasSelecionadas.length - 1) && this.state.page === "FinalizarSaida") {
            this.setState({
                page: "MostraCrianca"
            })
        } else if (this.state.indice > 0 && this.state.indice === (this.state.CriancasSelecionadas.length - 1) && this.state.page === "MostraCrianca") {
            this.setState({
                indice: this.state.indice - 1,
            })
        } else if (this.state.indice === 0) {
            this.setState({
                page: "UsuarioAdulto",
            })
            this.resetar();
        }

    }

    render() {
        if (this.state.page === "Adultos") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saída de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Escolha o Responsável</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Telefone</th>
                                            <th className="text-center">Selecionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.listAdultosSemDuplicado.map((resp, indice) => {

                                            return (
                                                <tr className="text-center" key={resp._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td className="text-center"> {resp.adult.name} </td>
                                                    <td className="text-center">{resp.adult.phone} </td>
                                                    <td className="text-center"><button className="btn botao btn-xs text-center" onClick={() => this.Selecionar(resp.adult.id, this.state.listAdultos[indice].adult.name)}>Selecionar</button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "UsuarioAdulto") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saída de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Responsável Selecionado</h3>
                        <div className="graph" >
                            <div className="row">
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Nome:</b></h5>
                                        <p>{this.state.NameAdult.firstName + " " + this.state.NameAdult.surName}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Telefone:</b></h5>
                                        <p>{this.state.PhoneAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>CPF:</b></h5>
                                        <p>{this.state.CPFAdult}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.ObsAdult}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={this.state.PhotoAdult} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="graph">
                            <div className="tables table-responsive">
                                <form>
                                    <table className="table table-hover">
                                        <thead className="text-center">
                                            <tr>
                                                <th>#</th>
                                                <th className="text-center">Nome</th>
                                                <th className="text-center">Produto</th>
                                                <th className="text-center">Tempo</th>
                                                <th className="text-center">Selecionar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.listCrianca.map((resp, indice) => {
                                                return (
                                                    <tr key={resp._id}>
                                                        <th scope="row">{(indice + 1)}</th>
                                                        <td className="text-center"> {resp.children.name} </td>
                                                        <td className="text-center">{resp.service}</td>
                                                        <td className="text-center">{moment(resp.time).format("HH:mm")}</td>
                                                        <td className="text-center"><input type="checkbox" name="selectchild" value="true" onClick={() => this.selecionaCrianca(resp.children.id)} /></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                    <br></br>
                                    <div className="text-center">
                                        <a className="btn btn-md botao" href="/">Cancelar</a>
                                        <button className="btn btn-md botao botaoAvançar" onClick={this.VoltarEscolhaAdulto}>Voltar</button>
                                        <input type="button" className="btn btn-md botao botaoAvançar" onClick={this.ProximaTela} value="Próximo" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "MostraCrianca") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saída de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Crianças Selecionadas</h3>
                        <div className="graph" >
                            <div className="row">
                                <div className="col-md-6 col-md-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Sua Foto: </b></h5>
                                        <img src={this.state.CriancasSelecionadas[this.state.indice].crianca.photo} />
                                    </div>
                                </div>
                                <div className="col-md-6 col-md-12">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 com-xs-12">
                                            <div className="graph">
                                                <h5 className="ltTitulo"><b>Nome:</b></h5>
                                                <p>{this.state.CriancasSelecionadas[this.state.indice].crianca.children.name}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-sm-12 com-xs-12">
                                            <div className="graph">
                                                <h5 className="ltTitulo"><b>Idade:</b></h5>
                                                <p>{moment(this.state.CriancasSelecionadas[this.state.indice].crianca.children.birthday).toNow(true)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Produto:</b></h5>
                                        <p>{this.state.CriancasSelecionadas[this.state.indice].crianca.service}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Tempo:</b></h5>
                                        <p>{moment(this.state.CriancasSelecionadas[this.state.indice].crianca.time).format("HH:mm")}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-12 com-xs-12">
                                    <div className="graph">
                                        <h5 className="ltTitulo"><b>Valor:</b></h5>
                                        <p>{this.state.CriancasSelecionadas[this.state.indice].infocrianca.value}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Restrições: </b></h5>
                                        <p>{this.state.CriancasSelecionadas[this.state.indice].crianca.children.restrictions}</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12 col-xs-12">
                                    <div className="graph" style={{ padding: 10 + "px" }}>
                                        <h5 className="ltTitulo"><b> Observações: </b></h5>
                                        <p>{this.state.CriancasSelecionadas[this.state.indice].crianca.children.observations}</p>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className="graph">
                                <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Código do Desconto: "} type={"text"} id={"CodDes"} name={"CodDes"} Class={"form-control"} onChange={this.ChangeValue} />
                                <div className="text-center">
                                    <button className="btn btn-md botao botaoAvançar" onClick={() => this.VerificaDescontoFilhos(this.state.CodDes)}>Verificar Desconto</button>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="text-center">
                            <a className="btn btn-md botao" href="/">Cancelar</a>
                            <button className="btn btn-md botao botaoAvançar" onClick={() => this.VoltarCrianca(this.state.NameCria)}>Voltar</button>
                            <button className="btn btn-md botao botaoAvançar" onClick={this.ProximaCria}>{this.state.namebutton}</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.page === "FinalizarSaida") {
            return (
                <div className="container-fluid" >
                    <div className="sub-heard-part" >
                        <ol className="breadcrumb m-b-0" >
                            <li > < a href="/" > Home </a></li >
                            <li > Saída de Criança </li>
                        </ol>
                    </div>
                    <div className="graph-visual" >
                        <h3 className="inner-tittle">Finalização</h3>
                        <div className="graph" >
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Serviço</th>
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Tempo</th>
                                            <th className="text-center">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.CriancasSelecionadas.map((resp, indice) => {
                                            return (
                                                <tr className="text-center" key={indice._id}>
                                                    <th scope="row">{(indice + 1)}</th>
                                                    <td className="text-center"> {resp.infocrianca.service} </td>
                                                    <td className="text-center"> {resp.infocrianca.name} </td>
                                                    <td className="text-center"> {resp.infocrianca.time} </td>
                                                    <td className="text-center"> {resp.infocrianca.value} </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <br></br>
                                <p>Total: R$ {this.state.TotalValor}</p>
                            </div>
                            <br></br>
                            <div className="tables table-responsive">
                                <table className="table table-hover">
                                    <thead className="text-center">
                                        <tr>
                                            <th>#</th>
                                            <th className="text-center">Desconto</th>
                                            <th className="text-center">Nome</th>
                                            <th className="text-center">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.CriancasSelecionadas.map((resp, indice) => {
                                            if (indice === 0 && resp.hasOwnProperty('adult')) {
                                                return (
                                                    <>
                                                        <tr className="text-center" key={indice + 1}>
                                                            <th scope="row">{(indice + 1)}</th>
                                                            <td className="text-center"> {resp.adult.discount} </td>
                                                            <td className="text-center"> {resp.adult.name} </td>
                                                            <td className="text-center"> {resp.adult.value} </td>
                                                        </tr>
                                                        {resp.hasOwnProperty('codigos') && (<tr className="text-center" key={indice + 2}>
                                                            <th scope="row">{(indice + 1)}</th>
                                                            <td className="text-center"> {resp.codigos.discount} </td>
                                                            <td className="text-center"> {resp.codigos.name} </td>
                                                            <td className="text-center"> {resp.codigos.value} </td>
                                                        </tr>)}
                                                    </>
                                                );
                                            } else if (resp.hasOwnProperty('codigos')) {
                                                return (
                                                    <tr className="text-center" key={indice + 1}>
                                                        <th scope="row">{(indice + 1)}</th>
                                                        <td className="text-center"> {resp.codigos.discount} </td>
                                                        <td className="text-center"> {resp.codigos.name} </td>
                                                        <td className="text-center"> {resp.codigos.value} </td>
                                                    </tr>
                                                );
                                            }

                                        })}
                                    </tbody>
                                </table>
                                <br></br>
                                <p>Total: R$ {this.state.TotalValorDesc}</p>
                            </div>
                            <br></br>
                            <div className="graph">
                                <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Codigo do Desconto: "} type={"text"} id={"CodDes"} name={"CodDes"} Class={"form-control"} onChange={this.ChangeValue} />
                                <div className="text-center">
                                    <button className="btn btn-md botao botaoAvançar" onClick={() => this.VerificaDescontoPAi(this.state.CodDes)}>Verificar Desconto</button>
                                </div>
                            </div>
                            <form>
                                <div className="graph">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12 col-xs-12 text-center">
                                                <div className="graph" style={{ padding: 10 + "px" }}>
                                                    <h5 className="ltTitulo"><b> Valor Final </b></h5>
                                                    <p>R$ {this.state.FinalValor}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-12 col-xs-12">
                                                <label className="LetraFormulario brlabel">Forma de Pagamento:</label>
                                                <br></br>
                                                <label className="radio-inline"><input type="radio" id="Dinheiro" name="FormPag" value="Dinheiro" onClick={this.ChangeValue} /><p className="LetraFormulario">  Dinheiro</p></label>
                                                <label className="radio-inline"><input type="radio" id="Cartao" name="FormPag" value="Cartao" onClick={this.ChangeValue} /><p className="LetraFormulario">  Cartão</p></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                {this.state.comprovante && (<ComprovantSaida
                                    tabela={this.state.dadoscomprovante}
                                    serviso="PASSAPORTE"
                                    teste={this.state.comprovante}
                                />)}

                                <div className="text-center">
                                    <a className="btn btn-md botao" href="/">Cancelar</a>
                                    <input className="btn btn-md botao botaoAvançar" onClick={() => this.VoltarCrianca(this.state.NameCria, false)} value="Voltar" />
                                    <button className="btn btn-md botao botaoAvançar" onClick={this.Finalizar}>Finalizar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default SaidaCrianca;