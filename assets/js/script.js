// Array of special characters to be included in password
const specialCharacters = ['@', '%', '+', '\\', '/', "'", '!', '#', '$', '^', '?', ':', ',', ')', '(', '}', '{', ']', '[', '~', '-', '_', '.'];

// Array of numeric characters to be included in password
const numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
const lowerCasedCharacters = 'abcdefghijklmnopqrstuvwxyz'.split('');

// Array of uppercase characters to be included in password
const upperCasedCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Function to prompt user for password options
function getPasswordOptions() {
    const length = document.getElementById("length").value;

    if (length < 8 || length > 128 || isNaN(length)) {
        alert("Please enter a valid number between 8 and 128 inclusive.");
        return null;
    }

    function getOptionValue(optionName) {
        const optionBtns = document.querySelectorAll(`input[name="${optionName}"]`);
        for (const btn of optionBtns) {
            if (btn.checked) {
                return document.querySelector(`label[for="${btn.id}"]`).innerHTML.trim() === "Yes";
            }
        }
        return false;
    }

    const options = {
        length: +length,
        specialChar: getOptionValue("special-char"),
        numChar: getOptionValue("numbers"),
        lowerChar: getOptionValue("lowercase"),
        upperChar: getOptionValue("uppercase")
    };

    if (!options.specialChar && !options.numChar && !options.lowerChar && !options.upperChar) {
        alert("Please select at least one character type and then click 'Generate Password' again.");
        return null;
    }

    return options;
}

// Function for getting a random element from an array
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to generate password with user input
function generatePassword() {
    const options = getPasswordOptions();
    if (!options) return "";

    let allCharacters = [];
    if (options.specialChar) allCharacters = allCharacters.concat(specialCharacters);
    if (options.numChar) allCharacters = allCharacters.concat(numericCharacters);
    if (options.lowerChar) allCharacters = allCharacters.concat(lowerCasedCharacters);
    if (options.upperChar) allCharacters = allCharacters.concat(upperCasedCharacters);

    return Array.from({ length: options.length }, () => getRandom(allCharacters)).join('');
}

// Write password to the #password input
function writePassword() {
    const password = generatePassword();
    document.querySelector('#password').value = password;
}

// Copy password to clipboard
function copyPassword() {
    const passwordText = document.querySelector('#password');
    passwordText.select();
    passwordText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    // Create the copy message element
    const copyMessage = document.createElement('p');
    copyMessage.id = 'copy-message';
    copyMessage.textContent = 'Generated password copied to clipboard!';
    copyMessage.style.color = 'green';

    // Append the message below the password input
    const passwordContainer = document.querySelector('#password-container');
    passwordContainer.appendChild(copyMessage);

    // Remove the message after 5 seconds
    setTimeout(() => {
        copyMessage.remove();
    }, 3000);
}

// Event listeners
document.querySelector('#generate').addEventListener('click', writePassword);
document.querySelector('#copy-icon').addEventListener('click', copyPassword);

// Update the year
document.getElementById("currentYear").textContent = `© VaultKey, Inc ${new Date().getFullYear()}`;
