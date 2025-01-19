// Exemple de logique pour gérer les options et la progression

document.addEventListener('DOMContentLoaded', () => {
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
});
