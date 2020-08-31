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

    var startingDate = moment("2018-01-01"); // salvo la data di partenza in una variabile

    insGiorno(startingDate); //Richiamo una funzione per inserire i giorni nel calendario







});

// FUNZIONI

function insGiorno(data) {

    var mese = data.format("MMMM"); // formatto i parametri che mi servono nella maniera adeguata
    var anno = data.format("YYYY"); //  //

    $("h1.mese").html(mese + " " + anno); // stampo ciò che ho preparato nel posto giusto

    var giorniMese = data.daysInMonth(); // salvo quanti giorni ci sono nel mese selzionato e mi restituisce un numero

    for (var i = 1; i < giorniMese; i++) {          //ciclo i giorni del mese corrente per inserirli nel template
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        var context = {            //modifico questa variabile di handlebars per utilizzare le giuste coppie chiave\valore
            day: addZero(i),        // con la funzione metto lo 0 davanti ai numeri <10
            month: mese
         };
        var html = template(context);
        $(".lista-mesi").append(html);  // stampo tutti gli elementi ciclati ed elaborati
    }
}

function addZero(n){
    if (n < 10) {
        return "0" + n;
    }
    return n;
}
