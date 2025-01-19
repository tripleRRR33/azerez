document.addEventListener('DOMContentLoaded', () => {
    fetch('questions.json') // Charger le fichier JSON
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;
            initializeQuiz(questions); // Appeler une fonction pour initialiser le quiz
        })
        .catch(error => console.error('Erreur de chargement des questions :', error));
});

function initializeQuiz(questions) {
    const quizContainer = document.getElementById('quiz');
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        if (index === 0) questionElement.classList.add('active'); // Activer la première question
        questionElement.setAttribute('data-answer', question.answer);
        questionElement.setAttribute('data-category', question.category);

        questionElement.innerHTML = `
            <div class="category-indicator">${question.category.toUpperCase()}</div>
            <h3>Question ${index + 1}:</h3>
            <p>${question.question}</p>
            <div class="options">
                ${question.options.map(option => `<div class="option">${option}</div>`).join('')}
            </div>
            <div class="feedback"></div>
        `;
        quizContainer.appendChild(questionElement);
    });

    // Ajouter les événements pour chaque option
    setupOptionListeners();
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
