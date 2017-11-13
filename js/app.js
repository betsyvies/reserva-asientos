window.onload = function () {
    var button = document.getElementById("button");
    button.addEventListener('click', chooseZone);
    var button = document.getElementById("button");
    button.addEventListener('keypress', reset);
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

    for(a = 0; a< array.length; a++) {
        var seat = document.createElement('div');
        seat.className = 'seats';
        
        /* Del primer elelemento al cuarto, en nuestro arreglo va a ser primera clase, que seria del
        indice 0 al 3. */
        if(a < 4) {
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
    for(i = 0; i < 4; i++) {
        if(airlineSeats[i] === false) {
            airlineSeats[i] = true;
            reserveSeat(i);
            paintTicket(i, zone);
            busySeats++;
            /* Al reservar un asiento no nesecitamos seguir recorriendo, por eso 
            paramos el for con break */
            break;
        }
        else if(i == 3 && airlineSeats[i] === true) {
            reasignEconomicZone(zone);

        }
    }
};

function checkEconomicZone() {
    var zone = 'Economica';
    /* Recorre del elemento 4 al elemento 9 y verifica cuales estan disponibles */
    for (i = 4; i < 10; i++) {
        if(airlineSeats[i] === false) {
            airlineSeats[i] = true;
            reserveSeat(i);
            paintTicket(i, zone);
            busySeats++;
            /* Al reservar un asiento no nesecitamos seguir recorriendo, por eso 
            paramos el for con break */
            break;
        }
        else if(i === 9 && airlineSeats[i] === true) { 
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

function paintTicket(i, zone) {
    var containerTickets = document.getElementById('tickets');
    var ticket =document.createElement('div');
    ticket.className = 'tickets';
    var title = document.createElement('p');
    var reservedSeating = document.createElement('p');
    var zoneClass = document.createElement('p');
    title.textContent = 'PASE ABORDAR';
    reservedSeating.textContent = 'N° de asientos: ' + (i + 1);
    zoneClass.textContent = zone;
    ticket.appendChild(title);
    ticket.appendChild(reservedSeating);
    ticket.appendChild(zoneClass);
    containerTickets.appendChild(ticket);
}

function nextFlight() {
    alert('Nuestro proximo vuelo sale en tres horas');
}

function noSeats() {
    alert('Lo sentimos :( \n Ya no quedan asientos disponibles en este avion.')
}
function reset() {
    title.textContent = '';
    reservedSeating.textContent = '';
    zoneClass.textContent = '';
}
paintSeats(airlineSeats);


