document.addEventListener('DOMContentLoaded', () => {
    fetch('questions.json') // Charger le fichier JSON
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;
            initializeQuiz(questions); // Appeler une fonction pour initialiser le quiz
        })
        .catch(error => console.error('Erreur de chargement des questions :', error));
});

let currentQuestionIndex = 0;

function initializeQuiz(questions) {
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.setAttribute('data-answer', questions[currentQuestionIndex].answer);
    questionElement.setAttribute('data-category', questions[currentQuestionIndex].category);

    questionElement.innerHTML = `
        <div class="category-indicator">${questions[currentQuestionIndex].category.toUpperCase()}</div>
        <h3>Question ${currentQuestionIndex + 1}:</h3>
        <p>${questions[currentQuestionIndex].question}</p>
        <div class="options">
            ${questions[currentQuestionIndex].options.map(option => `<div class="option">${option}</div>`).join('')}
        </div>
        <div class="feedback"></div>
        <button id="prevBtn" onclick="showPrevQuestion()">Précédent</button>
        <button id="nextBtn" onclick="showNextQuestion()">Suivant</button>
    `;
    quizContainer.appendChild(questionElement);

    // Ajouter les événements pour chaque option
    setupOptionListeners();
}

function showNextQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Nettoyer le contenu actuel
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length; // Passer à la question suivante
    initializeQuiz(questions);
}

function showPrevQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Nettoyer le contenu actuel
    currentQuestionIndex = (currentQuestionIndex - 1 + questions.length) % questions.length; // Retourner à la question précédente
    initializeQuiz(questions);
}

function setupOptionListeners() {
    const options = document.querySelectorAll('.option');
    const progressBar = document.querySelector('.progress');

    options.forEach(option => {
        option.addEventListener('click', () => {
            const correctAnswer = option.parentElement.parentElement.getAttribute('data-answer');
            const feedback = option.parentElement.nextElementSibling;

            if (option.textContent.trim() === correctAnswer) {
                option.style.backgroundColor = '#4CAF50'; // Bonne réponse
                feedback.textContent = 'Bonne réponse !';
                feedback.style.color = '#4CAF50';
                updateProgressBar(progressBar, 30); // Exemple : mise à jour à 30%
            } else {
                option.style.backgroundColor = '#F44336'; // Mauvaise réponse
                feedback.textContent = 'Mauvaise réponse !';
                feedback.style.color = '#F44336';
            }
        });
    });

    function updateProgressBar(bar, percentage) {
        bar.style.width = `${percentage}%`;
    }
}
