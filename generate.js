const passWordScreen = document.querySelector('.passWordScreen')
const lengthSlider = document.querySelector(".password-indicator-box");
const options = document.querySelectorAll('.option input');
const copyIcon = document.querySelector('.input-box span');
const passwordInput = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.password-indicator');
const generateBtn = document.querySelector('.generate-btn');

const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '^!$%&|[](){}:;.,*+-@#<>~'
};

const generatePassword = () => {
    let staticPassword = "";
    let randomPassword = "";
    let excludeDuplicate = false;
    let passLength = lengthSlider.value;

    options.forEach((option) => {
        if (option.checked) {
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
                staticPassword += characters[option.id];
            } else if (option.id === 'spaces') {
                staticPassword += ' ';
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            if (!randomPassword.includes(randomChar) || randomChar === '') {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else {
            randomPassword += randomChar;
        }
    }

    passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? 'weak' : lengthSlider.value <= 16 ? 'medium' : 'strong';
    passIndicator.innerHTML = passIndicator.id
};

const updateSlider = () => {
    document.querySelector('.pass-length span').innerText = lengthSlider.value;
    updatePassIndicator();
};

const copyPassword = () => {
    if (passWordScreen.value !== "") {
        navigator.clipboard.writeText(passwordInput.value);
        passWordScreen.value = null;
        copyIcon.innerText = 'checked';
        copyIcon.style.color = 'white';
        copyIcon.style.backgroundColor = 'black';
        setTimeout(() => {
            copyIcon.innerText = 'Copy';
            copyIcon.style.color = 'white';
        }, 2000);

    }
};

copyIcon.addEventListener('click', copyPassword);
lengthSlider.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);
passIndicator.addEventListener('change', updatePassIndicator)
