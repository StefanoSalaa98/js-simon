const cronometro = document.getElementById("countdown");
const listaNumeri = document.getElementById("numbers-list");
const NumeriUtente = document.getElementById("answers-form");
const bottone = document.querySelector(".btn");
const messaggio = document.getElementById("message");

let seconds = 10;
const minimo = 10;
const massimo = 50;
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
const arrayNumbers = arrayUniqueNumbers(minimo,massimo,5);

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
        //converto le stringhe in numeri
        const listaUtenteInt=[];
        for (i=0; i<listaUtente.length; i++){
            listaUtenteInt[i] = parseInt(listaUtente[i].value);
        }
        const controllo = numberValidation(listaUtenteInt);
        if (controllo){
            for (i=0; i<listaUtente.length; i++){
                if (arrayNumbers.includes(listaUtenteInt[i])){
                    numCorretti++;
                    listaCorretti.push(listaUtente[i].value);
                }
            }
            messaggio.textContent = "Hai indovinato " +numCorretti+ " numeri: " +listaCorretti;
            bottone.disabled = true;
            console.log("tutto ok");
        }
    }
)

function numberValidation(lista){
    let validazione = false;
    //controllo che non ci siano valori fuori dai valori consentiti
    let valido = true;
    for (i=0; i<lista.length && valido === true; i++){
        if (lista[i]<minimo || lista[i]>massimo){
            valido = false;
        }
    }
    //controllo che non ci siano numeri uguali
    const listaUtenteUnici = new Set(lista);
    let diversi;
    if (listaUtenteUnici.size === lista.length){
        diversi = true;
    }
    else{
        diversi = false;
    }
    //gestisco i 4 casi possibili
    if (diversi && valido){    
        validazione = true;
        return validazione;
    }
    else if(!diversi && !valido){
        messaggio.textContent = "ATTENZIONE! Hai inserito dei numeri uguali e fuori dai valori limite";
        console.log("niente ok");
    }
    else if(!diversi){
        messaggio.textContent = "ATTENZIONE! Hai inserito dei numeri uguali";
        console.log("numeri uguali");
    }
    else{
        messaggio.textContent = "ATTENZIONE! Hai inserito dei numeri fuori dai valori limite";
        console.log("valori sballati");
    }
    return validazione;
}