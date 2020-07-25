// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Generate a password
function generatePassword() {

  var input = ""; // user's input
  var passwordLength = 0; // Password Length

  do {
    // Ask user to enter password length
    input = prompt("Password length must be at least 8 characters\nand no more than 128 characters\n\nEnter the length of the password:")
    // if user enters cancel, exit function
    if (input === null) {
      console.log("exit function");
      return;
    }
    passwordLength = Number(input); // convert input into a number

  } while ((passwordLength < 8 || passwordLength > 128)); // if null, user clicked cancel

  // create objects for each criteria
  var lowercaseCond = {name: "lower", include: false, count: 0, id: 1};
  var uppercaseCond = {name: "upper", include: false, count: 0, id: 2};
  var numericCond = {name: "numeric", include: false, count: 0, id: 3};
  var specialCond = {name: "special", include: false, count: 0, id: 4};

  do {
    // Notify the user to choose at least one criteria
    alert("\u2022 lowercase\n" + 
    "\u2022 uppercase\n" + 
    "\u2022 numeric\n" +
    "\u2022 special characters\n\n" +
    "You must choose at least one criteria to include into your password")
    // Ask user if they want password to include lowercase characters
    lowercaseCond.include = confirm("Do you want your password to include lowercase characters?");
    uppercaseCond.include = confirm("Do you want your password to include uppercase characters?");
    numericCond.include = confirm("Do you want your password to include numeric characters?");
    specialCond.include = confirm("Do you want your password to include special characters?");
    
  } while(!(lowercaseCond.include || uppercaseCond.include || numericCond.include  || specialCond.include)); // if all are still false, loop again

  // Array to hold criterias that were given the value of true.
  criteriaArray = [];
  // include criteria numbers that are selected true into criteriaArray
  if (lowercaseCond.include) {
    criteriaArray.push(lowercaseCond);
  } 
  if (uppercaseCond.include) {
    criteriaArray.push(uppercaseCond);
  } 
  if (numericCond.include) {
    criteriaArray.push(numericCond);
  } 
  if (specialCond.include) {
    criteriaArray.push(specialCond);
  } 

  
  /*
    Set a character limit for each criteria so each are guaranteed to be met in the new password string.
    For example, if password length is set to 9 and 3/4 criteria's were selected,
    then the character limit for each character will be = 9/3 = 3. Which means that characters in a each criteria can appear
    in the password at most 3 times. 

    This becomes tricky when the password length isn't perfectly divisible by the number of selected criterias.
    Let's assume that the password length is 9 and 4/4 criterias were selected, then the
    character limit for each criteria will be 9/4 = 2. But that would mean that only 8 slots will be filled out of 9,
    because each the number of characters for each criteria can be at most 2. (2+2+2+2 = 8)

    The solution to this problem is a condition where if all the counts in each criteria object 
    (that are stored inside the criteriaArray) are all equal to or greater than the character limit will
    reset all the counts in each criteria object to 0. So now the program can continue randomly selecting new
    characters to add to the pass word. In the second example above, the last character can be from any one
    of the criteria's whose character limit have all ben rest to 0.
  
  */
  var characterLimit = Math.floor(passwordLength / criteriaArray.length);

  // Create arrays to store characters for special characters
  var specialChars = [' ', '!', '\"', '#', '$', '%', '&','\'', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '\\', '^', '{', '|', '}', '~', '_', '`'];

  // Generate the password based on the given criteria
  var newPassword = ""; // to store the newly generated password
  var randomInt; // To store a random int
  var randomCharInt; // To store a random int representing the ASCII code of a character
  var criteria; // To store the numerical id of the selected criteria
  var char; // To store lowercase or uppercase generated letter
  
  while (newPassword.length < passwordLength) {
    randomInt = getRandomInt(criteriaArray.length);
    criteria = criteriaArray[randomInt].id;

    // randomly select a criteria
    switch (criteria) {
      case 1:
        if (lowercaseCond.count < characterLimit) {
          // Randomly generate a lowercase letter
          randomCharInt = getRandomArbitrary(97,123); // Ascii codes for lower case letters
          char = String.fromCharCode(randomCharInt);
          // add new character to password string
          newPassword += char;
          lowercaseCond.count++;
        }
        break;
      case 2: 
        if (uppercaseCond.count < characterLimit) {
          // Randomly generate an uppercase letter
          randomCharInt = getRandomArbitrary(65, 91); // Ascii codes for uppercase letters
          char = String.fromCharCode(randomCharInt);
          // add new character to password string
          newPassword += char;
          uppercaseCond.count++;
        }
        break;
      case 3:
        if (numericCond.count < characterLimit) {
          // randomly generate a random number from 0 - 9
          randomCharInt = getRandomInt(10); 
          // add new character to password string
          newPassword += randomCharInt;
          numericCond.count++;
        }
        break;
      case 4:
        if (specialCond.count < characterLimit) {
          // randomly generate a random special character from specialChars array
          randomCharInt = getRandomInt(specialChars.length);
          // add new character to password string
          newPassword += specialChars[randomCharInt];
          specialCond.count++;
        }
        break;
    } // end switch

    // if all character limits are reached, reset all to zero
    for (var i = 0, j = 0; i < criteriaArray.length; i++) {
      if (criteriaArray[i].count >= characterLimit) {
        // j represents all the criterias that have reached the character limit
        j++;
      } 
      // If the number of criteria's that have maxed character limit is the same as
      // the number of elements in the criteriaArray, reset all counts to 0.
      if (j === criteriaArray.length) {
        for (var k = 0; k < criteriaArray.length; k++) {
          criteriaArray[k].count = 0;
        }
      }
    }
    
  } // end while

  // To show new password and prove that it meets required length
  console.log("New password: " + newPassword); 
  console.log("Password length: " + newPassword.length);
  return newPassword;

} // end generatePassword()

// include random functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
