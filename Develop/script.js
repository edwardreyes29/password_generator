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

  // Create arrays to store characters for special characters
  var specialChars = ['!', '\"', '#', '$', '%', '&','\'', '(', ')', '*', '+', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '\\', '^', '{', '|', '}', '~', ' '];
  // var numbers = [1,2,3,4,5,6,7,8,8,9];
  // var lowercase = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','']

  criteriaArray = [];
  // include criteria numbers that are selected true into criteriaArray
  if (includeLowerCase) {
    criteriaArray.push(1);
  } 
  if (includeUpperCase) {
    criteriaArray.push(2);
  } 
  if (includeNumeric) {
    criteriaArray.push(3);
  } 
  if (includeSpecial) {
    criteriaArray.push(4);
  } 
  console.log(criteriaArray);

  // var res = String.fromCharCode(65);
  // console.log(res);

  // Include count for each criteria to ensure that each one is met in password
  var lowercaseCount = 0;
  var uppercaseCount = 0;
  var numericCount = 0;
  var specialCount = 0;

  // Set a character limit for each criteria so each are guaranteed to be met in the password
  var characterLimit = Math.floor(passwordLength / criteriaArray.length); 
  console.log(characterLimit);

  // Generate the password based on the given criteria
  var newPassword = ""; // to store the newly generated password
  while (newPassword.length < passwordLength) {
    var randomInt = getRandomInt(criteriaArray.length);

    var criteria = criteriaArray[randomInt];
    // console.log(criteria);
    console.log("generating...");
    switch (criteria) {
      case 1:
        if (lowercaseCount < characterLimit) {
          // console.log("case 1");
          newPassword += 1;
          lowercaseCount++;
        }
        break;
      case 2: 
        if (uppercaseCount < characterLimit) {
          // console.log("case 2");
          newPassword += 2;
          uppercaseCount++;
        }
        break;
      case 3:
        if (numericCount < characterLimit) {
          // console.log("case 3");
          newPassword += 3;
          numericCount++;
        }
        break;
      case 4:
        if (specialCount < characterLimit) {
          // console.log("case 4");
          newPassword += 4;
          specialCount++;
        }
        break;
    } // end switch

    // if all character limits are reached, reset all to zero
    if (lowercaseCount === uppercaseCount && uppercaseCount === numericCount && numericCount === specialCount) {
      console.log("lower limit: " + lowercaseCount);
      console.log("upper limit: " + uppercaseCount);
      console.log("numeric limit: " + numericCount);
      console.log("special limit: " + specialCount);
      lowercaseCount = 0;
      uppercaseCount = 0;
      numericCount = 0;
      specialCount = 0;
    }
    
  } // end while

  console.log(newPassword);
  console.log(newPassword.length);

  console.log("end program")
  
  

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
