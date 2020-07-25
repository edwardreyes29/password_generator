// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  console.log("In generate password")
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
  
  var includeLowerCase = false;  
  var includeUpperCase = false;
  var includeNumeric = false;
  var includeSpecial = false;

  // var res = String.fromCharCode(65);
  // console.log(res);

  do {
    // Notify the user to choose at least one criteria
    alert("\u2022 lowercase\n" + 
    "\u2022 uppercase\n" + 
    "\u2022 numeric\n" +
    "\u2022 special characters\n\n" +
    "You must choose at least one criteria to include into your password")
    // Ask user if they want password to include lowercase characters
    includeLowerCase = confirm("Do you want your password to include lowercase characters?");
    includeUpperCase = confirm("Do you want your password to include uppercase characters?");
    includeNumeric = confirm("Do you want your password to include numeric characters?");
    includeSpecial= confirm("Do you want your password to include special characters?");
    
  } while(!(includeLowerCase || includeUpperCase || includeNumeric || includeSpecial)); // if all are still false, loop again

  // Create arrays to store characters for each criteria:
  var specialChars = ['!', '\"', '#', '$', '%', '&','\'', '(', ')', '*', '+'];
  
  

} // end generatePassword()

// include random functions
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
