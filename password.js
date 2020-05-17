function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createPassword(passwordLength, charactersToInclude) {
    // args: (
    //     passwordLength: integer
    //     charactersToInclude: list with possible items ["number", "lower", "upper", "special"]
    // )
    // uses random module to genereate a random password
    // returns: string of length password_length


    // possible characters
    const alphabetString = 'abcdefghijklmnopqrstuvwxyz';
    const lowerCase = alphabetString.split("");
    const upperCase =  alphabetString.toUpperCase().split('');
    const numberRange = [...Array(10).keys()].map(String);
    const specialCharacters = ['!', '@', '&', '$', '*'];

    // create character list
    characterMap = {
        'number': numberRange, 
        'lower': lowerCase, 
        'upper': upperCase, 
        'special': specialCharacters
    };
    
    let characterList = [];
    charactersToInclude.forEach(charList => {
        characterList = characterList.concat(characterMap[charList]);
    });

    // generate password
    let password = '';
    for (i=0; i < passwordLength; i++) {
        // create randomized index to reference characterList
        const randomIndex = getRandomInt(characterList.length);

        // add random char from characterList to password
        const randomCharacter = characterList[randomIndex];
        password += randomCharacter;
    }

    return password;

};

function generatePassword() {
    // args: ( none )
    // gets value inputs from html and outputs password to html
    // returns: none
    
    // see which items are checked
    const listNumberChecked = document.getElementById("list-number").checked;
    const listLowerChecked = document.getElementById("list-lower").checked;
    const listUpperChecked = document.getElementById("list-upper").checked;
    const listSpecialChecked = document.getElementById("list-special").checked;

    // make array with lists to by included
    let listsToInclude = []
    if ( listNumberChecked ) listsToInclude.push('number');
    if ( listLowerChecked ) listsToInclude.push('lower');
    if ( listUpperChecked ) listsToInclude.push('upper');
    if ( listSpecialChecked ) listsToInclude.push('special');

    // record slider value for password length
    const sliderValue = Number(sliderValueHtml.value);

    // create and set password
    password = createPassword(sliderValue, listsToInclude);
    document.getElementById("password").innerHTML = password
};

function copyToClipboard(element) {
    var range, selection, worked;

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    
    try {
      document.execCommand('copy');
      document.getElementById("copied-password").innerHTML = "Password copied to clipboard!";
    }
    catch (err) {
        console.log(err)
        document.getElementById("copied-password").innerHTML = "Unable to copy password.";
    }
}

// update slider output
let sliderValueHtml = document.getElementById("slider");

let sliderOutputHtml = document.getElementById("sliderOutput");
sliderOutputHtml.innerHTML = sliderValueHtml.value;
sliderValueHtml.oninput = () => {
    sliderOutputHtml.innerHTML = sliderValueHtml.value;
}