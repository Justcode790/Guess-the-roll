// localStorage.setItem("highestScore", 0);

const container = document.querySelector(".container");
function showTheGame(){
    document.getElementById("intro").style.display="none";
    container.classList.remove("disp");
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.3;
    bgMusic.play().catch(err => console.log("Autoplay blocked", err));

    
}
function backThegame(){
    location.reload();
    document.getElementById("intro").style.display="block";
    container.classList.add("disp");
    
}

let rolling = false;

if (!localStorage.getItem("highestScore")) {
    localStorage.setItem("highestScore", 0);
}

document.getElementById("highScore").innerText = localStorage.getItem("highestScore");
function rollDice(event) {
    if (rolling) {
        return;
    }
    rolling = true;
    let scoreText = document.getElementById("score").innerText;
    let score = parseInt(scoreText.split(":")[1]);
    let dice = document.getElementById("dice");
    dice.classList.add("rolling");

    const rollSound = document.getElementById("bgMusic2");
    rollSound.currentTime = 0;
    rollSound.play();

    let btn = event.target;
    btn.disabled = true;

    setTimeout(() => {
        dice.classList.remove("rolling");
        let randNnum = Math.floor(Math.random() * 6) + 1;
        let clickednum = parseInt(btn.innerText);

        if (randNnum === clickednum) {
            score += randNnum;
        } else {
            score -= randNnum;
        }

        document.getElementById("score").innerText = `Score: ${score}`;

        let highestScore = parseInt(localStorage.getItem("highestScore")) || 0;
        if (score > highestScore) {
            localStorage.setItem("highestScore", score);
            document.getElementById("highScore").innerText = score;
        }

        showSide(randNnum);
         if(score<-10){
            alert("you have reached the lowest score value. !Exiting...............the game");
            location.reload();
            backThegame();
            

        }
        rollSound.pause();
        rollSound.currentTime = 0;
        btn.disabled = false;
        rolling = false;

    }, 1000);
}

function showSide(num) {
    var faces = document.getElementsByClassName("face");
    for (let face of faces) {
        face.style.display = "none";
    }

    document.getElementById("face" + num).style.display = "block";
}
