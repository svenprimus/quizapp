function getQuestion(questionIndex) {
    return /*html*/ `
        <h5 id="question" class="card-title mb-3">${questions[questionIndex].question}</h5>
    `;
}

function getOption(questionIndex, optionIndex) {
    return /*html*/ `
        <div class="card quiz-answer-card mb-2">
            <div id="option_${optionIndex}" class="card-body" onclick="answer(${optionIndex})"
            >
                ${questions[questionIndex].options[optionIndex]}
            </div>
        </div>
    `;
}

function getCardFooter() {
    return /*html*/ `
        <div class="question-footer">
            <span> <b>1</b> von <b id="total">${questions.length}</b> Questions </span>
            <button type="button" class="btn btn-primary">Next Question</button>
        </div>
    `;
}
