

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
  } else {
    passwordOptions.set("upperLettersUsed", false);
  }

  //user choses whether wants lower case or not
  let useLowerLetters = prompt(`Would you like lower case letters to be used when generating your password? - Yes or No\n`);
  if (useLowerLetters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("lowerLettersUsed", true)
  } else {
    passwordOptions.set("lowerLettersUsed", false)

  }

  //user choses whether wants special characters or not
  let useSpecialCharacters = prompt(`Would you like special characters to be used when generating your password? - Yes or No\n`);
  if (useSpecialCharacters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("specialCharactersUsed", true)
  } else {
    passwordOptions.set("specialCharactersUsed", false)
  }
  //user choses whether wants NUMERICAL characters or not
  let useNumericCharacters = prompt(`Would you like numeric characters to be used when generating your password? - Yes or No\n`);
  if (useSpecialCharacters.toLowerCase() === USER_CHOICE_YES) {
    passwordOptions.set("numericCharactersUsed", true)
  } else {
    passwordOptions.set("numericCharactersUsed", false)
  }

  return passwordOptions;

}

//make string for password
function changeArrayToString(randomChars) {
  let randomCharsStr = randomChars.join('')
  randomCharsStrNoCommas = randomCharsStr.split(",").join("")
  return randomCharsStrNoCommas
}

// Function for getting a random element from an array
function get_Random(passwordOptions) {
  let randomChars = [];
  let passwordLength = passwordOptions.get("passwordLength")
  let randomCharsStrNoCommasCorrectLength = ""
  let optionsChosen = 0;
  let randomCharsUpper = []
  if (passwordOptions.get("upperLettersUsed")) {
    optionsChosen += 1;
    randomCharsUpper = shuffle(upperCasedCharacters);
    console.log(`randomCharsUpper: ${randomCharsUpper}`);

  }
  let randomCharsLower = []
  if (passwordOptions.get("lowerLettersUsed")) {
    optionsChosen += 1;
    randomCharsLower = shuffle(lowerCasedCharacters);
    console.log(`randomCharsLower: ${randomCharsLower}`);

  }
  let randomCharsSpecial = []
  if (passwordOptions.get("specialCharactersUsed")) {
    optionsChosen += 1;
    randomCharsSpecial = shuffle(specialCharacters);
    console.log(`randomCharsSpecial: ${randomCharsSpecial}`)
  }
  let randomCharsNumeric = []
  if (passwordOptions.get("numericCharactersUsed")) {
    optionsChosen += 1;
    randomCharsNumeric = shuffle(numericCharacters)
    console.log(`randomCharsNumeric: ${randomCharsNumeric}`)
  }

  if (optionsChosen === 0) {
    alert(`You have not chosen any type of characters for generating the password - CRAZY !`)
  } else {
    //how many chars for each chosen option
    let numCharsEachOption = passwordLength / optionsChosen

    let randomCharsUpperTruncated = correctLength(randomCharsUpper, numCharsEachOption)
    let randomCharsLowerTruncated = correctLength(randomCharsLower, numCharsEachOption)
    let randomCharsSpecialTruncated = correctLength(randomCharsSpecial, numCharsEachOption)
    let randomCharsNumericTruncated = correctLength(randomCharsNumeric, numCharsEachOption)

    randomChars.push(randomCharsUpperTruncated);
    randomChars.push(randomCharsLowerTruncated);
    randomChars.push(randomCharsSpecialTruncated);
    randomChars.push(randomCharsNumericTruncated);

    let randomCharsShuffled = shuffle(randomChars);
    let randomCharsStrNoCommas = changeArrayToString(randomCharsShuffled)
    //truncate string to user chosen password length
    randomCharsStrNoCommasCorrectLength = randomCharsStrNoCommas.substring(0, passwordLength)

    return randomCharsStrNoCommasCorrectLength;
  }

}




function correctLength(shuffledRandChars, correctLength) {
  let passwordCorrectLength = []
  passwordCorrectLength = shuffledRandChars.slice(0, correctLength);
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



