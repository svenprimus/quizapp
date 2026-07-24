let current_question = 0;
let score = 0;
let waitForNext = false;

const AUDIO_SUCCESS = new Audio('./assets/sound/success.mp3');
const AUDIO_FAILURE = new Audio('./assets/sound/failure.mp3');

function init() {
    renderCardBody();
    renderProgress();
}

function renderTotal() {
    document.getElementById('total').innerHTML = questions.length;
    document.getElementById('total-answers').innerHTML = questions.length;
}

function renderCurrent() {
    document.getElementById('current').innerHTML = current_question + 1;
}

function renderProgress() {
    renderTotal();
    renderCurrent();
    renderProgressBar();
}

function renderProgressBar() {
    const progRef = document.getElementById('progress-bar');
    const progress = Math.round((100 * (current_question + 1)) / questions.length);
    progRef.innerHTML = /*html*/ `
        ${progress} %
    `;
    progRef.style = `width: ${progress}%`;
}

function renderQuestion() {
    document.getElementById('question').innerHTML = questions[current_question].question;

    for (let i = 0; i < questions[current_question].options.length; i++) {
        document.getElementById('option_' + i).innerHTML = questions[current_question].options[i];
        document.getElementById('option_' + i).parentNode.classList.remove('bg-success');
        document.getElementById('option_' + i).parentNode.classList.remove('bg-failure');
        document.getElementById('option_' + i).parentNode.classList.add('quiz-answer-card');
    }
}

function renderCardBody() {
    const cardRef = document.getElementById('question-body');
    cardRef.innerHTML = getQuestion(current_question);
    for (let i = 0; i < questions[current_question].options.length; i++) {
        cardRef.innerHTML += getOption(current_question, i);
    }
    cardRef.innerHTML += getCardFooter();
}

function answer(selection) {
    if (waitForNext === false) {
        if (questions[current_question].answer === questions[current_question].options[selection]) {
            document.getElementById('option_wrapper_' + selection).classList.add('bg-success');
            score++;
            AUDIO_SUCCESS.play();
        } else {
            document.getElementById('option_wrapper_' + selection).classList.add('bg-failure');
            const correcIndex = questions[current_question].options.findIndex(
                (element) => questions[current_question].answer === element
            );
            document.getElementById('option_wrapper_' + correcIndex).classList.add('bg-success');
            AUDIO_FAILURE.play();
        }

        for (let i = 0; i < questions[current_question].options.length; i++) {
            document.getElementById('option_wrapper_' + i).classList.remove('quiz-answer-card');
        }

        document.getElementById('button-next').disabled = false;
        waitForNext = true;
    }
}

function nextQuestion() {
    current_question++;
    waitForNext = false;
    if (current_question >= questions.length) {
        document.getElementById('endscreen').classList.remove('d-none');
        document.getElementById('question-body').classList.add('d-none');
        document.getElementById('score').innerHTML = score;
        document.getElementById('header-img').src = './assets/img/trophy.png';
    } else {
        renderQuestion();
        renderProgress();
        document.getElementById('button-next').disabled = true;
    }
}

function playAgain() {
    current_question = 0;
    score = 0;
    document.getElementById('endscreen').classList.add('d-none');
    document.getElementById('question-body').classList.remove('d-none');
    document.getElementById('header-img').src = './assets/img/quiz-bg.jpg';

    init();
}
