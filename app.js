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
let nombreDeCoups = 9;     /* Coups jou??s qui sera d??cr??mment??*/
let partiesjou??es = 0;

let partiesjou??esAsString = localStorage.getItem("partiejoue");   // on r??cup??re les parties jou??es en string, qu'on reconverti

    partiesjou??es = parseInt(partiesjou??esAsString);                   // pour les ajouter au js
    
if (partiesjou??esAsString == null) {
        partiesjou??es = 0;
    } else {
        partiesjou??esAsString = partiesjou??es;
    gameNumber.innerHTML = "Parties jou??es : " + "" + partiesjou??es;                             // puis on affiche le compteur
}
let hpj1 = 100;
let hpj2 = 100;

let boxPlayground = [0,0,0,0,0,0,0,0,0];             // array win

let currentGameSetValue = 1;                  // nombre de parties ?? gagner



joueur1base = 0;                             //compteur victoire joueur 1
joueur2base = 0;                             //compteur victoire joueur 2     
let currentPlayer = 0;                           //joueur actuel




function playerTurnChoice () {                                        // Choix du joueur grace ?? randomizer, 
    let randomizer = Math.floor(Math.random() * 2);                   // Assignation du choix ?? current player
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
                                                                                        //pour y acc??der facilement via for of

function boxTotalTrigger1v1 () {                                                    // MODE 1 JOUEUR

    for (let box of boxTotal) {                                                  // PARCOURIR TOUS LES ELEMENTS DE L'ARRAY, ET 
                                                                                   // ASSIGNER A BOX

        box.addEventListener("click", () => {
                           
                  if (currentPlayer === 0 && box.className !== 'morpion-box bloque' && isJeuActif === 1) {
                    
                      punch.play();
                      nombreDeCoups -= 1;   // Les coups jou??s sont d??cr??mment??s de 1
                      hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;
                     

                      box.style.background = "url(Img/circle.png) no-repeat center";           // Ins??re le 0 ?? l'endroit cliqu??
                      box.style.backgroundSize = "cover";

                      
                      playerTurn.innerHTML = "player 2, les croix"   // Affichage du joueur en cours
                      
                      box.classList.add('bloque');                // ajoute la classe bloque, qui retournera Else la prochaine fois
                      //
                      let indexOfbox = boxTotal.indexOf(box);           // Prendre l'index de la box actuelle
                      // entrer la valeur dans l'array principale
                      boxPlayground[indexOfbox] = 1;              // Transmettre la valeur de l'index sur l'array des victoires
                      
                      isWinning();                                  // qui gagne ?? chaque coups
                      currentPlayer = 1;              //
                      
                  } else if (currentPlayer === 1 && box.className !== 'morpion-box bloque' && isJeuActif === 1) {
                    kick.play();
                    nombreDeCoups -= 1;
                    hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;


                    box.style.background = "url(Img/cross.png) no-repeat center";           // Ins??re le X ?? l'endroit cliqu??
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


function isWinning (){       // Examine chaque posibilit?? de victoires, et les ajoute
   
let winningStreak = boxPlayground[0] + boxPlayground[1] + boxPlayground[2];
let winningStreak2 = boxPlayground[3] + boxPlayground[4] + boxPlayground[5];
let winningStreak3 = boxPlayground[6] + boxPlayground[7] + boxPlayground[8]
let winningStreak4 = boxPlayground[0] + boxPlayground[3] + boxPlayground[6];
let winningStreak5 = boxPlayground[1] + boxPlayground[4] + boxPlayground[7];
let winningStreak6 = boxPlayground[2] + boxPlayground[5] + boxPlayground[8]
let winningStreak7 = boxPlayground[0] + boxPlayground[4] + boxPlayground[8];
let winningStreak8 = boxPlayground[2] + boxPlayground[4] + boxPlayground[6];
coloringthebox();

// calcul des choix possible pour d??terminer le vainqueur

if (winningStreak === 3 || winningStreak2 === 3 || winningStreak3 === 3|| winningStreak4 === 3 || winningStreak5 === 3 || winningStreak6 === 3 || winningStreak7 === 3 || winningStreak8 === 3) {
     partiesjou??es++;                            
    gameNumber.innerHTML = "parties jou??es : " + partiesjou??es;        /* parties jou??es */
    joueur1base += 1;
    setTimeout(affichageV1, 100);                                                       // Afficher anim victoire apr??s 100ms
    setTimeout(restoreaffichageV1, 2000)                                                // Restorer l'affichage normal apr??s 2s
    restartGame.classList.add("restartGame");                // Styliser le bouton pour dire de continuer la partie
    restartGame.style.visibility = "visible"
    petiteWin.play();
    storageMorpion();
    showPoints();

    if (joueur1base == currentGameSetValue) {              // Si le joueur 1 atteint la valeur maximale selectionn??e
        playerTurn.innerHTML = "Joueur 1 Wins"
        victoryScreen();
        eraseAll()
        setTimeout(removeVictoryScreen, 2000);
        setTimeout(VictoryP1Screen, 2005);
        letIaPlay();
        refreshColor();
        
        
    }
    
    isJeuActif = 0;    // Enleve la posibilit?? de jouer
    
    hpdestroy1();              // ENleve la vie du joueur 2
    

    
    
    
} else if (winningStreak === 30 || winningStreak2 === 30 || winningStreak3 === 30 || winningStreak4 === 30 || winningStreak5 === 30 || winningStreak6 === 30 || winningStreak7 === 30 || winningStreak8 === 30 ) {
    partiesjou??es++;
    gameNumber.innerHTML = "Parties jou??es : " + partiesjou??es;                         // parties jou??es
    joueur2base += 1;
    setTimeout(affichageV2, 100);                                                       // Afficher anim victoire apr??s 100ms
    setTimeout(restoreaffichageV2, 2000);                                                // Restorer l'affichage normal apr??s 2s
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
    
    

    isJeuActif = 0;       // Enleve la possibilit?? de jouer
    
    hpdestroy2();    //Enleve la vie du joueur 1
    
    
                      
}  else if (!boxPlayground.includes(0)) {
    console.log('bof');                                        // En cas de match nul draw
    playerTurn.innerHTML = "Match Nul";
    restartGame.classList.add("restartGame");
    restartGame.style.visibility = "visible"    
}
};



            



function boxTotalTrigger1vCPU () {                                                    // MODE CPu vs JOUEUR
    playerTurn.innerHTML = "Humain, commencez"
    for (let box of boxTotal) {                                                  // PARCOURIR TOUS LES ELEMENTS DE L'ARRAY, ET 
                                                                                   // ASSIGNER A BOX

        box.addEventListener("click", () => {
                 punch.play();
                 seeIfBotPlayin = 1;
                  currentPlayer = 0;
                  if (currentPlayer === 0 && box.className !== 'morpion-box bloque') {
                      
                      nombreDeCoups -= 1;   // Les coups jou??s sont d??cr??mment??s de 1
                      hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;

                     

                      box.style.background = "url(Img/circle.png) no-repeat center";           // Ins??re le 0 ?? l'endroit cliqu??
                      box.style.backgroundSize = "cover";
                      
                      playerTurn.innerHTML = "Bender, les carr??s"   // Affichage du joueur suivant
                      
                      box.classList.add('bloque');                // ajoute la classe bloque, qui retournera Else la prochaine fois
                      
                      let indexOfbox = boxTotal.indexOf(box);           // Prendre l'index de la box actuelle
                      
                      boxPlayground[indexOfbox] = 1;              // Transmettre la valeur de l'index sur l'array des victoires
                      
                      isWinning();                                  // qui gagne ?? chaque coups
                      currentPlayer = 1;             
                      storageMorpion();
                      
                    
                    if (isJeuActif !== 0 && currentPlayer == 1) {                        // Eteint le jeu si win
                    letIaPlay();
                    setTimeout(letPlayerPlay, 1000)  
                    setTimeout(superIa, 1000);}                    // active les mouvements du cpu toutes les 1.5s
                    storageMorpion();
                      
                    
                  } else {
                      return;                                       // ne d??clenche aucun ??venement si les conditions sont fausses.
                  }
                  
                  
        })
    }
};

 //boxTotalTrigger1vCPU(); 

function letIaPlay () {                                                                             // Fonction pour pr??venir le click dans la zone de jeu pendant le tour du cpu
    document.querySelector(".morpion-container").style.pointerEvents = "none"
}
 
function letPlayerPlay () {                                                                         // Rend le controle au jour              
    document.querySelector(".morpion-container").style.pointerEvents = "auto"

}

 function superIa() {                             // Ordinateur tr??s fort
    
    let dumbCpu = Math.floor(Math.random () * 9);
    if (boxPlayground[dumbCpu] !== 1 && boxPlayground[dumbCpu] !== 10) {  // il ne doit pas cibler les cases ayant d??ja ??t?? utilis??es
            kick.play();
            nombreDeCoups -= 1;  
            hitNumber.innerHTML = "Coups restants : " + nombreDeCoups; // -1 compteur de coups
           
            boxPlayground[dumbCpu] = 10;                                  // ??crit 10 dans la zone choisie
            boxTotal[dumbCpu].style.background = "url(Img/square.png) no-repeat center";                            // signature du robot
            boxTotal[dumbCpu].style.backgroundSize = "cover";
            boxTotal[dumbCpu].classList.add("bloque");                    // bloqu?? pour l'utilisateur
            playerTurn.innerHTML = "Joueur 1, les ronds";                   // Signal ?? qui de jouer
                      isWinning();
                      currentPlayer = 0;                                  // Renvoyer l'ascenseur
                       }
            
                      
     else {
        superIa()                                                         // Si cpu a fait un mauvais choix, il relance sa fonction
    } 
    }
  


   
gameSet.addEventListener("change", (e) => {                  // d??finit le nombre de partie ?? jouer  
    currentGameSetValue = e.target.value;
    showPoints();
    
    
})



function eraseAll () {                                                // Supprimer tous les ??lements du jeu
    for (i = 0; i< boxPlayground.length; i++) {                       // boucle pour parcourir toute l'array des scores
        boxPlayground[i] = 0;                                         // Reset toute l'array des scores
        boxTotal[i].style.background = "";                                 // Reset toutes les div
        nombreDeCoups = 9;
        hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;// Reset le compteur de coups jou??s
        
        boxTotal[i].classList.remove("bloque");                       // D??v??rouille les cases
        isJeuActif = 1;                                               // Remet le jeu en mode actif
        

    }
}





restartGame.addEventListener("click", () => {                         // Efface tout et redonne un al??atoire pour le commencement de la partie
    eraseAll();
    playerTurnChoice();
    restartGame.classList.remove("restartGame");
    restartGame.style.visibility = "hidden"
 })
 

function vsTwoChecked () { if (vsTwo.checked === true) {                           // Choix du mode de jeu
        boxTotalTrigger1v1();
        vsCpu.style.pointerEvents = "none";
        vsCpuHell.style.pointerEvents = "none";
        petiteWin.play();
        document.querySelector(".vsTwoStyle").style.backgroundColor = "blue"
        
       
}}
vsTwo.addEventListener("click", () => {
    vsTwoChecked();
   });

function vsCpuChecked () {
    if (vsCpu.checked === true) {
        boxTotalTrigger1vCPU();
        vsTwo.style.pointerEvents = "none";
        vsCpuHell.style.pointerEvents = "none";
        document.querySelector(".imgspe2").src = "Img/bender.png";
        document.querySelector(".nameOfThePlayer2").innerHTML = "Bender";
        document.querySelector(".nameOfThePlayer2").style.color = "#25BC2D"
        petiteWin.play();
        document.querySelector(".vsCpuStyle").style.backgroundColor = "blue"
        
        
        
    }
}   

vsCpu.addEventListener("click", () => {
    vsCpuChecked();
})



function affichageV1 () {                                                                   // Ecran victoire en haut du joueur 1
    joueur1Wins.innerHTML = ""
        joueur1Wins.style.background = "url(Img/youwin.png) no-repeat center / cover"
};

function restoreaffichageV1 () {                                                              // Enl??ve l'??cran de victoire
    
    joueur1Wins.style.background = " rgb(0, 16, 51)"
}

function affichageV2 () {                                                                    // Ecran victoire en haut du joueur 2
    joueur2Wins.innerHTML = ""
        joueur2Wins.style.background = "url(Img/youwin.png) no-repeat center / cover";
};

function restoreaffichageV2 () {                                                             // Enl??ve l'??cran de victoire
    
    joueur2Wins.style.background = " rgb(0, 16, 51)"
}

function hpdestroy1 () {                                                                     // A chaque victoire du joueur 1, baisse la valeur hpj2 qui sera transform?? en pourcentage
                                                                                             // La barre de vie sera alors d??fini en hpj2%

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
    komusic.volume = 0.2;
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
    localStorage.setItem("gamevalue", currentGameSetValue);      // Nombre de parties pr??vues

    localStorage.setItem('hpj1', hpj1);                          // hpj1
    localStorage.setItem('hpj2', hpj2);                          // hpj2
    localStorage.setItem('partiejoue', partiesjou??es);            // parties jou??es
    localStorage.setItem("check", vsTwo.checked);
    localStorage.setItem("bababa", vsCpu.checked);


};



lol.addEventListener("click", () => {
            

    let joueur1baseAsString = localStorage.getItem("scorej1");          // On r??cup??re le score pour le js en string
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





document.getElementById("clearstorage").addEventListener("click", () => {
    localStorage.clear();
})

// SUPERMAX ______________________________________________________________________
// _______________________________________________________________________________
// _______________________________________________________________________________
// _______________________________________________________________________________
// _______________________________________________________________________________
// _______________________________________________________________________________
// _______________________________________________________________________________



// Step 3 - Store the board???s current state in an array and define each mark's owner:
const currentBoardState = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const aiMark = "X";
const humanMark = "O";

// Step 4 - Create a function to get the indexes of all the empty cells:
function getAllEmptyCellsIndexes(currBdSt) {
    return currBdSt.filter(i => i != "O" && i != "X");
}

// Step 5 - Create a winner determiner function:
function checkIfWinnerFound(currBdSt, currMark) {
    if (
        (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
        (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
        (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
        (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
        (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark)
) {
        return true;
    } else {
        return false;
    }
}

// Step 6 - Create the minimax algorithm:
function minimax(currBdSt, currMark) {
    // Step 8 - Store the indexes of all empty cells:
    const availCellsIndexes = getAllEmptyCellsIndexes(currBdSt);
    
    // Step 9 - Check if there is a terminal state:
    if (checkIfWinnerFound(currBdSt, humanMark)) {
        return {score: -1};
    } else if (checkIfWinnerFound(currBdSt, aiMark)) {
        return {score: 1};
    } else if (availCellsIndexes.length === 0) {
        return {score: 0};
    }
    
    // Step 10 - Create a place to record the outcome of each test drive:
    const allTestPlayInfos = [];
    
    // Step 10 - Create a for-loop statement that will loop through each of the empty cells:
    for (let i = 0; i < availCellsIndexes.length; i++) {
        // Step 11 - Create a place to store this test-play???s terminal score:
        const currentTestPlayInfo = {};
        
        // Step 11 - Save the index number of the cell this for-loop is currently processing:
        currentTestPlayInfo.index = currBdSt[availCellsIndexes[i]];
        
        // Step 11 - Place the current player???s mark on the cell for-loop is currently processing:
        currBdSt[availCellsIndexes[i]] = currMark;
        
        if (currMark === aiMark) {
            // Step 11 - Recursively run the minimax function for the new board:
            const result = minimax(currBdSt, humanMark);
            
            // Step 12 - Save the result variable???s score into the currentTestPlayInfo object:
            currentTestPlayInfo.score = result.score;
        } else {
            // Step 11 - Recursively run the minimax function for the new board:
            const result = minimax(currBdSt, aiMark);
            
            // Step 12 - Save the result variable???s score into the currentTestPlayInfo object:
            currentTestPlayInfo.score = result.score;
        }
        
        // Step 12 - Reset the current board back to the state it was before the current player made its move:
        currBdSt[availCellsIndexes[i]] = currentTestPlayInfo.index;
        
        // Step 12 - Save the result of the current player???s test-play for future use:
        allTestPlayInfos.push(currentTestPlayInfo);
    }
    
    // Step 15 - Create a store for the best test-play???s reference:
    let bestTestPlay = null;
    
    // Step 16 - Get the reference to the current player???s best test-play:
    if (currMark === aiMark) {
        let bestScore = -Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score > bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score < bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    }
    
    // Step 17 - Get the object with the best test-play score for the current player:
    return allTestPlayInfos[bestTestPlay];
} 






// BIG FUNCTION  ___________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________
// _________________________________________________________________________________________________________________







function boxTotalTrigger1vMinimax () {                                                    // MODE CPu vs JOUEUR
    playerTurn.innerHTML = "Humain, commencez"
    for (let box of boxTotal) {                                                  // PARCOURIR TOUS LES ELEMENTS DE L'ARRAY, ET 
                                                                                   // ASSIGNER A BOX

        box.addEventListener("click", () => {
                 
                 punch.play();
                 seeIfBotPlayin = 2;
                  currentPlayer = 0;
                  if (currentPlayer === 0 && box.className !== 'morpion-box bloque') {
                      
                      nombreDeCoups -= 1;   // Les coups jou??s sont d??cr??mment??s de 1
                      hitNumber.innerHTML = "Coups restants : " + nombreDeCoups;

                     

                      box.style.background = "url(Img/circle.png) no-repeat center";           // Ins??re le 0 ?? l'endroit cliqu??
                      box.style.backgroundSize = "cover";
                      
                      playerTurn.innerHTML = "Ultron, les triangles"   // Affichage du joueur suivant
                      
                      
                      let indexOfbox = boxTotal.indexOf(box);           // Prendre l'index de la box actuelle
                      
                      currentBoardState[indexOfbox] = "O";              // Transmettre la valeur de l'index sur l'array  current board de minimax
                      
                      
                      currentPlayer = 1;             
                      storageMorpion();
                      
                    
                    if (isJeuActif !== 0 && currentPlayer == 1) {                        // Eteint le jeu si win
                    letIaPlay();
                    setTimeout(letPlayerPlay, 1000)  
                    setTimeout(superIaMax, 1000);}                    // active les mouvements du cpu toutes les 1.5s
                    storageMorpion();
                      
                    
                  } else {
                      return;                                       // ne d??clenche aucun ??venement si les conditions sont fausses.
                  }
                  
                  
        })
    }
};



// IA MAX ACTIONS _____________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________________________________________________________________________________


 function superIaMax() {          // Ordinateur tr??s fort
      const bestPlayInfo = minimax(currentBoardState, aiMark);  
      boxTotal[bestPlayInfo.index].style.backgroundColor = "red"                
      currentBoardState[bestPlayInfo.index] = "X";
      kick.play();
      nombreDeCoups -= 1;  
      hitNumber.innerHTML = "Coups restants : " + nombreDeCoups; // -1 compteur de coups
           
            
            boxTotal[bestPlayInfo.index].style.background = "url(Img/triangle.png) no-repeat center";                            // signature du robot
            boxTotal[bestPlayInfo.index].style.backgroundSize = "cover";
            boxTotal[bestPlayInfo.index].classList.add("bloque");                    // bloqu?? pour l'utilisateur
            playerTurn.innerHTML = "Joueur 1, les ronds";                   // Signal ?? qui de jouer
                      isWinningUltron(currentBoardState, aiMark);
                      currentPlayer = 0;                                  // Renvoyer l'ascenseur
      
    
    

    }
 //boxTotalTrigger1vCPU(); 

function letIaPlay () {                                                                             // Fonction pour pr??venir le click dans la zone de jeu pendant le tour du cpu
    document.querySelector(".morpion-container").style.pointerEvents = "none"
}
 
function letPlayerPlay () {                                                                         // Rend le controle au jour              
    document.querySelector(".morpion-container").style.pointerEvents = "auto"

}



    // AU CLICK LANCER FONCTION MAXIMAX __________________
    //____________________________________________________
    //____________________________________________________
    //____________________________________________________
    //____________________________________________________
    //____________________________________________________
    //____________________________________________________
    //____________________________________________________














    vsCpuHell.addEventListener("click", () => {
        vsCpuHellChecked();
       });
    

    function vsCpuHellChecked () {
        if (vsCpuHell.checked === true) {
            boxTotalTrigger1vMinimax();
            vsCpu.style.pointerEvents = "none";
            vsTwo.style.pointerEvents = "none";
            document.querySelector(".listparties").style.pointerEvents = "none";
            document.querySelector(".imgspe2").src = "Img/terminator.png";
            document.querySelector(".nameOfThePlayer2").innerHTML = "Ultron";
            document.querySelector(".nameOfThePlayer2").style.color = "white";
            document.querySelector(".topbar").style.backgroundColor ="black"
            petiteWin.play();
            document.querySelector(".vsCpuHell").style.backgroundColor = "red";
            
            
            
        }
    }       




    function isWinningUltron (currBdSt, currMark){       // Examine chaque posibilit?? de victoires, et les ajoute
                     
        if (
            (currBdSt[0] === currMark && currBdSt[1] === currMark && currBdSt[2] === currMark) ||
            (currBdSt[3] === currMark && currBdSt[4] === currMark && currBdSt[5] === currMark) ||
            (currBdSt[6] === currMark && currBdSt[7] === currMark && currBdSt[8] === currMark) ||
            (currBdSt[0] === currMark && currBdSt[3] === currMark && currBdSt[6] === currMark) ||
            (currBdSt[1] === currMark && currBdSt[4] === currMark && currBdSt[7] === currMark) ||
            (currBdSt[2] === currMark && currBdSt[5] === currMark && currBdSt[8] === currMark) ||
            (currBdSt[0] === currMark && currBdSt[4] === currMark && currBdSt[8] === currMark) ||
            (currBdSt[2] === currMark && currBdSt[4] === currMark && currBdSt[6] === currMark)) {


                  console.log("ultronWins");
                  partiesjou??es++;
                  gameNumber.innerHTML = "Parties jou??es : " + partiesjou??es;                         // parties jou??es
                  joueur2base += 1;
                  setTimeout(affichageV2, 100);                                                       // Afficher anim victoire apr??s 100ms
                  setTimeout(restoreaffichageV2, 2000);                                                // Restorer l'affichage normal apr??s 2s
                  restartGame.classList.add("restartGame");                // Styliser le bouton pour dire de continuer la partie
                  restartGame.style.visibility = "visible";
               
                  petiteWin.play();
                  storageMorpion();
                  showPoints();




            }

                   } 

    