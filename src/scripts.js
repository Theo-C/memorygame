const cards = document.querySelectorAll('.card'); 

let hasFlippedCard = false;
let lockBoard = false; //variable qui verrouille le jeu après une tentative
let firstCard, secondCard;
let time = 60;// timer de 60s
const countdown = document.getElementById('countdown');
let compteurCoup = 0;
const nbCoup = document.getElementById('nbCoup');
let nbCartes = 16;
let compteurCarteRetourne = 0;

function flipCard() //fonction qui retourne une carte
    {
        if(lockBoard) return; // empêche de jouer si le jeu est verrouillé
        if(this === firstCard) return; //empêcher de valider une paire avec 2 fois la même carte
            
        this.classList.toggle('flip');

        if(!hasFlippedCard) //si carte pas retourner
        {
            hasFlippedCard = true;
            firstCard = this;
        }

        else //second clic
        {           
            hasFlippedCard = false;
            secondCard = this;
            updateCompteur();           
            checkForMatch();
        }
    }

    
 function checkForMatch() //fonction qui regarde si ce sont les mêmes cartes?
    {
        
        if (firstCard.dataset.framework === secondCard.dataset.framework) //même carte
        {
            compteurCarteRetourne++;
            isWon();
            disableCards();
        } 
    
        else //pas les mêmes cartes
        {
            unFlipCards();
        }
    }

 function disableCards() // fonction qui désactive les cartes, on ne pourra plus les retourner
    { 
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

function unFlipCards() //fonction qui annule le retournement de la carte / position initiale
    { 
        lockBoard = true;
        setTimeout(()=> {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            
            resetBoard();

        }, 1500); //delai de 1500ms pour avoir le temps de voir la carte érronée avant qu'elle se retourne

    }

    function resetBoard()
        {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];

        }
        
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12); // génère un nombre entre 0 et 12
        card.style.order = randomPos; //position des items flex box
    });
})(); // permet d'exécuter la fonction juste après sa déclaration

cards.forEach(card => card.addEventListener('click', flipCard)); //on attend un potentiel evenement click pour chaque carte qui lancera la fonction flipCard


setInterval(updateCountdown, 1000); // update le countdown toute les secondes

function updateCountdown(){ // fonction qui enlève les secondes
    let seconds = time;
    time--;
    countdown.innerHTML = `${seconds}`;
    if(seconds <=0){
        alert("Temps écoulé");  
        document.location.href="index.html";
    } 
    else{
        return null;
    }
}

function updateCompteur(){
    compteurCoup++;
   let Coup = compteurCoup;
    nbCoup.innerHTML = `${Coup}`;
}

function isWon(){
    if(compteurCarteRetourne == nbCartes/2){
        alert('tu as gagné !')
        document.location.href="index.html";
    }
    else{
        return null;
    }
}

function EndGame(){

}