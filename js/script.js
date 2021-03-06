// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà
// a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui
//  l’API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API
// non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella list

// https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

// "response": [
//         {
//             "name": "Capodanno",
//             "date": "2018-01-01"
//         },

$(document).ready(function(){

    var startingDate = moment($(".mese").attr("data-this-date")); // salvo la data di partenza in una variabile
    insGiorno(startingDate); //Richiamo una funzione per inserire i giorni nel calendario
    insVacanza(startingDate); //Richiamo una funzione per modificare i giorni di vacanza nel calendario

    // Scorrere il calendario

    $(".next").click(function () {
        if (startingDate.format("MM") != "12") {
            next(startingDate)
        } else {
            alert("ERROR");
        }
    })

    $(".prev").click(function () {
        if (startingDate.format("MM") != "01") {
            prev(startingDate)
        } else {
            alert("ERROR");
        }

    })








});

// FUNZIONI

function insGiorno(data) {

    var mese = data.format("MMMM"); // formatto i parametri che mi servono nella maniera adeguata
    var anno = data.format("YYYY"); //  //

    $("h1.mese").html(mese + " " + anno); // stampo ciò che ho preparato nel posto giusto

    var giorniMese = data.daysInMonth(); // salvo quanti giorni ci sono nel mese selzionato e mi restituisce un numero

    for (var i = 1; i <= giorniMese; i++) {          //ciclo i giorni del mese corrente per inserirli nel template
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var context = {            //modifico questa variabile di handlebars per utilizzare le giuste coppie chiave\valore
            day: addZero(i),        // con la funzione metto lo 0 davanti ai numeri <10
            month: mese,
            dataCompleta: anno + "-" + data.format("MM") + "-" + addZero(i) // mi servirà per aggiungere le festività
         };
        var html = template(context);
        $(".lista-giorni").append(html);  // stampo tutti gli elementi ciclati ed elaborati
    }
}

function insVacanza(data) {
    $.ajax(
        {
            url:"https:flynn.boolean.careers/exercises/api/holidays", // non copio le coppie chiavi\valore del link mi servono sotto
            method: "GET",
            data:{ // qui riporto le coppie chiavi valore
                year: data.year(), //anno corrente
                month: data.month() // mese corrente
            },
            success: function (risposta) {
                for (var i = 0; i < risposta.response.length; i++) {
                    var liVacanza = $('li[data-complete-date="'+ risposta.response[i].date + '"]');
                    liVacanza.append(" - " + risposta.response[i].name);
                    liVacanza.addClass("red");
                }

            }
        }
    )
}

function next(data) {
    data.add( 1, 'M');
    $(".lista-giorni").empty();
    insGiorno(data);
    insVacanza(data);
}

function prev(data) {
    data.subtract( 1, 'M');
    $(".lista-giorni").empty();
    insGiorno(data);
    insVacanza(data);
}

function addZero(n){
    if (n < 10) {
        return "0" + n;
    }
    return n;
}
