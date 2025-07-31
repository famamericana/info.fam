$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer-invertido/footer.html");
});

moment.locale('pt');

var startDate = Date.now();
var items = [];

$.getJSON(
    "https://www.googleapis.com/calendar/v3/calendars/c_1d632bae559723f223004e21450411782b68de51ac45be3c47dfc51cd1c4b3b4%40group.calendar.google.com/events?key=AIzaSyCrPzedxOXMEoXd5dzdF9hDOAkjcb3lsL0&singleEvents=true&orderBy=starttime&maxResults=30&timeMin=" + new Date(startDate).toISOString(),
    function (data) {
        if (!data["items"] || data["items"].length === 0) {
            // Se não houver eventos, mostra a mensagem de erro
            $("#calendar-list").append("<div class='mensagemdeerro'>Caso apareça essa mensagem, por favor nos notifique que o Calendário Acadêmico não está aparecendo. Agradecemos a colaboração! E-mail: <a href='mailto:nicom@fam.br'> nicom@fam.br</a></div>");
            return;
        }
        processEvents(data["items"]);
    }
);


function getEventDates(event) {
    let dates = [];
    let start = moment(event.start.dateTime || event.start.date);
    let end = moment(event.end.dateTime || event.end.date);
    const isAllDay = !event.start.dateTime;

    if (isAllDay) {
        end.subtract(1, 'day');
    }
    
    // Se é o mesmo dia após ajustes
    if (start.isSame(end, 'day')) {
        dates.push(start.format('YYYY-MM-DD'));
    } else {
        // Calculamos o número total de dias
        let totalDays = end.diff(start, 'days');
        
        // Se são exatamente dois dias, incluímos ambos
        if (totalDays === 1) {
            dates.push(start.format('YYYY-MM-DD'));
            dates.push(end.format('YYYY-MM-DD'));
        } else {
            // Se são mais de dois dias, incluímos apenas o primeiro e o último
            dates.push(start.format('YYYY-MM-DD'));
            dates.push(end.format('YYYY-MM-DD'));
        }
    }
    
    return dates;
}

function processEvents(eventItems) {
    var events = {};
    
    eventItems.forEach(function(val) {
        let start = moment(val.start.dateTime || val.start.date);
        let end = moment(val.end.dateTime || val.end.date);
        const isAllDay = !val.start.dateTime;
        
        if (isAllDay) {
            end.subtract(1, 'day');
        }
        
        let totalDays = end.diff(start, 'days');
        let eventDates = getEventDates(val);
        
        eventDates.forEach(date => {
            if (events[date] === undefined) {
                events[date] = [];
            }

            events[date].push({
                'eventTitle': val["summary"],
                'eventDescr': val["description"] || "<i>Sem descrição do evento</i>",
                'startDate': formatEventDate(val["start"]),
                'endDate': formatEventDate({"date": end.format('YYYY-MM-DD')}),
                'startTime': formatEventTime(val["start"]),
                'endTime': formatEventTime(val["end"]),
                'eventLocation': val["location"],
                'htmlLink': val["htmlLink"],
                'isMultiDay': totalDays > 0,
                'recurrence': val["recurrence"] ? true : false,
                'isFirstDay': date === eventDates[0],
                'isLastDay': date === eventDates[eventDates.length - 1],
                'isTwoDayEvent': totalDays === 1
            });
        });
    });

    var sortedDates = Object.keys(events).sort();
    renderEvents(sortedDates, events);
}

function renderEvents(sortedDates, events) {
    var markup = "";
    
    sortedDates.forEach(function(eventDate) {
        var monthName = moment(eventDate).format("MMMM").toUpperCase();
        var monthDate = moment(eventDate).format("DD");
        
        markup += "<ol class='info clearfix'>";
        markup += "<div class='date-box'>";
        markup += "<span class='date-month'>" + monthName + "</span>";
        markup += "<span class='date-day'>";
        if (events[eventDate].some(event => event.isMultiDay)) {
            markup += "<i class='fa-solid fa-plus plusk'></i> ";
        }
        markup += monthDate + "</span>";
        markup += "</div><div class='events'>";
        
        events[eventDate].forEach(function(event) {
            if (event.isMultiDay && !event.isTwoDayEvent && !event.isFirstDay && !event.isLastDay) {
                return; // Pula a renderização de dias intermediários para eventos com mais de 2 dias
            }
            
            markup += "<li class='cal'>";
            markup += "<h3 class='calendar-title'>" + event["eventTitle"];
            
            if (event.isMultiDay) {
                markup += " <span class='badge multiple-days'>Múltiplos dias</span>";
            }
            if (event.recurrence) {
                markup += " <span class='badge recurring'>Recorrente</span>";
            }
            
            markup += "</h3>";
            // Resto do código de renderização permanece o mesmo...
            markup += "<div class='event-details'>";
            
            markup += "<div class='event-period'>";
            if (event.isMultiDay) {
                markup += "<i class='fa-regular fa-calendar-days'></i> ";
                markup += "De <span class='start-time-highlight'>" + event["startDate"] + "</span>";

                if (event.isFirstDay && event["startTime"] !== "O dia todo") {
                    markup += " às <span class='start-time-highlight'>" + event["startTime"] + "</span>";
                }
                markup += " até <span class='end-time-highlight'>" + event["endDate"] + "</span>";
                if (event.isLastDay && event["endTime"] !== "O dia todo") {
                    markup += " às <span class='end-time-highlight'>" + event["endTime"] + "</span>";
                }
            } else {
                markup += "<div class='event-description-horario'>";
                markup += "<i class='fa-regular fa-clock'></i> ";
                markup += "<span class='start-time'>" + event["startTime"] + "</span>";
                if (event["startTime"] !== "O dia todo") {
                    markup += " às <span class='end-time'>" + event["endTime"] + "</span>";
                }
                markup += "</div>";
            }
            markup += "</div><br/>";
            
            if (event["eventLocation"]) {
                markup += "<div class='event-description-local'>";
                markup += "Local: <span class='event-location'>";
                markup += "<a href='https://www.google.com/maps/search/?api=1&query=" + 
                         encodeURIComponent(event["eventLocation"]) + 
                         "' target='_blank'>" + event["eventLocation"] + "</a>";
                markup += "</span></div><br/>";
            }
            
            markup += "<div class='event-description-texto'>" + event["eventDescr"] + "</div><br/>";
            
            markup += "<div class='event-description-agenda'>";
            markup += "<a href='" + event["htmlLink"] + "' target='_blank'>";
            markup += "<i class='fa-brands fa-google'></i> Ver no Google Agenda</a>";
            markup += "</div>";
            
            markup += "</div></li>";
        });
        markup += "</ol></div>";
    });
    
    $("#calendar-list").append(markup);
    
    $(".calendar-title").click(function(e) {
        $(this).next(".event-details").slideToggle();
        $(this).parent().siblings().find(".event-details").slideUp();
    });
}

function formatEventDate(d) {
    if (!d) return '';
    return moment(d.dateTime || d.date).format('L');
}

function formatEventTime(d) {
    if (!d) return '';
    if (d.date) return "O dia todo";
    return moment(d.dateTime).format('LT');
}

 
//https forçar -------------------------------------------------------------------------------------------------------------------------------
if (!location.href.startsWith("http://127.0") && location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}


// Carregando o navbar e configurando o dropdown
$(document).ready(function () {
    $("#Navbar").load("/codigos-gerais/navbar-invertido/navbar.html", function () {
        // Chama a função setupDropdown após o conteúdo ser carregado
        setupDropdown();
    });
});