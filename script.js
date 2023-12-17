

// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

function shuffle(arr) {
  // Loop through array starting at the last index
  for (let i = arr.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indexes i and j
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// Function to prompt user for password options
function getPasswordOptions() {
  const passwordOptions = new Map();
  const USER_CHOICE_YES = "yes";
  const USER_CHOICE_NO = "no";
  const DEFAULT_LENGTH = 8;
  //user chooses length of password from 8 to 128
  let passLength = parseInt(prompt("Choose how may characters long between 8 and 128 do you want your password to be?\n"));
  if (passLength >= 8 && passLength <= 128) {
    passwordOptions.set("passwordLength", passLength)
  } else {
    alert(`Wrong input! You have typed: ${passLength}`);
    alert(`The number of characters will be set at ${DEFAULT_LENGTH} by default!`);
    passwordOptions.set("passwordLength", DEFAULT_LENGTH)
  }
  console.log(`Number of characters is set to ${passwordOptions.get("passwordLength")}`);

  //user choses whether wants UPPER case or not
  let useUpperLetters = prompt(`Would you like UPPER case letters to be used when generating your password? - Yes or No\n`);
  if (useUpperLetters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("upperLettersUsed", true);
    console.log(`upperLettersUsed set to ${passwordOptions.get("upperLettersUsed")}`)
  } else {
    passwordOptions.set("upperLettersUsed", false);
    console.log(`upperLettersUsed set to ${passwordOptions.get("upperLettersUsed")}`)
  }

  //user choses whether wants lower case or not
  let useLowerLetters = prompt(`Would you like lower case letters to be used when generating your password? - Y or N\n`);
  if (useLowerLetters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("lowerLettersUsed", true)
    console.log(`lowerLettersUsed case set to ${passwordOptions.get("lowerLettersUsed")}`)
  } else {
    passwordOptions.set("lowerLettersUsed", false)
    console.log(`lowerLettersUsed case set to ${passwordOptions.get("lowerLettersUsed")}`)
  }

  //user choses whether wants special characters or not
  let useSpecialCharacters = prompt(`Would you like special characters to be used when generating your password? - Y or N\n`);
  if (useSpecialCharacters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("specialCharactersUsed", true)
    console.log(`specialCharactersUsed set to ${passwordOptions.get("specialCharactersUsed")}`)
  } else {
    passwordOptions.set("specialCharactersUsed", false)
    console.log(`specialCharactersUsed set to ${passwordOptions.get("specialCharactersUsed")}`)
  }
  //user choses whether wants NUMERICAL characters or not
  let useNumericCharacters = prompt(`Would you like numeric characters to be used when generating your password? - Y or N\n`);
  if (useSpecialCharacters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("numericCharactersUsed", true)
    console.log(`numericCharactersUsed set to ${passwordOptions.get("numericCharactersUsed")}`)
  } else {
    passwordOptions.set("numericCharactersUsed", false)
    console.log(`numericCharactersUsed set to ${passwordOptions.get("numericCharactersUsed")}`)
  }

  return passwordOptions;

}

// Function for getting a random element from an array
function get_Random(passwordOptions) {
  // const passwordOptions = getPasswordOptions();
  let randomChars = [];
  let passwordLength = passwordOptions.get("passwordLength")
  let randomCharsStr = ""
  let randomCharsStrNoCommasCorrectLength = ""

  // user wants UPPER letters is true
  console.log(`wants UPPER: ${passwordOptions.get("upperLettersUsed")}`)
  if (passwordOptions.get("upperLettersUsed") == true ||
    passwordOptions.get("lowerLettersUsed") == true ||
    passwordOptions.get("specialCharactersUsed") == true ||
    passwordOptions.get("numericCharactersUsed") == true) {
    if (passwordOptions.get("upperLettersUsed")) {
      let upLetters = shuffle(upperCasedCharacters);
      // console.log(`upLetters: ${upLetters}`);
      randomChars.push(upLetters);
      console.log(`randomChars: ${randomChars}`);
      randomCharsStr = randomChars.join("");
      randomCharsStrNoCommas = randomCharsStr.split(",").join("")
      randomCharsStrNoCommasCorrectLength = randomCharsStrNoCommas.substring(0, passwordLength)

      console.log(`upper randomCharsStrNoCommasCorrectLength: ${randomCharsStrNoCommasCorrectLength}`)
    }
    if (passwordOptions.get("lowerLettersUsed")) {
      let lowerLetters = shuffle(lowerCasedCharacters);
      console.log(`lowerCasedCharacters: ${lowerLetters}`);
      randomChars.push(lowerLetters);
      randomChars = shuffle(randomChars);
      console.log(`lowerCasedCharacters randomChars: ${randomChars}`);
      randomCharsStr = randomChars.join("")
      randomCharsStrNoCommas = randomCharsStr.split(",").join("")
      randomCharsStrNoCommasCorrectLength = randomCharsStrNoCommas.substring(0, passwordLength)
      console.log(`lower randomCharsStrNoCommasCorrectLength: ${randomCharsStrNoCommasCorrectLength}`)

    }
    if (passwordOptions.get("specialCharactersUsed")) {
      let specialChars = shuffle(specialCharacters);
      console.log(`specialCharacters: ${specialChars}`)
      randomChars.push(specialChars);
      console.log(`randomChars: ${randomChars}`);
      randomCharsStr = randomChars.join("")
      randomCharsStrNoCommas = randomCharsStr.split(",").join("")
      randomCharsStrNoCommasCorrectLength = randomCharsStrNoCommas.substring(0, passwordLength)
      console.log(`special randomCharsStrNoCommasCorrectLength: ${randomCharsStrNoCommasCorrectLength}`)


    }
    if (passwordOptions.get("numericCharactersUsed")) {
      let numChars = shuffle(numericCharacters)
      console.log(`numericCharacters: ${numChars}`)
      randomChars.push(numChars);
      console.log(`randomChars: ${randomChars}`);
      randomCharsStr = randomChars.join('')
      randomCharsStrNoCommas = randomCharsStr.split(",").join("")
      randomCharsStrNoCommasCorrectLength = randomCharsStrNoCommas.substring(0, passwordLength)
      console.log(`numeric randomCharsStrNoCommasCorrectLength: ${randomCharsStrNoCommasCorrectLength}`)

    }
  } else {
    alert(`You have not chosen any type of characters for generating the password - CRAZY !`)
  }

  console.log(`randomCharsStrNoCommasCorrectLength: ${randomCharsStrNoCommasCorrectLength}`)
  console.log(`typeof(randomCharsStrNoCommasCorrectLength): ${typeof (randomCharsStrNoCommasCorrectLength)}`)
  return randomCharsStrNoCommasCorrectLength;
}

function correctLength(shuffledRandChars, correctLength) {
  let passwordCorrectLength = []
  console.log(`shuffledRandChars.length: ${shuffledRandChars.length}`)
  console.log(`correctLength: ${correctLength}`)
  if (shuffledRandChars.length > correctLength) {
    console.log(`correcting length of password from ${shuffledRandChars.length} to ${correctLength} `)
    passwordCorrectLength = shuffledRandChars.slice(0, correctLength + 1);
  }
  return passwordCorrectLength
}


// Function to generate password with user input
function generatePassword() {
  console.log(`inside generate password`)
  //calling prompts in getPasswordOptions
  const passwordOptions = getPasswordOptions();
  const randomChars = get_Random(passwordOptions)
  let len = passwordOptions.get("passwordLength");
  // Fisher-Yates Sorting Algorithm

  const shuffledRandChars = shuffle(randomChars);
  console.log(`randomChars: ${randomChars}`)

  console.log(`shuffledRandChars: ${shuffledRandChars}`)
  console.log(`shuffledRandChars.length: ${shuffledRandChars.length}`)
  console.log(`len: ${len}`)
  let passwordCorrectLength = correctLength(shuffledRandChars, len)

  // console.log(`passwordCorrectLength: ${shuffledRandChars}`)
  return shuffledRandChars;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

/*
Generate a password when the button is clicked
Present a series of prompts for password criteria
!Length of password
At least 8 characters but no more than 128.
Character types
!Lowercase
!Uppercase
!Numeric
!Special characters ($@%&*, etc)
!Code should validate for each input and at least one character type should be selected
Once prompts are answered then the password should be generated and 
displayed in an alert or written to the page
*/



