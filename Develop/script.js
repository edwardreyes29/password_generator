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

  // Set a character limit for each criteria so each are guaranteed to be met in the password
  var characterLimit = Math.floor(passwordLength / criteriaArray.length);

  // Create arrays to store characters for special characters
  var specialChars = [' ', '!', '\"', '#', '$', '%', '&','\'', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '\\', '^', '{', '|', '}', '~', '_', '`'];

  // Generate the password based on the given criteria
  var newPassword = ""; // to store the newly generated password
  var randomInt;
  var randomCharInt;
  var criteria;
  var char; // To store lowercase or uppercase generated letter
  
  while (newPassword.length < passwordLength) {
    randomInt = getRandomInt(criteriaArray.length);
    criteria = criteriaArray[randomInt].id;

    switch (criteria) {
      case 1:
        if (lowercaseCond.count < characterLimit) {
          randomCharInt = getRandomArbitrary(97,123); // Ascii codes for lower case letters
          char = String.fromCharCode(randomCharInt);
          newPassword += char;
          lowercaseCond.count++;
        }
        break;
      case 2: 
        if (uppercaseCond.count < characterLimit) {
          randomCharInt = getRandomArbitrary(65, 91); // Ascii codes for uppercase letters
          char = String.fromCharCode(randomCharInt);
          newPassword += char;
          uppercaseCond.count++;
        }
        break;
      case 3:
        if (numericCond.count < characterLimit) {
          randomCharInt = getRandomInt(10);
          newPassword += randomCharInt;
          numericCond.count++;
        }
        break;
      case 4:
        if (specialCond.count < characterLimit) {
          randomCharInt = getRandomInt(specialChars.length);
          newPassword += specialChars[randomCharInt];
          specialCond.count++;
        }
        break;
    } // end switch

    // if all character limits are reached, reset all to zero
    for (var i = 0, j = 0; i < criteriaArray.length; i++) {
      if (criteriaArray[i].count >= characterLimit) {
        j++;
      } 
      // reached end of array, if true, make all counts equal to zero
      if ((j+1) >= criteriaArray.length) {
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
