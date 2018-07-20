/*

	ARQUIVO COM O CALENDARIO AGENDA DO SISTEMA BRINKIDS


*/


import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';
import '../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import events from './events';
import '../../assets/style/bootstrap.min.css';


/*   */
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));


class Calendar extends React.Component {
 constructor(props) {
	super(props);
	
	this.state = {showModal: false};
	this.mudarModal = this.mudarModal.bind(this);

}

mudarModal(event){
	this.setState({showModal: true});
}


render() {


/*  FUNÇÃO PARA O TRATAMENTO DA DATA DE INICIO E FINAL DO EVENTOE TBM PARA ADICIONAR O TITULO DO EVENTO
		
		OBS:  VAI SER MAIS TRABALHADA, NÃO CONSEGUI APLICAR UM MODAL, POR ENQUANTO ESTA ATUANDO COM PROMPT 

	 */
	const teste =(slotInfo) =>{
		
		const titulo=prompt('digite o titulo');
		/* ARMAZENANDO A DATA DE INICIO E FINAL QUE FOI SELECIONADA  */
		const dataI = slotInfo.start.toLocaleString();
		const dataF = slotInfo.end.toLocaleString();
		/*  SEPARANDO AS DATAS PARA PODER PASSAR OS VALORES ESPECIFICO NA FUNÇÃO  */
		const match = dataI.match(/([\w\*]+)/g);
		const match2 = dataF.match(/([\w\*]+)/g);
		/*    VARIAVEIS DA DATA DE INICIO DO EVENTO     */
		const dia=match[0];
		const mes=match[1]; 
		const ano=match[2];
		const hora= match[3]; 
		const minuto=match[4];
		const segundo=match[5];
		/*VARIAVEIS DA DATA DO FINAL DO EVENTO*/
		const dia2=match2[0];
		const mes2=match2[1];
		const ano2=match2[2];
		const hora2= match2[3]; 
		const minuto2=match2[4];
		const segundo2=match2[5];


		events.push({title:titulo,start:new Date(ano,mes-1, dia, hora, minuto, segundo),end:new Date(ano2,mes2-1, dia2, hora2, minuto2, segundo2),desc:'blabla bla'});
		/*events.push({title:titulo,start:new Date(2018,mes-1, dia, 12, 30, 0),end:new Date(2018,mes-1, dia, 14, 30, 0),desc:'blabla bla'});*/
		this.setState({showModal: true});
		

	}
	
	return (
/*  COMPONENTE CALENDARIO DO REACT */
		<BigCalendar
		selectable
		events={events}
		defaultView={BigCalendar.Views.WEEK}
		scrollToTime={new Date(1970, 1, 1, 6)}
		defaultDate={new Date(2015, 1, 12)}
		onSelectEvent={event => alert(event.title)}
		onSelectSlot={slotInfo => teste(slotInfo)

				/*alert(
					`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
						`\nend: ${slotInfo.end.toLocaleString()}` +
						`\naction: ${slotInfo.action}`
						)*/
					}
					/>



					);
				}
			}



			export default Calendar;