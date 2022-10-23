let joueur1Wins = document.querySelector(".receive1");
let joueur2Wins = document.querySelector(".receive2");
let gameNumber = document.getElementById("numParties");    // NUMERO DE LA PARTIE ACTUELLE
let playerTurn = document.getElementById("playerTurn");    // AU TOUR DU JOUEUR
let hitNumber = document.getElementById("numCoups");   // NOMBRE DE COUPS RESTANT
let vsTwo = document.getElementById("vsTwo");            // 2 PLAYERS MODE
let vsCpu = document.getElementById("vsCpu");            // J1 VS CPU MODE
let vsCpuHell = document.getElementById("vsCpuHell")
let restartGame = document.getElementById("restartGame");  // BOUTON RECHARGER LA PAGE
let gameSet = document.getElementById("gameSet");          // CHOIX DU NOMBRE DE PARTIES
let player1Hp = document.querySelector(".bubble1hp")
let player2Hp = document.querySelector(".bubble2hp")
let morpionContainer = document.querySelector(".morpion-container");
let refresh = document.getElementById("refresh");
let moveYourBody = document.getElementById("bodydy")
let blackMorpion = document.querySelector(".blackMorpionScreen");


let musiqueGuile = document.getElementById("musicalSFGuile")
let musiqueKen = document.getElementById("musicalSFKen");
let musiqueRyu = document.getElementById("musicalSFRyu");
let musiqueBalrog = document.getElementById("musicalSFBalrog")
let komusic = document.getElementById("musicalSFKO");
let winmusic = document.getElementById("musicalSFYouWin");
let losemusic = document.getElementById("musicalSFYouLose");
let openingMusic = document.getElementById("musicalSFOpening"); 
let disableAudio = document.getElementById("buttonDisableAudio");
let punch = document.getElementById("musicalSFPunch");
let kick = document.getElementById("musicalSFKick")
let petiteWin = document.getElementById("musicalSFPetiteWin");

let customStageKoAnimation = 0;

let SfxOn = 1;

disableAudio.addEventListener("click", (audioHandler));

function audioHandler () {
    if (SfxOn == 0) {
    petiteWin.muted = false;
    komusic.muted = false;
    winmusic.muted = false;
    losemusic.muted = false;
    openingMusic.muted = false;
    disableAudio.muted = false;
    punch.muted = false;
    kick.muted = false;
    musiqueGuile.muted = false;
    musiqueKen.muted = false;
    musiqueRyu.muted = false;
    musiqueBalrog.muted = false;
    disableAudio.style.background = "url(Img/sonactif.jpg) no-repeat center"
    disableAudio.style.backgroundSize = "cover"
    
    SfxOn = 1;}
    
    else {
    petiteWin.muted = true;
    komusic.muted = true;
    winmusic.muted = true;
    losemusic.muted = true;
    openingMusic.muted = true;
    disableAudio.muted = true;
    punch.muted = true;
    kick.muted = true;
    musiqueGuile.muted = true;
    musiqueKen.muted = true;
    musiqueRyu.muted = true;
    musiqueBalrog.muted = true;    
    disableAudio.style.background = "url(Img/mute.jpg) no-repeat center"
    disableAudio.style.backgroundSize = "cover"
    
    SfxOn = 0;
    }
}



let seeIfBotPlayin = 0;
isJeuActif = 1;

// p1 p2 scores si 3 ou 30
let nombreDeCoups = 9;     /* Coups joués qui sera décrémmenté*/
let partiesjouées = 0;

let partiesjouéesAsString = localStorage.getItem("partiejoue");   // on récupére les parties jouées en string, qu'on reconverti

    partiesjouées = parseInt(partiesjouéesAsString);                   // pour les ajouter au js
    
if (partiesjouéesAsString == null) {
        partiesjouées = 0;
    } else {
        partiesjouéesAsString = partiesjouées;
    gameNumber.innerHTML = "Parties jouées : " + "" + partiesjouées;                             // puis on affiche le compteur
}
let hpj1 = 100;
let hpj2 = 100;

let boxPlayground = [0,0,0,0,0,0,0,0,0];             // array win

let currentGameSetValue = 1;                  // nombre de parties à gagner



joueur1base = 0;                             //compteur victoire joueur 1
joueur2base = 0;                             //compteur victoire joueur 2     
let currentPlayer = 0;                           //joueur actuel




function playerTurnChoice () {                                        // Choix du joueur grace à randomizer, 
    let randomizer = Math.floor(Math.random() * 2);                   // Assignation du choix à current player
         if (randomizer === 0) {
             
             currentPlayer = 0;
             playerTurn.innerHTML = "Joueur 1 commence"
         } else {
             
             currentPlayer = 1;
             playerTurn.innerHTML = "Joueur 2 commence"
         }
};
playerTurnChoice();






// ID box 


let box0 = document.getElementById("box0");                          // Ensemble des 9 cases
let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");
let box4 = document.getElementById("box4");
let box5 = document.getElementById("box5");
let box6 = document.getElementById("box6");
let box7 = document.getElementById("box7");
let box8 = document.getElementById("box8");

const boxTotal = [box0, box1, box2, box3, box4, box5, box6, box7, box8]            // Array pour les 9 cases,
                                                                                        //pour y accéder facilement via for of

function boxTotalTrigger1v1 () {                                                    // MODE 1 JOUEUR

    for (let box of boxTotal) {                                                  // PARCOURIR TOUS LES ELEMENTS DE L'ARRAY, ET 
                                                                                   // ASSIGNER A BOX

        box.addEventListener("click", () => {
                           
                  if (currentPlayer === 0 && box.className !== 'morpion-box bloque' && isJeuActif === 1) {
                    
                      punch.play();
                      nombreDeCoups -= 1;   // Les coups joués sont décrémmentés de 1
                      hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;
                     

                      box.style.background = "url(Img/circle.png) no-repeat center";           // Insére le 0 à l'endroit cliqué
                      box.style.backgroundSize = "cover";

                      
                      playerTurn.innerHTML = "player 2, les croix"   // Affichage du joueur en cours
                      
                      box.classList.add('bloque');                // ajoute la classe bloque, qui retournera Else la prochaine fois
                      //
                      let indexOfbox = boxTotal.indexOf(box);           // Prendre l'index de la box actuelle
                      // entrer la valeur dans l'array principale
                      boxPlayground[indexOfbox] = 1;              // Transmettre la valeur de l'index sur l'array des victoires
                      
                      isWinning();                                  // qui gagne à chaque coups
                      currentPlayer = 1;              //
                      
                  } else if (currentPlayer === 1 && box.className !== 'morpion-box bloque' && isJeuActif === 1) {
                    kick.play();
                    nombreDeCoups -= 1;
                    hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;


                    box.style.background = "url(Img/cross.png) no-repeat center";           // Insére le X à l'endroit cliqué
                      box.style.backgroundSize = "cover";
                      
                    box.classList.add('bloque')
                      let indexOfbox = boxTotal.indexOf(box);
                      boxPlayground[indexOfbox] = 10;
                      playerTurn.innerHTML = "player 1, les ronds";
                      
                      isWinning();
                      currentPlayer = 0;
                    
                  } else {
                      return;
                  }
                  
                  
        })
    }
};


//boxTotalTrigger1v1(); 


function isWinning (){       // Examine chaque posibilité de victoires, et les ajoute
   
let winningStreak = boxPlayground[0] + boxPlayground[1] + boxPlayground[2];
let winningStreak2 = boxPlayground[3] + boxPlayground[4] + boxPlayground[5];
let winningStreak3 = boxPlayground[6] + boxPlayground[7] + boxPlayground[8]
let winningStreak4 = boxPlayground[0] + boxPlayground[3] + boxPlayground[6];
let winningStreak5 = boxPlayground[1] + boxPlayground[4] + boxPlayground[7];
let winningStreak6 = boxPlayground[2] + boxPlayground[5] + boxPlayground[8]
let winningStreak7 = boxPlayground[0] + boxPlayground[4] + boxPlayground[8];
let winningStreak8 = boxPlayground[2] + boxPlayground[4] + boxPlayground[6];
coloringthebox();

// calcul des choix possible pour déterminer le vainqueur

if (winningStreak === 3 || winningStreak2 === 3 || winningStreak3 === 3|| winningStreak4 === 3 || winningStreak5 === 3 || winningStreak6 === 3 || winningStreak7 === 3 || winningStreak8 === 3) {
     partiesjouées++;                            
    gameNumber.innerHTML = "parties jouées : " + partiesjouées;        /* parties jouées */
    joueur1base += 1;
    setTimeout(affichageV1, 100);                                                       // Afficher anim victoire après 100ms
    setTimeout(restoreaffichageV1, 2000)                                                // Restorer l'affichage normal après 2s
    restartGame.classList.add("restartGame");                // Styliser le bouton pour dire de continuer la partie
    restartGame.style.visibility = "visible"
    petiteWin.play();
    storageMorpion();
    showPoints();

    if (joueur1base == currentGameSetValue) {              // Si le joueur 1 atteint la valeur maximale selectionnée
        playerTurn.innerHTML = "Joueur 1 Wins"
        victoryScreen();
        eraseAll()
        setTimeout(removeVictoryScreen, 2000);
        setTimeout(VictoryP1Screen, 2005);
        letIaPlay();
        refreshColor();
        
        
    }
    
    isJeuActif = 0;    // Enleve la posibilité de jouer
    
    hpdestroy1();              // ENleve la vie du joueur 2
    

    
    
    
} else if (winningStreak === 30 || winningStreak2 === 30 || winningStreak3 === 30 || winningStreak4 === 30 || winningStreak5 === 30 || winningStreak6 === 30 || winningStreak7 === 30 || winningStreak8 === 30 ) {
    partiesjouées++;
    gameNumber.innerHTML = "Parties jouées : " + partiesjouées;                         // parties jouées
    joueur2base += 1;
    setTimeout(affichageV2, 100);                                                       // Afficher anim victoire après 100ms
    setTimeout(restoreaffichageV2, 2000);                                                // Restorer l'affichage normal après 2s
    restartGame.classList.add("restartGame");                // Styliser le bouton pour dire de continuer la partie
    restartGame.style.visibility = "visible";
 
    petiteWin.play();
    storageMorpion();
    showPoints();
    
    
    
    
    if (joueur2base == currentGameSetValue) {    // SI LE JOUEUR 2 GAGNE LA PARTIE
        playerTurn.innerHTML = "Joueur 2 Wins";

        victoryScreen();
        eraseAll()
        setTimeout(removeVictoryScreen, 2000);
        setTimeout(VictoryP2Screen, 2005);
        letIaPlay();
        refreshColor();
       
    }
    
    

    isJeuActif = 0;       // Enleve la possibilité de jouer
    
    hpdestroy2();    //Enleve la vie du joueur 1
    
    
                      
}  else if (!boxPlayground.includes(0)) {
    console.log('bof');                                        // En cas de match nul draw
    playerTurn.innerHTML = "Match Nul";
    restartGame.classList.add("restartGame");
    restartGame.style.visibility = "visible"    
}
};



            



function boxTotalTrigger1vCPU () {                                                    // MODE 1 JOUEUR
    playerTurn.innerHTML = "Humain, commencez"
    for (let box of boxTotal) {                                                  // PARCOURIR TOUS LES ELEMENTS DE L'ARRAY, ET 
                                                                                   // ASSIGNER A BOX

        box.addEventListener("click", () => {
                 punch.play();
                 seeIfBotPlayin = 1;
                  currentPlayer = 0;
                  if (currentPlayer === 0 && box.className !== 'morpion-box bloque') {
                      
                      nombreDeCoups -= 1;   // Les coups joués sont décrémmentés de 1
                      hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;

                     

                      box.style.background = "url(Img/circle.png) no-repeat center";           // Insére le 0 à l'endroit cliqué
                      box.style.backgroundSize = "cover";
                      
                      playerTurn.innerHTML = "Roboto, les triangles"   // Affichage du joueur suivant
                      
                      box.classList.add('bloque');                // ajoute la classe bloque, qui retournera Else la prochaine fois
                      
                      let indexOfbox = boxTotal.indexOf(box);           // Prendre l'index de la box actuelle
                      
                      boxPlayground[indexOfbox] = 1;              // Transmettre la valeur de l'index sur l'array des victoires
                      
                      isWinning();                                  // qui gagne à chaque coups
                      currentPlayer = 1;             
                      storageMorpion();
                      
                    
                    if (isJeuActif !== 0 && currentPlayer == 1) {                        // Eteint le jeu si win
                    letIaPlay();
                    setTimeout(letPlayerPlay, 1000)  
                    setTimeout(superIa, 1000);}                    // active les mouvements du cpu toutes les 1.5s
                    storageMorpion();
                      
                    
                  } else {
                      return;                                       // ne déclenche aucun évenement si les conditions sont fausses.
                  }
                  
                  
        })
    }
};

 //boxTotalTrigger1vCPU(); 

function letIaPlay () {                                                                             // Fonction pour prévenir le click dans la zone de jeu pendant le tour du cpu
    document.querySelector(".morpion-container").style.pointerEvents = "none"
}
 
function letPlayerPlay () {                                                                         // Rend le controle au jour              
    document.querySelector(".morpion-container").style.pointerEvents = "auto"

}

 function superIa() {                             // Ordinateur très fort
    
    let dumbCpu = Math.floor(Math.random () * 9);
    if (boxPlayground[dumbCpu] !== 1 && boxPlayground[dumbCpu] !== 10) {  // il ne doit pas cibler les cases ayant déja été utilisées
            kick.play();
            nombreDeCoups -= 1;  
            hitNumber.innerHTML = "Coups restants : " + nombreDeCoups; // -1 compteur de coups
           
            boxPlayground[dumbCpu] = 10;                                  // écrit 10 dans la zone choisie
            boxTotal[dumbCpu].style.background = "url(Img/triangle.png) no-repeat center";                            // signature du robot
            boxTotal[dumbCpu].style.backgroundSize = "cover";
            boxTotal[dumbCpu].classList.add("bloque");                    // bloqué pour l'utilisateur
            playerTurn.innerHTML = "Joueur 1, les ronds";                   // Signal à qui de jouer
                      isWinning();
                      currentPlayer = 0;                                  // Renvoyer l'ascenseur
                       }
            
                      
     else {
        superIa()                                                         // Si cpu a fait un mauvais choix, il relance sa fonction
    } 
    }
  


   
gameSet.addEventListener("change", (e) => {                  // définit le nombre de partie à jouer  
    currentGameSetValue = e.target.value;
    showPoints();
    
    
})



function eraseAll () {                                                // Supprimer tous les élements du jeu
    for (i = 0; i< boxPlayground.length; i++) {                       // boucle pour parcourir toute l'array des scores
        boxPlayground[i] = 0;                                         // Reset toute l'array des scores
        boxTotal[i].style.background = "";                                 // Reset toutes les div
        nombreDeCoups = 9;
        hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;// Reset le compteur de coups joués
        
        boxTotal[i].classList.remove("bloque");                       // Dévérouille les cases
        isJeuActif = 1;                                               // Remet le jeu en mode actif
        

    }
}





restartGame.addEventListener("click", () => {                         // Efface tout et redonne un aléatoire pour le commencement de la partie
    eraseAll();
    playerTurnChoice();
    restartGame.classList.remove("restartGame");
    restartGame.style.visibility = "hidden"
 })
 

function vsTwoChecked () { if (vsTwo.checked === true) {                           // Choix du mode de jeu
        boxTotalTrigger1v1();
        vsCpu.style.pointerEvents = "none";
        petiteWin.play();
        
       
}}
vsTwo.addEventListener("click", () => {
    vsTwoChecked();
   });

function vsCpuChecked () {
    if (vsCpu.checked === true) {
        boxTotalTrigger1vCPU();
        vsTwo.style.pointerEvents = "none";
        document.querySelector(".imgspe2").src = "Img/bender.png";
        document.querySelector(".nameOfThePlayer2").innerHTML = "Bender";
        petiteWin.play();
        
        
        
    }
}   

vsCpu.addEventListener("click", () => {
    vsCpuChecked();
})



function affichageV1 () {                                                                   // Ecran victoire en haut du joueur 1
    joueur1Wins.innerHTML = ""
        joueur1Wins.style.background = "url(Img/youwin.png) no-repeat center / cover"
};

function restoreaffichageV1 () {                                                              // Enlève l'écran de victoire
    
    joueur1Wins.style.background = " rgb(0, 16, 51)"
}

function affichageV2 () {                                                                    // Ecran victoire en haut du joueur 2
    joueur2Wins.innerHTML = ""
        joueur2Wins.style.background = "url(Img/youwin.png) no-repeat center / cover";
};

function restoreaffichageV2 () {                                                             // Enlève l'écran de victoire
    
    joueur2Wins.style.background = " rgb(0, 16, 51)"
}

function hpdestroy1 () {                                                                     // A chaque victoire du joueur 1, baisse la valeur hpj2 qui sera transformé en pourcentage
                                                                                             // La barre de vie sera alors défini en hpj2%

    if (hpj2 >= 80) {
        player2Hp.style.background = "green"
    } else if (hpj2 >= 60) {
        player2Hp.style.background = "yellow"
    } else if (hpj2 <= 59) {
        player2Hp.style.background = "red"
    } 


    if (currentGameSetValue === 1) {
            hpj2 -= 100;
            player2Hp.style.width = hpj2 + "%"
    } else if (currentGameSetValue == 2) {
        hpj2 -= 50;
        player2Hp.style.width = hpj2 + "%"
    } else if (currentGameSetValue == 3) {
        hpj2 -= 33;
        player2Hp.style.width = hpj2 + "%"
    } else if (currentGameSetValue == 4) {
        hpj2 -= 25;
        player2Hp.style.width = hpj2 + "%"
    } else if (currentGameSetValue == 5) {
        hpj2 -= 20;
        player2Hp.style.width = hpj2 + "%"
    }
};


function hpdestroy2 () {
    

    if (hpj1 >= 80) {
        player1Hp.style.background = "green"
    } else if (hpj1 >= 60) {
        player1Hp.style.background = "yellow"
    } else if (hpj1 <= 59) {
        player1Hp.style.background = "red"
    } 



    if (currentGameSetValue === 1) {
            hpj1 -= 100;
            player1Hp.style.width = hpj1 + "%"
    } else if (currentGameSetValue == 2) {
        hpj1 -= 50;
        player1Hp.style.width = hpj1 + "%"
    } else if (currentGameSetValue == 3) {
        hpj1 -= 33;
        player1Hp.style.width = hpj1 + "%"
    } else if (currentGameSetValue == 4) {
        hpj1 -= 25;
        player1Hp.style.width = hpj1 + "%"
    } else if (currentGameSetValue == 5) {
        hpj1 -= 20;
        player1Hp.style.width = hpj1 + "%"
    }
};

// balrog ryu guile ken
function victoryScreen () {
    

    blackMorpion.style.background = "url(Img/kinglol.gif) no-repeat center";
    blackMorpion.style.backgroundSize = "cover";
    
    if (customStageKoAnimation === 0) {
    moveYourBody.classList.add("body");
    } 

     else if (customStageKoAnimation == 1) {
        moveYourBody.classList.add("bodybalrog");
        console.log(moveYourBody)
        } 
    
         else if (customStageKoAnimation == 2) {
            moveYourBody.classList.add("bodyryu");
            } 
             else if (customStageKoAnimation == 3) {
                moveYourBody.classList.add("bodyguile");
                } 
                else if (customStageKoAnimation == 4) {
                    moveYourBody.classList.add("bodyken");
                    } 
                                            
    
    


    let cachecache =  document.querySelector(".morpion-container");
    cachecache.style.visibility = "hidden";
    komusic.volume -= 0.5;
    komusic.play();
    
}

function removeVictoryScreen () {
    blackMorpion.style.background = "none";
    moveYourBody.classList.remove("body");
    moveYourBody.classList.remove("bodyryu");
    moveYourBody.classList.remove("bodyken");
    moveYourBody.classList.remove("bodybalrog");
    moveYourBody.classList.remove("bodyguile");

}

function VictoryP1Screen () {
    
    blackMorpion.style.background = "url(Img/ryuwins.png) no-repeat center";
    blackMorpion.style.backgroundSize = "cover";
    winmusic.play();
    
    
    
    
}

function VictoryP2Screen () {
    
    if (seeIfBotPlayin == 1) {
        blackMorpion.style.background = "url(Img/trybender.gif) no-repeat center";
        blackMorpion.style.backgroundSize = "cover";
        losemusic.play();
    } else {
    winmusic.play();
    blackMorpion.style.background = "url(Img/guilewins.png) no-repeat center";
    blackMorpion.style.backgroundSize = "cover";
}
    
}

refresh.addEventListener("click", () => {
    location.reload();
});


function refreshColor () {
    restartGame.classList.remove("restartGame");
    restartGame.style.visibility = "hidden"
        refresh.classList.add("refreshthat");
};

let lol = document.getElementById("lol");


function storageMorpion () {    // STOCKAGE //
    
    localStorage.setItem("scorej1", joueur1base);                // Score j1
    localStorage.setItem("scorej2", joueur2base);                // Score j2
    localStorage.setItem("gamevalue", currentGameSetValue);      // Nombre de parties prévues

    localStorage.setItem('hpj1', hpj1);                          // hpj1
    localStorage.setItem('hpj2', hpj2);                          // hpj2
    localStorage.setItem('partiejoue', partiesjouées);            // parties jouées
    localStorage.setItem("check", vsTwo.checked);
    localStorage.setItem("bababa", vsCpu.checked);


};



lol.addEventListener("click", () => {
            

    let joueur1baseAsString = localStorage.getItem("scorej1");          // On récupére le score pour le js en string
    let joueur2baseAsString = localStorage.getItem("scorej2");

    joueur1base = parseInt(joueur1baseAsString);                        // On reconverti la chaine en int
    joueur2base = parseInt(joueur2baseAsString);

    currentGameSetValue = localStorage.getItem("gamevalue");            // on remet la valeur de la game actuelle
    gameSet.value = parseInt(currentGameSetValue);

    

    let hpj1AsString = localStorage.getItem("hpj1");
    let hpj2AsString = localStorage.getItem("hpj2");
    hpj1 = parseInt(hpj1AsString);
    hpj2 = parseInt(hpj2AsString);
    
                                                               // VS CPU EST REMPLACE PAR VSTWO COMPREND PAS
    vsCpu.checked = localStorage.getItem("bababa");
    vsTwo.checked = localStorage.getItem("check");



    vsTwoChecked();
    vsCpuChecked();
    hpdestroy1();
    hpdestroy2();
    showPoints();

   
    
})




function showPoints () {
    let un = document.querySelector(".oneone");
    let deux = document.querySelector(".twotwo");
    let trois = document.querySelector(".threethree");
    let quatre = document.querySelector(".fourfour");
    let cinq = document.querySelector(".fivefive");

    let un2 = document.querySelector(".oneone2");
    let deux2 = document.querySelector(".twotwo2");
    let trois2 = document.querySelector(".threethree2");
    let quatre2 = document.querySelector(".fourfour2");
    let cinq2 = document.querySelector(".fivefive2");


                                                       // CACHER OU MONTRER POINTS


    if (currentGameSetValue == 1) {

         un.style.visibility = "visible";
         deux.style.visibility = "hidden";
         trois.style.visibility = "hidden";
         quatre.style.visibility = "hidden";
         cinq.style.visibility = "hidden";

         un2.style.visibility = "visible";
         deux2.style.visibility = "hidden";
         trois2.style.visibility = "hidden";
         quatre2.style.visibility = "hidden";
         cinq2.style.visibility = "hidden";


    } else if (currentGameSetValue == 2) {
        un.style.visibility = "visible";
        deux.style.visibility = "visible";
        trois.style.visibility = "hidden";
         quatre.style.visibility = "hidden";
         cinq.style.visibility = "hidden";

         un2.style.visibility = "visible";
        deux2.style.visibility = "visible";
        trois2.style.visibility = "hidden";
         quatre2.style.visibility = "hidden";
         cinq2.style.visibility = "hidden";
    } else if (currentGameSetValue == 3) {

        un.style.visibility = "visible";
        deux.style.visibility = "visible";
        trois.style.visibility = "visible";
        quatre.style.visibility = "hidden";
         cinq.style.visibility = "hidden";

         un2.style.visibility = "visible";
        deux2.style.visibility = "visible";
        trois2.style.visibility = "visible";
        quatre2.style.visibility = "hidden";
         cinq2.style.visibility = "hidden";

    } else if (currentGameSetValue == 4) {

        un.style.visibility = "visible";
        deux.style.visibility = "visible";
        trois.style.visibility = "visible";
        quatre.style.visibility = "visible";
        cinq.style.visibility = "hidden";

        un2.style.visibility = "visible";
        deux2.style.visibility = "visible";
        trois2.style.visibility = "visible";
        quatre2.style.visibility = "visible";
        cinq2.style.visibility = "hidden";


    } else if (currentGameSetValue == 5) {
        un.style.visibility = "visible";
        deux.style.visibility = "visible";
        trois.style.visibility = "visible";
        quatre.style.visibility = "visible";
        cinq.style.visibility = "visible";

        un2.style.visibility = "visible";
        deux2.style.visibility = "visible";
        trois2.style.visibility = "visible";
        quatre2.style.visibility = "visible";
        cinq2.style.visibility = "visible";
    }
    //                                                      ASSIGNEMENT DES COULEURS J1
    if (joueur1base == 1) {
        un.style.background = "yellow";
    } else if (joueur1base == 2) {
        un.style.background = "yellow";
        deux.style.background = "yellow"
    } else if (joueur1base == 3) {
        un.style.background = "yellow";
        deux.style.background = "yellow";
        trois.style.background = "yellow";
    } else if (joueur1base == 4) {
        un.style.background = "yellow";
        deux.style.background = "yellow";
        trois.style.background = "yellow";
        quatre.style.background = "yellow";
    } else if (joueur1base == 5) {
        un.style.background = "yellow";
        deux.style.background = "yellow";
        trois.style.background = "yellow";
        quatre.style.background = "yellow";
        cinq.style.background = "yellow";
    }
                                                   //ASSIGNEMENT DES COULEURS J2
    if (joueur2base == 1) {
        un2.style.background = "yellow";
    } else if (joueur2base == 2) {
        un2.style.background = "yellow";
        deux2.style.background = "yellow"
    } else if (joueur2base == 3) {
        un2.style.background = "yellow";
        deux2.style.background = "yellow";
        trois2.style.background = "yellow";
    } else if (joueur2base == 4) {
        un2.style.background = "yellow";
        deux2.style.background = "yellow";
        trois2.style.background = "yellow";
        quatre2.style.background = "yellow";
    } else if (joueur2base == 5) {
        un2.style.background = "yellow";
        deux2.style.background = "yellow";
        trois2.style.background = "yellow";
        quatre2.style.background = "yellow";
        cinq2.style.background = "yellow";
    }


}

showPoints();


 // ---------------------- TRY MINIMAX -----------------//
 // ----------------------------------------------------//
 // ----------------------------------------------------//
 // ----------------------------------------------------//
 // ----------------------------------------------------//
 // ----------------------------------------------------//
 // ----------------------------------------------------//

document.getElementById("buttonPlayBalrog").addEventListener("click", () => {
    customStageKoAnimation = 1;
    musiqueBalrog.play();
    musiqueRyu.pause();
    musiqueKen.pause();
    musiqueGuile.pause();
    moveYourBody.style.background = "url(Img/balrogstagetrue.jpg) no-repeat center";
    moveYourBody.style.backgroundSize = "cover";
    moveYourBody.style.backgroundColor = "rgb(0, 27, 85)"
})


document.getElementById("buttonPlayRyu").addEventListener("click", () => {
    customStageKoAnimation = 2;
    musiqueBalrog.pause();
    musiqueRyu.play();
    musiqueKen.pause();
    musiqueGuile.pause();
    moveYourBody.style.background = "url(Img/ryustagetrue.jpg) no-repeat center";
    moveYourBody.style.backgroundSize = "cover";
    moveYourBody.style.backgroundColor = "rgb(0, 27, 85)"
})


document.getElementById("buttonPlayGuile").addEventListener("click", () => {
    customStageKoAnimation = 3;
    musiqueGuile.play();
    musiqueGuile.volume = 0.4;
    musiqueRyu.pause();
    musiqueBalrog.pause();
    musiqueKen.pause();
    moveYourBody.style.background = "url(Img/guilestagetrue.jpg) no-repeat center";
    moveYourBody.style.backgroundSize = "cover";
    moveYourBody.style.backgroundColor = "rgb(0, 27, 85)"
})

document.getElementById("buttonPlay").addEventListener("click", () => {
    customStageKoAnimation = 4;
    musiqueKen.play();
    musiqueGuile.pause();
    musiqueRyu.pause();
    musiqueBalrog.pause();
    moveYourBody.style.background = "url(Img/kenstagetrue.jpg) no-repeat center";
    moveYourBody.style.backgroundSize = "cover";
    moveYourBody.style.backgroundColor = "rgb(0, 27, 85)"

});

document.getElementById("buttonPause").addEventListener("click", () => {
    musiqueKen.pause();
    musiqueGuile.pause();
    musiqueRyu.pause();
    musiqueBalrog.pause();
});

document.getElementById("buttonVolumeMinus").addEventListener("click", () => {
    musiqueKen.volume -= 0.1;
    musiqueGuile.volume -= 0.1;
    musiqueRyu.volume -= 0.1;
    musiqueBalrog.volume -= 0.1;
})

document.getElementById("buttonVolumePlus").addEventListener("click", () => {
    musiqueKen.volume += 0.1;
    musiqueGuile.volume += 0.1;
    musiqueRyu.volume += 0.1;
    musiqueBalrog.volume += 0.1;
});

document.querySelector(".pic").addEventListener("click", () => {
    document.querySelector(".soundboard").style.visibility = "visible";
    document.querySelector(".pic").style.visibility = "hidden"
});

document.querySelector(".gridbottom").addEventListener("click", () => {
    document.querySelector(".soundboard").style.visibility = "hidden";
    document.querySelector(".pic").style.visibility = "visible";
   
})

restartGame.addEventListener("click", () => {
    document.querySelector(".soundboard").style.visibility = "hidden";
    document.querySelector(".pic").style.visibility = "visible"
});

document.querySelector(".topbar").addEventListener("click", () => {
    document.querySelector(".soundboard").style.visibility = "hidden";
    document.querySelector(".pic").style.visibility = "visible"
});

document.querySelector(".buttonContinuerContainer").addEventListener("click", () => {
    document.querySelector(".soundboard").style.visibility = "hidden";
    document.querySelector(".pic").style.visibility = "visible"
});


function coloringthebox () {
 if(boxPlayground[0] + boxPlayground[1] + boxPlayground[2] == 3 || boxPlayground[0] + boxPlayground[1] + boxPlayground[2] == 30) {
    boxTotal[0].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[1].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[2].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
 }
 
 else if (boxPlayground[3] + boxPlayground[4] + boxPlayground[5] == 3 || boxPlayground[3] + boxPlayground[4] + boxPlayground[5] == 30) {
    boxTotal[3].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[4].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[5].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
 }
 
else if (boxPlayground[6] + boxPlayground[7] + boxPlayground[8] == 3 || boxPlayground[6] + boxPlayground[7] + boxPlayground[8] == 30) {
    boxTotal[6].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[7].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[8].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
 }
 else if (boxPlayground[0] + boxPlayground[3] + boxPlayground[6] == 3 || boxPlayground[0] + boxPlayground[3] + boxPlayground[6] == 30) {
    boxTotal[0].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[3].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[6].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
 }
 
 else if ( boxPlayground[1] + boxPlayground[4] + boxPlayground[7] == 3 || boxPlayground[1] + boxPlayground[4] + boxPlayground[7] == 30) {
    boxTotal[1].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[4].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[7].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
 }
 
else if (boxPlayground[2] + boxPlayground[5] + boxPlayground[8] == 3 || boxPlayground[2] + boxPlayground[5] + boxPlayground[8] == 30) {
    boxTotal[2].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[5].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[8].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
}
else if (boxPlayground[0] + boxPlayground[4] + boxPlayground[8] == 3 || boxPlayground[0] + boxPlayground[4] + boxPlayground[8] == 30) {
    boxTotal[0].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[4].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[8].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
}

else if (boxPlayground[2] + boxPlayground[4] + boxPlayground[6] == 3 || boxPlayground[2] + boxPlayground[4] + boxPlayground[6] == 30  ) {
    boxTotal[2].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[4].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    boxTotal[6].style.backgroundColor = "rgba(255, 255, 255, 0.3)";
}
}





////// METTRE VALEUR DANS LET 1,2,3,4,5 POUR SWITCH BACKGROUND URL


document.getElementById("clearstorage").addEventListener("click", () => {
    localStorage.clear();
})
