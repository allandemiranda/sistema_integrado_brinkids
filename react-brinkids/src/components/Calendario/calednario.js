/*

  ARQUIVO COM O CALENDARIO AGENDA DO SISTEMA BRINKIDS


  */

 import $ from "jquery";
import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

import events from './events';

// import DatePicker from 'react-date-picker';
import Modal from 'react-modal';
import './styles/DatePicker.css';


import { timeFromInt } from 'time-number';
// import TimePicker from 'react-bootstrap-time-picker';
import '../../assets/style/font-awesome.css';
import estilo from './styles/react-big-calendar.css';
import axios from 'axios';
import TypesInput from '../TypesInput.js';
import { getToken } from "../Login/service/auth";
import jwt from 'jsonwebtoken';
import config from '../Login/service/config';


/*   */

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
var excluirInicial, excluirFinal;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "Calendario",
      calendario: true,


      editar: false,
      Titulo: '',
      identifier: "", // (Gabriel): Criei essa variável para ajudar na requisição de alteração de datas
      modalC: false,
      datasRequisicao: [], // (Gabriel): criei essa variável para armazenar os dados que virão do servidor
      DateTimeBegin: '',
      DateImeEnd: '',
      Description: '',
      Location: '',
      Color: '',
      ErroPreenchimento: 0,

    };
    this.interval = this.interval.bind(this);
    this.openModal = this.openModal.bind(this);

    this.editar = this.editar.bind(this);

    this.mod = this.mod.bind(this);
    this.mod2 = this.mod2.bind(this);

    this.ExcluirEvento = this.ExcluirEvento.bind(this);
    this.ChangeValue = this.ChangeValue.bind(this);

    this.cancelar = this.cancelar.bind(this);
    this.requisicao = this.requisicao.bind(this);
  }
  getFuncionario = () => {


    const a = getToken();
    const b = jwt.verify(a, config.secret_auth);

    axios.get(`/employees/${b.id}`)
      .then((response) => {

        this.setState({
          nomeFunc: response.data[0].name.firstName + " " + response.data[0].name.surName,
        })

      })
      .catch((err) => console.log(err));

  }
  requisicao(event) {
    axios.get('/calendar')
      .then((response) => {
        // (Gabriel): response é um objeto com todos os dados da requisição.
        // Vem desde os dados das datas até status HTTP e por aí vai.
        // O que deve ser renderizadonsole.log(r é 'response.data'

        response.data.map((currentValue) => {
          console.log(response.data)
          if (currentValue.color !== undefined) {
            currentValue.start = new Date(currentValue.start);
            currentValue.end = new Date(currentValue.end);
          } else {
            console.log(currentValue.start,currentValue.end)
            let dia = moment(currentValue.birthdayDate);
            let hora = moment(dia).format("YYYY-MM-DD")
           
            let start = moment(hora + " " +  moment(currentValue.start).format("HH:mm")).format("YYYY-MM-DD HH:mm")
            let end = moment(hora + " " +  moment(currentValue.end).format("HH:mm")).format("YYYY-MM-DD HH:mm:ss")
           console.log(start,end)
            currentValue.start = new Date(start);
            currentValue.end = new Date(end);
            
          }
        })

        this.setState({ datasRequisicao: response.data });
      })
      .catch((err) => console.log(err));

  }
  interval(event) {

  }
  cancelar(event) {
    this.setState({
      page: "Calendario",
      Titulo: '',
      ErroPreenchimento:0,

    })
  }
  ChangeValue(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
              this.interval = setInterval(this.requisicao, 10000);
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
    this.Funcionario(16);
  }

  openModal() {
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

              if (map.id === 17) {

                podeentrar = true;

              }

            })

            return podeentrar;

          }).then((eventu) => {
            if (eventu) {
              this.setState({ page: "Novo" });
            } else {

              alert("Acesso Negado. Você não possui permisão para estar nessa área!");

            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

  }


  mod() {
    if (this.state.Titulo.length === 0) {
      $("#Titulo").addClass('errorBorder');
      this.state.ErroPreenchimento+=1;
    }
    else {
      $("#Titulo").removeClass('errorBorder');
      this.state.ErroPreenchimento-=1;
    }

    if (this.state.DateTimeBegin.length === 0) {
      $("#DateTimeBegin").addClass('errorBorder');
      this.state.ErroPreenchimento+=1;
    }
    else {
      $("#DateTimeBegin").removeClass('errorBorder');
      this.state.ErroPreenchimento-=1;
    }

    if (this.state.Location.length === 0) {
      $("#Location").addClass('errorBorder');
      this.state.ErroPreenchimento+=1;
    }
    else {
      $("#Location").removeClass('errorBorder');
      this.state.ErroPreenchimento-=1;
    }

    if (this.state.Description.length === 0) {
      $("#Description").addClass('errorBorder');
      this.state.ErroPreenchimento+=1;
    }
    else {
      $("#Description").removeClass('errorBorder');
      this.state.ErroPreenchimento-=1;
    }

    if (this.state.DateImeEnd.length === 0) {
      $("#DateTimeEnd").addClass('errorBorder');
      this.state.ErroPreenchimento+=1;
    }
    else {
      $("#DateTimeEnd").removeClass('errorBorder');
      this.state.ErroPreenchimento-=1;
    }

    if (this.state.ErroPreenchimento === 0) {
      const titulo = this.state.Titulo;


      const HoraI = new Date(this.state.DateTimeBegin);
      const HoraF = new Date(this.state.DateImeEnd);


      console.log(HoraI);

      // (Gabriel): Requisição para salvar as datas no servidor.
      // Caso queira montar, mantenha essa estrutura do objeto data e altere apenas o título, 'start' e 'end'.
      // Os outros valores vc ainda n precisa mexer, pode deixar esses padrões mesmo.
      const data = {
        title: titulo,
        start: HoraI.toString(), // (Gabriel): Necessário enviar as data no formato de texto
        end: HoraF.toString(),
        color: this.state.Color,
        description: this.state.Description,
        address: this.state.Location,
        associated: "Usuario"
      }

      // Aqui está um exemplo da requisição e da resposta
      axios.post('/calendar', data)
        .then((response) => {
          response.data.start = new Date(response.data.start); // (Gabriel): Necessário modificar as datas para criar um objeto 'Date' já que vem do servidor como string
          response.data.end = new Date(response.data.end);
          this.state.datasRequisicao.push(response.data)
          this.setState({
            datasRequisicao: this.state.datasRequisicao,
            page: "Calendario",
            DateTimeBegin: '',
            DateImeEnd: '',
            Description: '',
            Location: '',
            Color: '',
          })
        })
        .catch((err) => console.log(err))

      // console.log({title:titulo,start:new Date(Anoinicial,MesInicial, Diainicial, match[0], match[1], 0).toString(),end:new Date(Anofinal,Mesfinal, Diaifinal, match2[0], match2[1], 0).toString(),desc:'blabla bla'})

      // events.push({title:titulo,start:new Date(Anoinicial,MesInicial, Diainicial, match[0], match[1], 0),end:new Date(Anofinal,Mesfinal, Diaifinal, match2[0], match2[1], 0),desc:'blabla bla'});
    }else{
      this.state.erros = this.state.ErroPreenchimento;
    }
  }
  editar(event) {
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

              if (map.id === 22) {

                podeentrar = true;

              }

            })

            return podeentrar;

          }).then((eventu) => {
            if (eventu) {
              if (event.color) {
                this.setState({
                  page: "Novo",
                  Titulo: event.title,
                  DateTimeBegin: event.start,
                  DateImeEnd: event.end,
                  Color: event.color,
                  editar: true,
                  identifier: event._id,
                  Description: event.description,
                  Location: event.address,
                })
              } else {
                // alert("Você Não Pode Editar Esse Evento")
              }

            } else {

              alert("Acesso Negado. Você não possui permisão para estar nessa área!");

            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));


  }
  mod2(event) {


    // Não precisa mais desse for mas n irei deletar pra n causar algum problema



    const modifiedDate = { // (Gabriel): Aqui conterá todos os dados que se deseja alterar da data
      title: this.state.Titulo,
      start: new Date(this.state.DateTimeBegin).toString(), // (Gabriel): Necessário enviar as data no formato de texto
      end: new Date(this.state.DateImeEnd).toString(),

    }

    // (Gabriel): Requisição para alterar a data na url '/calendar/<identifier>' utilizando o método HTTP 'PUT'
    axios.put(`calendar/${this.state.identifier}`, modifiedDate)
      .then((response) => {
        this.state.datasRequisicao.forEach((currentValue) => { // (Gabriel): Vai varrer atrás da data com o identificador para alterar seus valores
          if (currentValue._id === this.state.identifier) { // (Gabriel): Se encontrar, altere o título, por exemplo
            currentValue.title = this.state.Titulo;
          }
        })
        this.setState({
          editar: false,
          datasRequisicao: this.state.datasRequisicao,
          page: "Calendario",
          DateTimeBegin: '',
          DateImeEnd: '',
          Description: '',
          Location: '',
          Color: '',

        }) // (Gabriel): Renderize a alteração e só se tudo der certo feche o modal

      })
      .catch((err) => console.log(err)); // (Gabriel): Caso tenha dado errado, exiba uma mensagem de erro
  }

  ExcluirEvento(event) {

    axios.delete(`/calendar/${this.state.identifier}`) // (Gabriel): Requisição para deletar a data na url '/calendar/<identifier>' utilizando o método HTTP 'DELETE'
      .then(response => {
        // (Gabriel): Se tudo der certo para deletar a data no banco de dados, então vamos deletar a data daqui do front
        this.state.datasRequisicao.forEach((currentValue, index, array) => { // (Gabriel): Vai varrer a lista de datas atrás da data que é para deletar
          if (currentValue._id === this.state.identifier) {// (Gabriel): Se encontrar a data que é para ser removida
            console.log(array[index]);
            delete array[index]; // (Gabriel): Então delete via notação 'lista[indice]'
          }
        })
        this.setState({ datasRequisicao: this.state.datasRequisicao });
        this.closeModalC();
      })
      .catch(err => console.log(err));

    // Não precisa mais desse for mas n irei deletar pra n causar algum problema
    for (var data in events) {

      if (events[data].start === excluirInicial && events[data].end === excluirFinal) {
        events.splice(data, 1);
        this.setState({ Titulo: '' });
        this.closeModalC();
      }
    }


  }

  render() {
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    if (this.state.page === "Calendario") {
      return (
        /*  COMPONENTE CALENDARIO DO REACT */

        <div>

          <button className="modal1" type="button" onClick={this.openModal} >Adicionar evento</button>




          {this.state.calendario &&
            (<BigCalendar
            
              localizer={localizer}
              selectable
              events={this.state.datasRequisicao}
              
              defaultView={BigCalendar.Views.WEEK}
              scrollToTime={new Date(1970, 1, 1, 6)}
              defaultDate={new Date()}
              onSelectEvent={event => this.editar(event)}
              onSelectSlot={slotInfo => console.log('sfd')
                /*alert(
                  `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                  `\nend: ${slotInfo.end.toLocaleString()}` +
                  `\naction: ${slotInfo.action}`
                  )*/
              }
              eventPropGetter={event => ({
                style: {
                  backgroundColor: event.color,

                }
              })}
            />)}
        </div>


      );
    }
    if (this.state.page === "Novo") {
      return (
        <div className="container-fluid" >
          {this.state.ErroPreenchimento != 0 &&
            (<div className="alert lert-danger" role="alert" style={{ background: "#ff6347", width: 100 + '%' }}>
              <strong style={{ color: 'white' }}>Preencha os campos abaixo.</strong>
            </div>)
          }
          <div className="sub-heard-part" >
            <ol className="breadcrumb m-b-0" >
              <li > < a href="/" > Home </a></li >
              <li > Evento </li>
            </ol >
          </div>
          <div className="graph-visual" >
            <h3 className="inner-tittle" >Novo Evento</h3>
            <form>
              <div className="graph" >
                <div className="form-group">
                  <div className="row">
                    <TypesInput cod={1} ClassDiv={"col-md-12 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Titulo: "} type={"text"} id={"Titulo"} name={"Titulo"} Class={"form-control"}
                      value={this.state.Titulo} onChange={this.ChangeValue}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario"} NameLabel={"Data Inicial: "} type={"datetime-local"} id={"DateTimeBegin"} name={"DateTimeBegin"} Class={"form-control"}
                      value={this.state.DateTimeBegin} onChange={this.ChangeValue}
                    />
                    <TypesInput cod={1} ClassDiv={"col-md-6 col-sm-12 col-xs-12"} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Data Final: "} type={"datetime-local"} id={"DateTimeEnd"} name={"DateImeEnd"} Class={"form-control"}
                      value={this.state.DateImeEnd} onChange={this.ChangeValue}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <TypesInput cod={2} ClassDiv={"col-md-6 col-sm-12 col-xs-12"} Label={true} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Descrição:"} cols={"50"} rows={"4"} id={"Description"} name={"Description"} Class={"form-control"}
                      value={this.state.Description} onChange={this.ChangeValue} />
                    <div className="col-md-6 col-sm-12 col-xs-12">
                      <TypesInput cod={1} ClassLabel={"LetraFormulario brlabel"} NameLabel={"Local: "} type={"text"} id={"Location"} name={"Location"} Class={"form-control"}
                        value={this.state.Location} onChange={this.ChangeValue}
                      />
                      <label className="LetraFormulario brlabel">Cor</label>
                      <select id="Color" name="Color" className="form-control optionFomulario" value={this.state.Color} onChange={this.ChangeValue}>
                        <option value="">--</option>
                        <option value="#009eac" className="opt1"></option>
                        <option value="#16b4c2 " className="opt2"></option>
                        <option value="#00c6d7" className="opt3"></option>
                        <option value="#00ced1" className="opt4"></option>
                        <option value="#20b2aa" className="opt5"></option>
                        <option value="#3cb7c4" className="opt6"></option>
                        <option value="#19a2af" className="opt7"></option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="text-center">
                <a className="btn btn-md botao" onClick={this.cancelar} >Cancelar</a>
                {!this.state.editar && (<input type="button" className="btn btn-md botao botaoAvançar" value="Salvar" onClick={this.mod} />)}
                {this.state.editar && (<input type="button" className="btn btn-md botao botaoAvançar" value="Salvar" onClick={this.mod2} />)}
              </div>
            </form >
            <div>
              <ul id="mensagens-erro" style={{ color: "red" }}></ul>
            </div>
          </div>
        </div>
      );

    }

  }
}



export default Calendar;
