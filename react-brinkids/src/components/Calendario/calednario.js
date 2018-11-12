/*

  ARQUIVO COM O CALENDARIO AGENDA DO SISTEMA BRINKIDS


  */


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

    };

    this.openModal = this.openModal.bind(this);

    this.editar = this.editar.bind(this);

    this.mod = this.mod.bind(this);
    this.mod2 = this.mod2.bind(this);

    this.ExcluirEvento = this.ExcluirEvento.bind(this);
    this.ChangeValue = this.ChangeValue.bind(this);

    this.cancelar = this.cancelar.bind(this);

  }
  cancelar(event){
    this.setState({
      page:"Calendario",
      Titulo: '',

    })
  }
  ChangeValue(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  componentWillMount() {
    
    axios.get('/calendar')
      .then((response) => {
        // (Gabriel): response é um objeto com todos os dados da requisição.
        // Vem desde os dados das datas até status HTTP e por aí vai.
        // O que deve ser renderizado é 'response.data'
        response.data.map((currentValue) => {
          currentValue.start = new Date(currentValue.start);
          currentValue.end = new Date(currentValue.end);
        })
        console.log(response.data);
        this.setState({ datasRequisicao: response.data });
      })
      .catch((err) => console.log(err));
  }



  openModal() {
    this.setState({ page: "Novo" });
  }


  mod() {
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



  }
  editar(event) {
    this.setState({
      page: "Novo",
      Titulo: event.title,
      DateTimeBegin: event.start,
      DateImeEnd: event.end,
      Color: event.color,
      editar: true,
      identifier: event._id,
      Description:event.description,
      Location:event.address,
    })

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
          editar:false,
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





    if (this.state.page === "Calendario") {
      return (
        /*  COMPONENTE CALENDARIO DO REACT */

        <div>

          <button className="modal1" type="button" onClick={this.openModal} >adicionar evento</button>




          {this.state.calendario &&
            (<BigCalendar
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
                        <option value="blue" className="opt1">Azul</option>
                        <option value="violet" className="opt2">Violeta</option>
                        <option value="green" className="opt3">Verde</option>
                        <option value="orange" className="opt4">Laranja</option>
                        <option value="yellow" className="opt5">Amarelo</option>
                        <option value="red" className="opt6">Vermelho</option>
                        <option value="aqua" className="opt7">Azul claro</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="text-center">
                <a className="btn btn-md botao"  onClick={this.cancelar} >Cancelar</a>
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
