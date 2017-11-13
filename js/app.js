window.onload = function () {
    var button = document.getElementById("button");
    button.addEventListener('click', chooseZone);
    /*var seat = document.getElementsByClassName('seats');
    var containerTickets = document.getElementById('tickets');*/
}
var airlineSeats = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

/* Contador que nos ayudara a rastrear el numero de asientos ocupados */
var busySeats = 0;
var paintSeats = function(array) {
    var containerSeats = document.getElementById('seats');

    for(i = 0; i< array.length; i++) {
        var seat = document.createElement('div');
        seat.className = 'seats';
        
        /* Del primer elelemento al cuarto, en nuestro arreglo va a ser primera clase, que seria del
        indice 0 al 3. */
        if(i < 4) {
            seat.style.background = '#B4FCE4';
        }
        else {
            seat.style.background = '#FFD4A5';
        }
        containerSeats.appendChild(seat);
    }
} 

function chooseZone() {
    var choice = prompt('En que zona prefieres reservar \n 1. Primera clase \n 2. Economica \n \n');
    if (choice == 1) {
        checkFirstClassZone();
    } 
    else if (choice == 2) {
        checkEconomicZone();
    }
    else {
        alert('Por favor ingresa un numero valido');
    }
};

function checkFirstClassZone() {
    var zone = 'Primera Clase';
    /* Recorre del elemento 0 al elemento 3 y verifica cuales estan disponibles */
    for(a = 0; a < 4; a++) {
        if(airlineSeats[a] == false) {
            airlineSeats[a] = true;
            reserveSeat(a);
            paintTicket(a);
            busySeats++;
            /* Al reservar un asiento no nesecitamos seguir recorriendo, por eso 
            paramos el for con break */
            break;
        }
        else if(a === 3 && airlineSeats[a] === true) {
            reasignEconomicZone(zone);

        }
    }
};

function checkEconomicZone() {
    var zone = 'Economica';
    /* Recorre del elemento 4 al elemento 9 y verifica cuales estan disponibles */
    for (b = 4; b < 10; b++) {
        if(airlineSeats[b] == false) {
            airlineSeats[b] = true;
            reserveSeat(b);
            paintTicket(b);
            busySeats++;
            /* Al reservar un asiento no nesecitamos seguir recorriendo, por eso 
            paramos el for con break */
            break;
        }
        else if(b === 9 && airlineSeats[b] === true);{
            reasignFirstClassZone(zone);
        }
    }
};

function reserveSeat(indexToPaint) {
    var seat = document.getElementsByClassName('seats');
    seat[indexToPaint].style.background = '#E99231';
}


function reasignEconomicZone(zone) {
    if (busySeats == 10) {
        noSeats();
        nextFlight();
    }
    else {
       var reasing = confirm('Ya no me quedan asientos disponibles en zona ' + zone + 
           ' :( \n ¿Quisiera reservar en zona Economica?');
 
       if(reasing == true) {
           checkEconomicZone();
       }
       else {
           nextFlight();
       }
    }
}

function reasignFirstClassZone(zone) {
    if (busySeats == 10) {
        noSeats();
        nextFlight();
    }
    else {
        var reasing = confirm('Ya no me quedan asientos disponibles en ' + zone + 
            ' :( \n ¿Quisier reservar en Primera Clase?');
 
        if(reasing == true) {
            checkFirstClassZone();
        }
        else {
            nextFlight();
        }
    }
}

function paintTicket() {
    var containerTickets = document.getElementById('tickets');
    var ticket =document.createElement('div');
    ticket.className = 'seats';
    var title = document.createElement('p');
    var reservedSeating = document.createElement('p');
    var zoneClass = document.createElement('p');
    title.textContent = 'PASE DE ABORDAR';
    reservedSeating.textContent = 'N° de asientos: ' + (index + 1);
    zoneClass.textContent = zone;
    ticket.appendChild(title);
    ticket.appendChild(reservedSeating);
    ticket.appendChild(zoneClass);
    containerTickets.appendChild(tickets);
}

function nextFlight() {
    alert('Nuestro proximo vuelo sale en tres horas');
}

function noSeats() {
    alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este avion.')
}

paintSeats(airlineSeats);

