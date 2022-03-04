$(document).on("keypress", Game); // Event handler that listens to a keypress to start the game.



var squareSequence = [];
var clickedSequence = [];

var i;
var j;
var id;

var square1audio = new Audio("sounds/yellow.mp3");
var square2audio = new Audio("sounds/blue.mp3");
var square3audio = new Audio("sounds/red.mp3");
var square4audio = new Audio("sounds/green.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");

var gameOver = false;

var round = 1;



/* Function to run the game, pushing a random number to the sequence of squares
every new round, and then calling the function Verify(). */

async function Game() {

    $(document).off();


    if (gameOver == false) {

        if (squareSequence.length == clickedSequence.length) {
            squareSequence.push(RandomNum().toString());
        }

        console.log(squareSequence);

        clickedSequence = [];

        i = squareSequence.length - 1;

        $("h1").html(`Level ${round}`);

        await timeout(200);

        switch (squareSequence[i]) {
            case "1":
                square1audio.play();
                break;
            case "2":
                square2audio.play();
                break;
            case "3":
                square3audio.play();
                break;
            case "4":
                square4audio.play();
                break;
        }

        $(`#${squareSequence[i]}`).removeClass(`square${squareSequence[i]}`).addClass(`square${squareSequence[i]}-selected`);
        await timeout(500);
        $(`#${squareSequence[i]}`).removeClass(`square${squareSequence[i]}-selected`).addClass(`square${squareSequence[i]}`);
        await timeout(200);

        
        Verify();

    
        
    }

    else {

        gameOver = false;
        squareSequence = [];
        clickedSequence = [];
        $("h1").html("Game Over, Press Any Key to Restart");
        $(document).on("keypress", Game);

    }
}



/* Function that verifies if the clicked square is the right one,
proceeding to the next level if it is right and if it is the last of the sequence,
or waiting for another square to be clicked if it is right but not the last one,
or ending the game if it is the wrong square. */

async function Verify() {

    $("div.square").on("click", async function clickEvent(event){

        $("div.square").off();

        id = event.currentTarget.id;
        
        switch (id) {
            case "1":
                square1audio.play();
                break;
            case "2":
                square2audio.play();
                break;
            case "3":
                square3audio.play();
                break;
            case "4":
                square4audio.play();
                break;
        }

        $(`#${id}`).removeClass(`square${id}`).addClass(`square${id}-selected`);

        setTimeout(function() {
            $(`#${id}`).removeClass(`square${id}-selected`).addClass(`square${id}`);
        }, 500);

        
        clickedSequence.push(id);

        j = clickedSequence.length - 1;


        console.log("i = " + i)
        console.log("j = " + j)
        console.log(clickedSequence);
        console.log(squareSequence);

        await timeout(500);


        if ((clickedSequence[j] == squareSequence[j]) && (clickedSequence.length == squareSequence.length)) {
        
            round++;
            Game();
            console.log('if');
        

        } 

        else if ((clickedSequence[j] == squareSequence[j]) && (clickedSequence.length != squareSequence.length)) {
        
            Verify();
            console.log('else if');

        }

        else {

            wrongAudio.play();
            round = 1;
            gameOver = true;
            Game();
            console.log('else');

        }

    });

}



/* Function that provides a timeout in ms, that can be
put in any part of the code so that it doesn't run 
every command at the same time. Especially useful in making animations,
as an alternative to the setTimeout. */

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



/* Function that generates a random number
between 1-4, corresponding to the squares id's. */

function RandomNum() {
    var randomNumber = (Math.floor(Math.random() * 4) + 1);
    return randomNumber;
}