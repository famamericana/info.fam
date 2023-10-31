$(document).ready(function () {
    $("#meuFooter").load("/codigos-gerais/footer/footer.html");
});


moment.locale('pt');

//string date to start the list range.
//recommend using Date.now() to filter out past events
var startDate = Date.now();
var items = [];
$.getJSON(
    "https://www.googleapis.com/calendar/v3/calendars/c_1d632bae559723f223004e21450411782b68de51ac45be3c47dfc51cd1c4b3b4%40group.calendar.google.com/events?key=AIzaSyCrPzedxOXMEoXd5dzdF9hDOAkjcb3lsL0&singleEvents=true&orderBy=starttime&maxResults=15&timeMin=" + new Date(startDate).toISOString(),
    function (data) {
        $.each(data["items"], function (key, val) {
            items.push(startDate(val["start"]));
        });
        items = items.slice().sort();
        items = [...new Set(items)];

        //  for (var i = 0; i < items.length - 1; i++) {
        //    if (items[i + 1] == items[i]) {
        //      items.splice(i, 1);
        //    }
        //  }

        var events = {};
        items.forEach(function (item) {
            $.each(data["items"], function (key, val) {
                if (item == startDate(val["start"])) {
                    //console.log(val);
                    if (events[item] === undefined) {
                        events[item] = new Array();
                    }

                    events[item].push({
                        'eventTitle': val["summary"],
                        'eventDescr': val["description"] === undefined ? "<i>No Event Description</i>" : val["description"],
                        'startTime': startTime(val["start"]),
                        'endDate': moment(startDate(val["end"])).format('l'),
                        'endTime': startTime(val["end"]),
                        'eventLocation': val["location"],  // nova linha para obter a localização
                        'htmlLink': val["htmlLink"]
                    });
                    //console.log(events);
                    //console.log(val);
                }

            });
        });
        var markup = "";
        items.forEach(function (eventDate) {
            var monthName = moment(eventDate).format("MMMM").toUpperCase();
            var monthDate = moment(eventDate).format("DD");
            markup += "<ol class='info clearfix'>";
            markup += "<div class='date-box'>";
            markup += "<span class='date-month'>" + monthName + "</span>";
            markup += "<span class='date-day'>" + monthDate + "</span>";
            markup += "</div><div class='events'>";
            events[eventDate].forEach(function (event) {
                console.log(event);
                markup += "<li class='cal'>";
                markup += "<h3 class='calendar-title'>" + event["eventTitle"] + "</h3>";
                markup += "<div class='event-details'>";
                markup += "<div class='event-description-horario'><i class='fa fa-clock-o'></i><span class='start-time'> " + event["startTime"] + "</span> às <span class='end-time'>" + event["endTime"] + "</span><br/><br/></div>";
                markup += "<div class='event-description'>Data: " + event["endDate"] + "<br/></div>";
                if (event["eventLocation"]) {
                    markup += "<div class='event-description-local'>Local: <span class='event-location'><a href='https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(event["eventLocation"]) + "' target='_blank'>" + event["eventLocation"] + "</a></span><br/><br/></div>";
                }
                markup += "<div class='event-description-texto'>" + event["eventDescr"] + "<br/><br/></div>";

                markup += "<div class='event-description-agenda'><a href='" + event["htmlLink"] + "'>Veja esse Evento no Google Agenda</a><br/><br/></div>";
                markup += "</div></li>"
            });
            markup += "</span></ol></div></div>";
        });
        $("#calendar-list").append(markup);
        //console.log(events);

        function startDate(d) {
            if (d["dateTime"] === undefined) return d["date"];
            else {
                var formatted = new Date(d["dateTime"]);
                var day = formatted.getDate();
                var month = formatted.getMonth() + 1;
                var year = formatted.getFullYear();
                return year + "-" + pad(month) + "-" + pad(day);
            }
        }

        function startTime(d) {
            if (d["dateTime"] === undefined) return "O dia todo";
            else {
                var formatted = new Date(d["dateTime"]);
                return moment(d["dateTime"]).format('LT');
            }
        }

        function pad(n) {
            return n < 10 ? "0" + n : n;
        }

        $(".events").click(function (e) {
            $(e.target)
                .next("div")
                .siblings("div")
                .slideUp();
            $(e.target)
                .next("div")
                .slideToggle();
        });
    }
);
