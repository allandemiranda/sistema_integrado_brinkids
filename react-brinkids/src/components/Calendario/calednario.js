/*

  ARQUIVO COM O CALENDARIO AGENDA DO SISTEMA BRINKIDS


  */


  import React from 'react';
  import BigCalendar from 'react-big-calendar';
  import moment from 'moment';
  import 'moment/locale/pt-br';
  import './styles/react-big-calendar.css';
  import events from './events';
  import '../../assets/style/bootstrap.min.css';
  import DatePicker from 'react-date-picker';
  import Modal from 'react-modal';
  import './styles/DatePicker.css';
  import Select from 'react-select';
  import opcao from './opções.js';
  import { timeFromInt } from 'time-number';
  import TimePicker from 'react-bootstrap-time-picker';





  const customStyles = {
    content : {
      top                   : '30%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-30%, -30%)',
      overflow: 'visible',
      position: 'absolute',

    }
  };
  /*   */

  BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

  Modal.setAppElement(Calendar);
  class Calendar extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        showModal: false,
        modalIsOpen: false,
        CalendarioF:new Date(),
        CalendarioI: new Date(),
        Hora: '0',
        Hora2:'0',
        Titulo:'',


      };

      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.mod = this.mod.bind(this);
      this.mudarTitulo = this.mudarTitulo.bind(this);

    }

    onChange = CalendarioI => this.setState({ CalendarioI });
    onChange2 = CalendarioF => this.setState({CalendarioF});
    mudarHora = Hora => this.setState({Hora});
    mudarHora2 = Hora2 => this.setState({Hora2});
    mudarTitulo(event){

      this.setState({Titulo: event.target.value});
    }

    openModal() {
      this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  mod(){
        const titulo = this.state.Titulo;
        const Final = this.state.CalendarioF;
        const Inicial = this.state.CalendarioI;
        const Anoinicial = Inicial.getFullYear(), MesInicial= Inicial.getMonth(), Diainicial = Inicial.getDate();
        const Anofinal = Final.getFullYear(), Mesfinal= Final.getMonth(), Diaifinal = Final.getDate();

        const HoraI =timeFromInt(this.state.Hora);
        const HoraF =timeFromInt(this.state.Hora2);
        const match = HoraI.match(/([\w\*]+)/g);
        const match2 = HoraF.match(/([\w\*]+)/g);

        events.push({title:titulo,start:new Date(Anoinicial,MesInicial, Diainicial, match[0], match[1], 0),end:new Date(Anofinal,Mesfinal, Diaifinal, match2[0], match2[1], 0),desc:'blabla bla'});
        this.closeModal();
        this.setState({Titulo:''});
  }

  render() {



/*  FUNÇÃO PARA O TRATAMENTO DA DATA DE INICIO E FINAL DO EVENTOE TBM PARA ADICIONAR O TITULO DO EVENTO

    OBS:  VAI SER MAIS TRABALHADA, NÃO CONSEGUI APLICAR UM MODAL, POR ENQUANTO ESTA ATUANDO COM PROMPT

    */

    const teste =(slotInfo) =>{


    }

    return (
      /*  COMPONENTE CALENDARIO DO REACT */

      <div>

      <button className="modal1" type="button" onClick={this.openModal}>adicionar evento</button>

      <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
       <input type="text" placeholder ="digite o titulo" value={this.state.Titulo} onChange={this.mudarTitulo}/><br/>
      <h ref={subtitle => this.subtitle = subtitle}></h><br/>



      <DatePicker
      dateFormat="YYYY/MM/DD"
      onChange={this.onChange}
      value={this.state.CalendarioI}
      />

      <TimePicker start="08:00" end="21:00" value={this.state.Hora} onChange={this.mudarHora} step={30} format={24}/>

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
       <TimePicker start="08:00" end="21:00" step={30} format={24} value={this.state.Hora2} onChange={this.mudarHora2}/>

      <br></br>
      <br></br>

      <input type="button" className='botao1' value="salvar" onClick={this.mod}/>

      </Modal>




      <BigCalendar
      selectable
      events={events}
      defaultView={BigCalendar.Views.WEEK}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date()}
      onSelectEvent={event => alert(event.title)}
      onSelectSlot={slotInfo => {console.log('fd')}
      /*alert(
        `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
        `\nend: ${slotInfo.end.toLocaleString()}` +
        `\naction: ${slotInfo.action}`
        )*/
    }
    />
    </div>


    );
  }
}



export default Calendar;
