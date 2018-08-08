import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

import DatePicker from 'react-date-picker';
import Modal from 'react-modal';
import './styles/DatePicker.css';


import { timeFromInt } from 'time-number';
import TimePicker from 'react-bootstrap-time-picker';
import '../../assets/style/font-awesome.css';
import estilo from './styles/react-big-calendar.css';
import axios from 'axios';
import events from './events';

const estilos = {

  float: 'right',
  display: 'inline-block',
  width: '45% ',
  height: '45px',
  padding: '14px 12px',
  fontSize: '14px',




};
const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-30%, -30%)',
    overflow: 'visible',
    position: 'absolute',

  },
};
const iconelixeira = {
  cursor: 'pointer',


};
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
let excluirInicial,
  excluirFinal;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      modalIsOpen: false,
      CalendarioF: new Date(),
      CalendarioI: new Date(),
      Hora: '0',
      Hora2: '0',
      Titulo: '',
      modalC: false,
      calendario: true,
      datasRequisicao: [], // (Gabriel): criei essa variável para armazenar os dados que virão do servidor

    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);

    this.openModalC = this.openModalC.bind(this);
    this.afterOpenModalC = this.afterOpenModalC.bind(this);
    this.closeModalC = this.closeModalC.bind(this);


    this.mod = this.mod.bind(this);
    this.mod2 = this.mod2.bind(this);

    this.mudarTitulo = this.mudarTitulo.bind(this);
    this.mudarModal = this.mudarModal.bind(this);

    this.ExcluirEvento = this.ExcluirEvento.bind(this);

  }

  componentWillMount() {
    Modal.setAppElement('body');
    axios.get('/calendar')
      .then((response) => {
        // (Gabriel): response é um objeto com todos os dados da requisição.
        // Vem desde os dados das datas até status HTTP e por aí vai.
        // O que deve ser renderizado é 'response.data'
        response.data.map((currentValue) => {
          currentValue.start = new Date(currentValue.start);
          currentValue.end = new Date(currentValue.end);
        });
        console.log(response.data);
        this.setState({ datasRequisicao: response.data });
      })
      .catch(err => console.log(err));
  }

  onChange = CalendarioI => this.setState({ CalendarioI });

  onChange2 = CalendarioF => this.setState({ CalendarioF });

  mudarHora = Hora => this.setState({ Hora });

  mudarHora2 = Hora2 => this.setState({ Hora2 });

  mudarTitulo(event) {

    this.setState({ Titulo: event.target.value });
  }

  openModal() {
    this.setState({ modalIsOpen: true, calendario:false });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false, calendario:true });
    this.setState({ Titulo: '', Hora: '0', Hora2: '0' });
  }

  openModalC() {
    this.setState({ modalC: true, calendario:false });
  }

  afterOpenModalC() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModalC() {
    this.setState({ modalC: false, calendario:true });
    this.setState({ Titulo: '', Hora: '0', Hora2: '0' });
  }

  mod() {
    const titulo = this.state.Titulo;
    const Final = this.state.CalendarioF;
    const Inicial = this.state.CalendarioI;
    const Anoinicial = Inicial.getFullYear(),
      MesInicial = Inicial.getMonth(),
      Diainicial = Inicial.getDate();
    const Anofinal = Final.getFullYear(),
      Mesfinal = Final.getMonth(),
      Diaifinal = Final.getDate();

    const HoraI = timeFromInt(this.state.Hora);
    const HoraF = timeFromInt(this.state.Hora2);
    const match = HoraI.match(/([\w\*]+)/g);
    const match2 = HoraF.match(/([\w\*]+)/g);



    // (Gabriel): Requisição para salvar as datas no servidor.
    // Caso queira montar, mantenha essa estrutura do objeto data e altere apenas o título, 'start' e 'end'.
    // Os outros valores vc ainda n precisa mexer, pode deixar esses padrões mesmo.
    const data = {
      title: titulo,
      start: new Date(Anoinicial, MesInicial, Diainicial, match[0], match[1], 0).toString(),
      end: new Date(Anofinal, Mesfinal, Diaifinal, match2[0], match2[1], 0).toString(),
      type: 'qualque',
      color: 'blue2',
      associated: 'Usuario',
    };

    // Aqui está um exemplo da requisição e da resposta
    axios.post('/calendar', data)
      .then((response) => {
        console.log(response.data);
        response.data.start = new Date(response.data.start);
        response.data.end = new Date(response.data.end);
        this.state.datasRequisicao.push(response.data);
        this.setState({ datasRequisicao: this.state.datasRequisicao });
      })
      .catch(err => console.log(err));

    console.log({ title: titulo, start: new Date(Anoinicial, MesInicial, Diainicial, match[0], match[1], 0).toString(), end: new Date(Anofinal, Mesfinal, Diaifinal, match2[0], match2[1], 0).toString(), desc: 'blabla bla' })

    events.push({ title: titulo, start: new Date(Anoinicial, MesInicial, Diainicial, match[0], match[1], 0), end: new Date(Anofinal, Mesfinal, Diaifinal, match2[0], match2[1], 0), desc: 'blabla bla' });

    this.closeModal();

  }

  mod2() {

    const titulo = this.state.Titulo;
    const Final = this.state.CalendarioF;
    const Inicial = this.state.CalendarioI;
    const Anoinicial = Inicial.getFullYear(),
      MesInicial = Inicial.getMonth(),
      Diainicial = Inicial.getDate();
    const Anofinal = Final.getFullYear(),
      Mesfinal = Final.getMonth(),
      Diaifinal = Final.getDate();
    for (let data in events) {

      if (events[data].start === excluirInicial && events[data].end === excluirFinal) {
        events.splice(data, 1);


      }
    }
    const HoraI = this.state.Hora;
    const HoraF = this.state.Hora2;

    const match = HoraI.match(/([\w\*]+)/g);
    const match2 = HoraF.match(/([\w\*]+)/g);

    events.push({
      title: titulo, start: new Date(Anoinicial, MesInicial, Diainicial, match[0], match[1], 0), end: new Date(Anofinal, Mesfinal, Diaifinal, match2[0], match2[1], 0), desc: 'blabla bla'
    });


    this.closeModalC();


  }

  mudarModal(event) {
    excluirInicial = event.start;
    excluirFinal = event.end;
    const inicial = `${event.start.getHours()}:${event.start.getMinutes()}`;
    const final = `${event.end.getHours()}:${event.end.getMinutes()}`;

    this.setState({ Titulo: event.title });
    this.setState({ Hora2: final });
    this.setState({ Hora: inicial });
    this.openModalC();

  }


  ExcluirEvento(event) {

    for (let data in events) {

      if (events[data].start === excluirInicial && events[data].end === excluirFinal) {
        events.splice(data, 1);
        this.setState({ Titulo: '' });
        this.closeModalC();
      }
    }


  }

  render() {


    const teste = (slotInfo) => {


    };


    return (
      /*  COMPONENTE CALENDARIO DO REACT */
      <div>
        <div>

          <button className="modal1" type="button" onClick={this.openModal}>
            adicionar evento
              </button>

          <Modal
            isOpen={this.state.modalC}
            onAfterOpen={this.afterOpenModalC}
            onRequestClose={this.closeModalC}
            style={customStyles}
            contentLabel="Example Modal2"
          >
            <h ref={subtitle => this.subtitle = subtitle} />
            <div className="glyphicon" style={iconelixeira} onClick={this.ExcluirEvento}>
              &#xe020;
              </div>
            <div className="fa" style={{ cursor: 'pointer', float: 'right' }} onClick={this.closeModalC}>
              &#xf00d;
            </div>
            <br />
            <br />


            <div>
              Titulo:
  
            <input type="text" className="titulo2" placeholder="digite o titulo" value={this.state.Titulo} onChange={this.mudarTitulo} />
              <br />
            </div>

            <br />
            <div>

              De:
  
            <span>{this.state.Hora} ate {this.state.Hora2}</span>
            </div>
            <br />
            <input type="button" className="botao1" value="salvar" onClick={this.mod2} />
          </Modal>


          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

            <input type="text" className="titulo" placeholder="digite o titulo" value={this.state.Titulo} onChange={this.mudarTitulo} />
            <br />
            <h ref={subtitle => this.subtitle = subtitle} />
            <br />








            <DatePicker
              dateFormat="YYYY/MM/DD"
              onChange={this.onChange}
              value={this.state.CalendarioI}
            />

            <TimePicker style={estilos} start="00:00" end="23:30" value={this.state.Hora} onChange={this.mudarHora} step={30} format={24} />


            <DatePicker
              selected={this.state.startDate}
              onChange={this.onChange2}
              value={this.state.CalendarioF}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="LT"
              timeCaption="Time"
            />




            <TimePicker style={estilos} start="00:00" end="23:30" step={30} format={24} value={this.state.Hora2} onChange={this.mudarHora2} />


            <br />
            <br />

            <input type="button" className="botao1" value="salvar" onClick={this.mod} />

          </Modal>
        </div>


        {this.state.calendario && (
        <BigCalendar
          selectable
          events={events}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => this.mudarModal(event)}
          onSelectSlot={slotInfo => console.log('sfd')
            /*alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
              `\nend: ${slotInfo.end.toLocaleString()}` +
              `\naction: ${slotInfo.action}`
              ) */
          }
          eventPropGetter={event => ({
            style: {
              backgroundColor: event.start.getDay() < 5
                ? '#ad4ca4'
                : '#3174ad',
            },
          })}
        />
        )}
      </div>


    );
  }
}


export default Calendar;
