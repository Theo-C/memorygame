import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  choice:any; //variable globale
  nb_coup;
  temps;
  ranking = []
  rankingFilter = []

  constructor(private route: Router) { }

  ngOnInit() {

    for(let i =0; i < 10 ; i++ ) { //recupère les valeurs des variables player session et les push dans le tableau ranking
      let p = sessionStorage.getItem('player'+i)
      let pJson = JSON.parse(p)
      this.ranking.push(pJson)
    }

 this.rankingFilter =  this.ranking.filter(function (el) { //filtre le tableau pour ne garder que les valeurs non nulles
    return el != null
  })

  this.rankingFilter.sort(function (a,b) { return a.score-b.score}) //trie le tableau par score croissant





 }
difficult() { //choisir un nombre de coup maximum
  this.choice = prompt("Entrez un nombre de coup maximum");
  var containsOnlyDigits = /^[1-9]\d*$/;  //exp reguliere autorisant que les nb contenant des chiffres entre 0 et 9 (chiffre 0 exclu)

    if(containsOnlyDigits.test(this.choice)) {
      sessionStorage.setItem('difficulty', this.choice); //affectation de la variable globale : difficulty = choice (string rentré dans le prompt)
      window.location.reload();
    }

    else {
      alert('Impossible')
    }
}

displayClassement(){ //afficher le classement
  document.getElementById("boxclassement").style.display = "block";
  this.nb_coup = sessionStorage.getItem('nb_coup');
  this.temps = sessionStorage.getItem('temps');
}


reset() { //recharger la page
  if(this.route.url == '/') {
    this.route.navigateByUrl('/game')
  } else {
    window.location.reload()
  }

}



closealertlose(){ //ferme la box classement
  document.getElementById("boxclassement").style.display = "none";
}


clearRanking() { //permet de vider le classement en surement toutes les variables player de session
  for(let i =0; i < 10 ; i++ ) {
    sessionStorage.removeItem('player'+i)
  }
  window.location.reload();
}

}
