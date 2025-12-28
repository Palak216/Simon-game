let gameseq=[];
let userseq=[];
let btns=["yellow","red","purple","green"];

let started=false;
let level=0;
let highScore=0;

let h2=document.querySelector("h2");



// document.addEventListener("keypress",function(){
//     if( started == false ){
//         console.log("game is started");
//         started=true;

//         levelUp();
//     }
// });
let startBtn = document.querySelector("#start-btn");

startBtn.addEventListener("click", function(){
    if(!started){
        started = true;
        startBtn.style.display = "none"; // hide button
        levelUp();
    }
});

function gameFlash(btn){
   btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash");
    },250);
    
}
function UserFlash(btn){
   btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
    
}
function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    //random btn choose
    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randColor);
    // console.log(randIdx);
    // console.log(randBtn);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);

}function checkAns(idx){
    
     if(userseq[idx] === gameseq[idx]){
        if(userseq.length === gameseq.length){
            setTimeout(levelUp, 1000);
        }
    } else {  
        

        if(level > highScore){
            highScore = level;
        }
        h2.innerHTML = `
        Game Over! <br>
        Your score: <b>${level}</b><br>
        High score: <b>${highScore}</b><br>
        
        `;


        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        startBtn.style.display = "inline-block"; 
        reset();
    }
}


function btnPress(){
    console.log(this); 
    let btn=this; 
    UserFlash(btn);  
    let usercolor=btn.getAttribute("id"); 
    
    console.log(usercolor); 
    userseq.push(usercolor); 
    checkAns(userseq.length-1);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}