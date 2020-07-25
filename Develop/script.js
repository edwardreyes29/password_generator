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
  var passwordLength = 0; // Password Length
  var input;

  do {
    // Ask user to enter password length
    input = prompt("Password length must be at least 8 characters\nand no more than 128 characters\n\nEnter the length of the password:")
    passwordLength = Number(input);
  } while ((passwordLength < 8 || passwordLength > 128) && input !== null); // if null, user pressed cancel
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
