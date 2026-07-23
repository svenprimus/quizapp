let current_question = 0;
function init() {
    renderCardBody();
}

function renderTotal() {
    document.getElementById('total').innerHTML = questions.length;
}

function renderQuestion() {
    document.getElementById('question').innerHTML = questions[current_question].question;
    document.getElementById('option_1').innerHTML = questions[current_question].options[0];
    document.getElementById('option_2').innerHTML = questions[current_question].options[1];
    document.getElementById('option_3').innerHTML = questions[current_question].options[2];
    document.getElementById('option_4').innerHTML = questions[current_question].options[3];
}

function renderCardBody() {
    const cardRef = document.getElementById('card_body');
    cardRef.innerHTML = getQuestion(current_question);
    for (let i = 0; i < questions[current_question].options.length; i++) {
        cardRef.innerHTML += getOption(current_question, i);
    }
    cardRef.innerHTML += getCardFooter();
}

function answer(selection) {
    if (questions[current_question].answer === questions[current_question].options[selection]) {
        document.getElementById('option_' + selection).style.backgroundColor = "rgba(0, 255, 0, 0.5)";
    } else {
        document.getElementById('option_' + selection).style.backgroundColor = "rgba(255, 0, 0, 0.5)";
    }
}
