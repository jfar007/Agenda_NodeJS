
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, {user: sessionStorage._id},(response) => {
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento._id
        $.post('/events/delete/'+eventId, {_id: eventId}, (response) => {
            alert(response)
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
					user: sessionStorage._id,
                    title: title,
                    start: start,
                    end: end
                }
				console.log(ev);
                $.post(url, ev, (response) => {
                    alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2019-10-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })
        }
		
		actualizarEvento(evento) {
   			
		     let id = evento._id,
				start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss');
			let fend = "";
				if(evento.end != "" && evento.end != null){
					end =  moment(evento.end).format('YYYY-MM-DD HH:mm:ss');
				}
				let tt = evento.title;
			// let	form_data = new FormData();

		  // if (!$('#allDay').is(':checked')) {
				// end = $('#end_date').val()
				// start_hour = $('#start_hour').val()
				// end_hour = $('#end_hour').val()
				// start = start + 'T' + start_hour
				// end = end + 'T' + end_hour
			// }
       var start_date = start.substr(0,10)
        // end_date = end.substr(0,10)
        var start_hour = start.substr(11,8)
        // end_hour = end.substr(11,8)
		
	
        // form_data.append('_id', id)
        // form_data.append('start', start)
        // form_data.append('end', end)
		start =  start_date + 'T' + start_hour;

  
        $.post('/events/update/'+id, {_id: id,title: tt, start: start , end: fend }, (response) => {
            alert(response)
        })
    		
		
        // $.ajax({
          // url: '/events/update/'+id,
          // dataType: "json",
          // cache: false,
          // processData: false,
          // contentType: false,
          // data: form_data,
          // type: 'POST',
          // success: (data) =>{
            // if (data.msg=="OK") {
              // alert('Se ha actualizado el evento exitosamente')
            // }else {
              // alert(data.msg)
            // }
          // },
          // error: function(){
            // alert("error en la comunicación con el servidor");
          // }
        // })
    }
    }

    const Manager = new EventManager()

