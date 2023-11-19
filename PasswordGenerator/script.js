const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~",
		spaces: " ",
}

const complexity = document.querySelector('.length-slider');
const complexityIndicator = document.querySelector('#complexity-indicator');
const lengthNumber = document.querySelector('.pass-length-number');
const generateBtn = document.querySelector('.generate');
const inputField = document.querySelector('.input-field > input');
const copyBtn = document.querySelector('.btn-copy');
const copyIcon = document.querySelector('.btn-copy > i');
const options = document.querySelectorAll('.option > input');

function updateComplexityIndicator() {
	const len = inputField.value.length;
	complexityIndicator.classList = "";
	if (len < 7) {
		complexityIndicator.classList.add("complexity-weak");
	}
	else if (len >= 7 && len < 15) {
		complexityIndicator.classList.add("complexity-medium");
	}
	else if (len >= 15) {
		complexityIndicator.classList.add("complexity-strong");
	}

	// calculate width of the complexity bar
	const perc = len > 30 ? 100 : 100 * len / 30;
	complexityIndicator.style.width = perc + '%';
}

function generatePassword() {
	let s = "";
	let password = "";
	let excludeDuplicate = false;

	options.forEach(option => {
		if (option.checked) {
			if(option.id !== 'exclude-dublicate') {
				s += characters[option.id];
			}
			else {
				excludeDuplicate = true;
			}
		}
	});

	let i = 0;
	while (i < complexity.value) {
		let ch = s[Math.floor(Math.random() * s.length)];
		if (excludeDuplicate && password.includes(ch)) continue;
		password += ch;
		i++;
	}

	return password;
}

complexity.addEventListener('input', () => {
	lengthNumber.textContent = complexity.value;
});

// generate button
generateBtn.addEventListener('click', () => {
	const password = generatePassword();
	inputField.value = password;
	updateComplexityIndicator();
});

// copy to clipboard
copyBtn.addEventListener('click', () => {
	navigator.clipboard.writeText(inputField.value);
	copyIcon.innerText = "check";
	copyIcon.style.color = "green";
	setTimeout(() => {
		copyIcon.innerText = "content_copy";
		copyIcon.style.color = "";
	}, 2000);
});

// on edit field
inputField.addEventListener('input', () => {
	updateComplexityIndicator();
});

window.onload = () => {
};