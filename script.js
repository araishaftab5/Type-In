const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");

const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const theResult= document.querySelector(".result");
const theIncorrect= document.querySelector(".incorrect");
const sampleText = document.querySelector("#origin-text p");
var timer=[0,0,0,0]; //for minutes,seconds,hundredth of second,hundredth of second
var interval;
var timerRunning = false;
var errno=0;
var sentences=["I was broken from a young age.Taking my soul into the masses.Writing my poems for the few.That look at me, took at me, shook at me, feel at me.Singing from heart ache to the pain.Taking my message from the pain.Speaking my lessons from the brain.Seeing the beauty through love.",
"It keeps me awake The look on your face The moment you heard the news You are screaming inside And frozen in time You did all that you could do The game was rigged, the ref got tricked The wrong ones think they are right You were outnumbered, this time But only the young Only them.",
"Yeah, you could be the greatest You can be the best You can be the King Kong banging on your chest You could beat the world You could beat the war You could talk to God, go banging on his door You can throw your hands up You can beat the clock You can move me.",
"Just a young gun with a quick fuse I was uptight, wanna let loose I was dreaming of bigger things And wanna leave my old life behind Not a yes sir, not a follower Fit the box, fit the mold Have a seat in the foyer, take a number I was lightning before the thunder Thunder."];
var index = 0;
sampleText.innerHTML = sentences[index]; 
var originText = document.querySelector("#origin-text p").innerHTML;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time)
{
    if(time<=9)
    {
        time="0"+time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML=currentTime;
    timer[3]++;

    timer[0]=Math.floor((timer[3]/100)/60);  //convert hundredth of a second int0 minutes
    timer[1]=Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2]=Math.floor(timer[3]-(timer[1]*100)-(timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck()
{
    let textEntered=testArea.value;
    let originTextMatch=originText.substring(0,textEntered.length); //we want those number of characters of the origin text as we have entered in the text area to match both of these
    if(textEntered == originText) { //typing is complete
       clearInterval(interval); //to stop the timer
        testWrapper.style.borderColor = "#33ff33";
        let speed= Math.floor(4/(timer[1]/60));
        theResult.innerHTML="Speed in words per minute is " + speed;
        theIncorrect.innerHTML="Number of letters you typed incorrectly is " + errno;

    }
    else {
        if(textEntered == originTextMatch){ //if user is typing correctly
            testWrapper.style.borderColor=  "#65ccf3";
        }
        else {  //some error occurs while typing
            errno =errno +1;
            testWrapper.style.borderColor= "#e95d0f";
        }

    }
   
}

// Start the timer:
function start()
{
    let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning) //!timerRunning is checked so that timer does not run whenever text area becomes empty
    {
        timerRunning=true;
        interval= setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset(){
    clearInterval(interval);
    interval= null;
    timer= [0,0,0,0];
    timerRunning = false;
    
    testArea.value="";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    index++;
    if(index==sentences.length)
    index=0;
    sampleText.innerHTML = sentences[index];
    theResult.innerHTML="";
    theIncorrect.innerHTML="";
    originText=document.querySelector("#origin-text p").innerHTML;
    errno=0;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start, false);
testArea.addEventListener("keyup",spellCheck, false); //when you go up the key
resetButton.addEventListener("click",reset,false);