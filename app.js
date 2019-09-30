const qwerty = document.getElementById("qwerty");
const ul = document.querySelector("#phrase ul");
const overlay = document.getElementById("overlay");
const startBtn = document.getElementsByClassName("btn__start")[0];
const resetBtn = document.getElementsByClassName("btn__reset")[0];
const title = document.querySelector(".title");
let missed = 0;
let classLetter = 0;
let classShow = 0;
let hearts = document.querySelectorAll(".tries")
let hearPosition = 0;


const names = ["William", "Betty", "Jade", "Joseph", "Jasmine", "Jessie"];







// 1).
// Generates a random number-index and retrieves that item out of the names array
// and splits it into a new array of its individual characters
function getRandomPhraseAsArray(arr) {
    let randomIndex = Math.floor(Math.random() * ((arr.length - 1) - 0 + 1));
    const randomPhrase = arr[randomIndex];
    const characterArray = randomPhrase.split("");
    return characterArray;
};





// 2).
// Loops thru the character array returned by getRandomPhraseAsArrays function
// and creates a list item for each and adds it to the existing DOM UL. Also, 
// checks that each list item isn't a space and adds the class of letter for letter
// slot styles
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement("li");
        li.textContent = arr[i];

        if (arr[i] !== " ") {
            li.classList.add("letter");
            classLetter += 1;
        }
        ul.appendChild(li);
    };
};






// 3).
// Goes thru an array of characters and returns an array of all instances of the same character
// as specified by the click, as well as that of matching the letters inside 
// of the li's, and inside of the actual word
function getAllOccurences(array, valueToFind) {
    let values = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i].textContent.toLowerCase() === valueToFind.textContent) {
            values.push(array[i])
        } 
    }

    // if the players guesses a wrong character, then the values array will obviously have nothing
    // this will cause a heart(life) to decrease by 1
    if (values.length === 0) {
        missed += 1;
        let lives = document.querySelectorAll(".tries");
        lives[hearPosition].style.display = "none";
        hearPosition++
    }

    return values;
}




// 4).
// Loops thru the array of same characters returned by getAllOccurences function
// and adds the class of "show", to show the letters in each letter slot
function showLetter(arrayOfCorrectLetters) {
    for (let i = 0; i < arrayOfCorrectLetters.length; i++) {
        arrayOfCorrectLetters[i].classList.add("show");
        classShow += 1;
    }
}





function checkStatus() {
    if (missed === 5) {
        overlay.style.display = "";
        overlay.classList.add("lose")
        title.textContent = "Game Over!!!"
        resetBtn.style.display = "block";
        startBtn.style.display = "none";
    } else if (classShow === classLetter) {
        overlay.style.display = "";
        overlay.classList.add("win");
        title.textContent = "You Won!!!"
        resetBtn.style.display = "block";
        startBtn.style.display = "none";
    }
}





qwerty.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        e.target.classList.add("chosen")
        e.target.disabled = true;
        let lettersFound = getAllOccurences(ul.children, e.target);
        showLetter(lettersFound)
        checkStatus();
    }
});




startBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

resetBtn.addEventListener("click", (e) => {
    overlay.style.display = "none";
    let keyButtons = qwerty.querySelectorAll("button");
    for (let i = 0; i < keyButtons.length; i++) {
        keyButtons[i].disabled = false;
        keyButtons[i].classList.remove("chosen");
        missed = 0;
        classLetter = 0;
        classShow = 0;
        hearPosition = 0;
        for (let i = 0; i < hearts.length; i++) {
            hearts[i].style.display = "";
        }
    }
 
})



const phraseArray = getRandomPhraseAsArray(names)
addPhraseToDisplay(phraseArray)



