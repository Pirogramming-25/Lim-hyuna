window.onload = function() {

    let pickNumbers = [];
    let chance = 9;
    let resultTextList = [];

    const inputFields = document.querySelectorAll('.input-field');
    const attemptsDisplay = document.getElementById('attempts');
    const resultsDisplay = document.getElementById('results');
    const resultImg = document.getElementById('game-result-img');
    const submitButton = document.querySelector('.submit-button');

    function updateUI() {
        if (attemptsDisplay) attemptsDisplay.innerText = chance;
        
        if (resultsDisplay) {
            resultsDisplay.innerText = resultTextList.join("\n"); 
        }
    }

    function gameStart() {
        chance = 9;
        pickNumbers = [];
        resultTextList = [];
        while (pickNumbers.length < 3) {
            const randomNumber = Math.floor(Math.random() * 10);
            if (pickNumbers.includes(randomNumber) === false) {
                pickNumbers.push(randomNumber);
            }
        }

        if (resultImg) {
            resultImg.src = "";
            resultImg.style.display = "none";
        }
        if (submitButton) submitButton.disabled = false;
        inputFields.forEach(input => input.value = "");
        if (inputFields[0]) inputFields[0].focus();

        updateUI();
    }

    window.check_numbers = function() {
        let userNumbers = [];
        let countBox = 0;
        
        inputFields.forEach(input => {
            const inputText = input.value;
            if (inputText !== "") {
                countBox++;
                userNumbers.push(Number(inputText));
            }
        });
        if (countBox !== 3) {
            inputFields.forEach(input => input.value = "");
            if (inputFields[0]) inputFields[0].focus();
            return; 
        }        
        chance--; 

        let strickes = 0;
        let balls = 0;

        for (let i = 0; i < 3; i++) {
            if (userNumbers[i] === pickNumbers[i]) {
                strickes++;
            } else if (pickNumbers.includes(userNumbers[i])) {
                balls++;
            }
        }

        let resultText = "";
        if (strickes === 0 && balls === 0) {
            resultText = "O";
        } else {
            resultText = `${userNumbers}  :  ${strickes} S ${balls} B`;
        }
        resultTextList.push(resultText);
        updateUI();
        if (strickes === 3) {
            if (resultImg) {
                resultImg.src = "success.png";
                resultImg.style.display = "block";
            }
            if (submitButton) submitButton.disabled = true;
        } else if (chance <= 0 ) {
            if (resultImg) {
                resultImg.src = "fail.png";
                resultImg.style.display = "block";
            }
            if (submitButton) submitButton.disabled = true;
        } else {
            inputFields.forEach(input => input.value = "");
            if (inputFields[0]) inputFields[0].focus();
        }
    }
    
    gameStart();
}