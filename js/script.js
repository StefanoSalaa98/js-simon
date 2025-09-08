const cronometro = document.getElementById("countdown");
const listaNumeri = document.getElementById("numbers-list");
const NumeriUtente = document.getElementById("answers-form");
const bottone = document.querySelector(".btn");
const messaggio = document.getElementById("message");

let seconds = 30;
cronometro.textContent = seconds--;

const intervalId = setInterval(function () {
    // SE sono alla fine 
    if (seconds === 0) {
        // Invito l'utente a inserire i numeri
        cronometro.textContent = "Inserisci i numeri!!!";
        // nascondo la lista dei numeri da ricordare
        listaNumeri.classList.add("d-none");
        // mostro il form dove l'utente può inserire i numeri
        NumeriUtente.classList.remove("d-none");
    } else {
        // ALTRIMENTI
        // decremento il contatore
        // e stampo il valore in pagina (output)
        cronometro.textContent = seconds--;
    }
},1000);


// ottengo un array di numeri casuali
const arrayNumbers = arrayUniqueNumbers(10,50,5);

// inserisco i numeri ottenuti negli elementi HTML
stampaLista(arrayNumbers);

//funzione che stampa gli elementi della lista
function stampaLista(lista){
    for (i=0; i<lista.length; i++){
        listaNumeri.innerHTML += "<li>" +lista[i]+ "<li>";
    }
}

// funzione che genera un array di tot numeri in un range
function arrayUniqueNumbers(numMin, numMax, numberElements) {
    // mi creo un array vuoto di partenza
    const arrayNum =[];

    // ciclo l'array creato FINO CHE è più corto di numberElemnts
    // genero un numero random in un range
    let i=0; 
    while (i<numberElements){
        let nuovoNumero = numRandomGen(numMin, numMax);
        const isPresent = arrayNum.includes(nuovoNumero);
        if(!isPresent){
            arrayNum.push(nuovoNumero);
            i++;
        }
    }
    return arrayNum;
}

// Funzione che genera numeri casuali compresi tra min e max
function numRandomGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione che riceve i numeri dell'utente e controlla se sono corretti
bottone.addEventListener("click",
    function(e){
        e.preventDefault();
        let numCorretti = 0;
        const listaCorretti =[];
        const listaUtente = document.querySelectorAll(".form-control");
        for (i=0; i<listaUtente.length; i++){
            if (arrayNumbers.includes(parseInt(listaUtente[i].value))){
                numCorretti++;
                listaCorretti.push(listaUtente[i].value);
            }
        }
        messaggio.textContent = "Hai indovinato " +numCorretti+ " numeri: " +listaCorretti;
    }
)