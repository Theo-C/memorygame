import {Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Player } from './player.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class GameComponent implements OnInit {
    nb_coup;
    notShuffle: boolean = true;

    public Player : Player; //creation d'un objet player

 
    
  constructor() { }
  
ngOnInit(): void {

    const cards = document.querySelectorAll('.card') ;
    const closes = document.querySelectorAll('.close');  
    const replays = document.querySelectorAll('.replay');


    
    // let p1 = sessionStorage.getItem('player1');
    // console.log(JSON.parse(p1))

    let hasFlippedCard = false;
    let lockBoard = false; //variable qui verrouille le jeu après une tentative
    let firstCard, secondCard;
    let time = 60;// timer de 60s
    const countdown = document.getElementById('countdown');
    let compteurCoup = 0;
    const nbCoup = document.getElementById('nbCoup');
    let nbCartes = 16;
    let compteurCarteRetourne = 0;
    let victory = false;
    let defaite = false;
    let diff = sessionStorage.getItem('difficulty'); //on stocke la valeur rentré dans le choix de difficulté dans la variable diff

 



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
                disableCards();
                isWon();
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

        function resetBoard() //empeche de retourner plus de 2 cartes en même temps (empeche la triche)
            {
                [hasFlippedCard, lockBoard] = [false, false];
                [firstCard, secondCard] = [null, null];

            }


    let interval = setInterval(updateCountdown, 1000); // update le countdown toute les secondes

    function updateCountdown(){ // fonction qui enlève les secondes
        let seconds = time;
    
        if(seconds >= 0 && victory == false && defaite == false) {
            time--;
            countdown.innerHTML = `${seconds}`;
        }
        if(seconds == 0){
            document.getElementById("boxlose").style.display = "block";
            lockBoard = true;
        }

        if(compteurCoup == Number(diff) && defaite == false) { //si le nb de coup est égale au nb de coup max choisi --> defaite
            document.getElementById("boxlose").style.display = "block";
            defaite = true;
            lockBoard = true;
        } 
    }


    function updateCompteur(){
        compteurCoup++;
        let Coup = compteurCoup;
        nbCoup.innerHTML = `${Coup}`;
    }

    function closealert(){ //ferme toutes les box
        document.getElementById("boxwin").style.display = "none";
        document.getElementById("boxlose").style.display = "none";
        document.getElementById("boxclassement").style.display = "none";
    }

    function replayalert(){ //ferme toutes les box et recharge la page
        document.getElementById("boxwin").style.display = "none";
        document.getElementById("boxlose").style.display = "none";
        document.getElementById("boxclassement").style.display = "none";
        document.location.reload();
    }

    function isWon(){ //si toutes les cartes sont retournés --> afficher win + modifie le classement
    

        if(compteurCarteRetourne == nbCartes/2){
            victory = true;
            displayWin();
            modifyClassement();

        }
        
    }

    function modifyClassement(){

        let playerObject = {
            score : '',
            time : '',
            nb_coup : '',
        }

        //affection des attributs de l'objet player
        playerObject.time = (60-time).toString();
        playerObject.nb_coup = compteurCoup.toString();
        playerObject.score = ((60-time) * compteurCoup).toString(); //calcul du score grâce au temps et au nb de coup --> + le but étant d'avoir le score le plus faible
        
        for(let i=0;i<10;i++) {
            if(sessionStorage.getItem('player'+i)) {
                continue;
            }
            else {
                sessionStorage.setItem('player'+i , JSON.stringify(playerObject))
                break;
            }
        }
        
    }

    function displayWin(){ //affiche la box win
        document.getElementById("boxwin").style.display = "block";
    }


    replays.forEach(replay => replay.addEventListener('click', replayalert)); //on attend un potentiel evenement click pour chaque carte qui lancera la fonction replayalert
    closes.forEach(close => close.addEventListener('click', closealert)); //on attend un potentiel evenement click pour chaque carte qui lancera la fonction closealert
    cards.forEach(card => card.addEventListener('click', flipCard)); //on attend un potentiel evenement click pour chaque carte qui lancera la fonction flipCard




}



    randomPosition() { //permet de modifier le style order de manière aléatoire des cards lors du rechargement de la page
        return Math.floor(Math.random() * 16);
    }

    randomPositionShuffle() {  //permet de modifier le style order de manière aléatoire quand on appuie sur le bouton Shuffle
        for(let i=0;i<16;i++) {
        this.randomPosition()
        }
    } 

}
