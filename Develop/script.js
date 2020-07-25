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
  var selectedCriteria = Number(prompt("[1] Choose password length\n" +
  "[2] Choose lowercase, uppercase, numeric, and/or special characters\n" +
  "Enter [1] or [2]"));
  console.log(selectedCriteria);
  console.log(typeof selectedCriteria)

  if (selectedCriteria === 1) {
    console.log("selectedCriteria is a number")
  } else if (isNaN(selectedCriteria)) {
    console.log("selectedCriteria is not a number")
  }
  
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
