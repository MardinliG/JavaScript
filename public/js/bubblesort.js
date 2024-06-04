const arrayContainer = document.getElementById('array-container');
const successCard = document.getElementById('success-card');
const successMessage = document.getElementById('success-message');
let array = [];

function createRandomArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 20) + 1;
        array.push(value);
    }
    displayArray();
    successCard.classList.add('hidden'); // Hide success card when generating new array
}

function setCustomArray() {
    const input = document.getElementById('number-input').value;
    array = input.split(' ').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    displayArray();
    successCard.classList.add('hidden'); // Hide success card when setting custom array
}

function displayArray() {
    arrayContainer.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.innerText = array[i];
        arrayContainer.appendChild(bubble);
    }
}

async function bubbleSort() {
    const bubbles = document.getElementsByClassName('bubble');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bubbles[j].style.backgroundColor = 'red';
            bubbles[j + 1].style.backgroundColor = 'red';
            await sleep(500);
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bubbles[j].innerText = array[j];
                bubbles[j + 1].innerText = array[j + 1];
            }
            bubbles[j].style.backgroundColor = 'steelblue';
            bubbles[j + 1].style.backgroundColor = 'steelblue';
        }
        bubbles[array.length - i - 1].style.backgroundColor = 'green';
    }
    bubbles[0].style.backgroundColor = 'green';
    successMessage.innerText = ` ${array.join(' ')}`; // Show sorted array on success card
    successCard.classList.remove('hidden'); // Show success card when sorting is complete
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize with random numbers on page load
window.onload = () => createRandomArray(10);
