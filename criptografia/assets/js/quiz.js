document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-button');
    const retryButton = document.getElementById('retry-button');
    const resultsContainer = document.getElementById('results');
    const certificateContainer = document.getElementById('certificate');
    const questions = [
        {
            question: "Qual é o princípio básico da criptografia?",
            options: ["Divulgar informações", "Remover informações", "Ocultar informações", "Ignorar informações"],
            answer: 2
        },
        {
            question: "Qual é o deslocamento padrão da Cifra de César?",
            options: ["1 posição", "3 posições", "13 posições", "26 posições"],
            answer: 1
        },
        {
            question: "Como se escreve 'HELLO WORD' usando a cifra ROT13?",
            options: ["GUNVF PNEYN", "UVGGY NQBYS", "SNGRP WHAQV", "URYYB JBEYQ"],
            answer: 3
        },
        {
            question: "Na técnica Zenit Polar, como seria a palavra 'vestibular'?",
            options: ["viamomimit", "vosrabunit", "rosracunit", "coviabenit"],
            answer: 1
        },
        {
            question: "O que a cifra ROT13 faz com as letras do alfabeto?",
            options: ["Inverte as letras", "Duplica as letras", "Remove as letras", "Desloca 13 posições"],
            answer: 3
        },
        {
            question: "Qual é o objetivo da criptografia?",
            options: ["Proteger dados", "Modificar dados", "Excluir dados", "Ignorar dados"],
            answer: 0
        },
        {
            question: "Qual o resultado da palavra 'JUNDIAI' usando a cifra de César com deslocamento 3?",
            type: "text",
            answer: "MXQGLDL"
        },
        {
            question: "Como se escreve 'INFORMATICA' usando a técnica Zenit Polar?",
            type: "text",
            answer: "ALFETMIRACI"
        },
        {
            question: "Que tipo de cifra é o ROT13?",
            options: ["Assimétrica", "Pública", "Privada", "Simétrica"],
            answer: 3
        },
        {
            question: "Qual técnica de criptografia usa a substituição de letras com o alfabeto inverso?",
            options: ["Zenit Polar", "Cifra de César", "ROT13", "Criptografia Simétrica"],
            answer: 0
        }
    ];

    let timeLeft = 180;
    let score = 0;
    let quizSubmitted = false; // Variável para rastrear o envio do quiz
    let timerInterval; // Timer global para reiniciar no retry

    // Timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            document.title = `Tempo Restante: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                displayRetryButton();
            }
        }, 1000);
    }

    // Render Questions
    function renderQuiz() {
        quizContainer.innerHTML = ''; // Limpa as perguntas para tentar novamente
        questions.forEach((q, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question-box', 'left-align'); // Adiciona a classe da caixinha e a classe de alinhamento
            questionElement.innerHTML = `<h4>${index + 1}. ${q.question}</h4>`; // Mudou para <h4>
            if (q.type === "text") {
                questionElement.innerHTML += `<input type="text" id="answer${index}" placeholder="Sua resposta...">`;
            } else {
                q.options.forEach((option, i) => {
                    questionElement.innerHTML += `<label><input type="radio" name="question${index}" value="${i}"> ${option}</label><br>`;
                });
            }
            quizContainer.appendChild(questionElement);
        });
    }

    // Display Retry Button
    function displayRetryButton() {
        submitButton.style.display = "none";
        retryButton.style.display = "inline-block";
        resultsContainer.textContent = "Tempo esgotado!";
    }

    // Função para submeter o quiz
    function submitQuiz() {
        if (quizSubmitted) return; // Impede múltiplos envios

        quizSubmitted = true; // Marca o quiz como enviado
        submitButton.disabled = true; // Desativa o botão
        submitButton.style.display = 'none'; // Oculta o botão de envio

        clearInterval(timerInterval); // Para o temporizador, se houver

        score = 0; // Reinicia o score para cada tentativa

        questions.forEach((q, index) => {
            const userAnswer = q.type === "text"
                ? document.getElementById(`answer${index}`).value.toUpperCase()
                : document.querySelector(`input[name="question${index}"]:checked`)?.value;
            if (userAnswer == q.answer) {
                score++;
            }
        });

        showResults(); // Exibe os resultados
    }

    // Função para mostrar os resultados
    function showResults() {
        resultsContainer.innerHTML = `Acertos: ${score} de ${questions.length}`;
        
        // Verifica se o usuário acertou 70% ou mais para exibir o certificado
        if (score / questions.length >= 0.7) {
            certificateContainer.style.display = "block"; // Exibe o botão de certificado
        } else {
            retryButton.style.display = "block"; // Exibe o botão de tentar novamente
        }
    }

    // Função para reiniciar o quiz
    function retryQuiz() {
        quizSubmitted = false; // Permite novo envio do quiz
        score = 0; // Reinicia o score
        timeLeft = 180; // Reinicia o tempo
        resultsContainer.textContent = ''; // Limpa os resultados anteriores
        certificateContainer.style.display = "none"; // Oculta o botão de certificado
        submitButton.style.display = "inline-block"; // Mostra o botão de envio novamente
        submitButton.disabled = false; // Reativa o botão de envio
        retryButton.style.display = "none"; // Oculta o botão de tentar novamente

        renderQuiz(); // Função para recriar o quiz
        startTimer(); // Inicia o timer novamente
    }

    // Event Listeners
    submitButton.addEventListener('click', submitQuiz);
    retryButton.addEventListener('click', retryQuiz);

    // Initialize Quiz
    renderQuiz();
    startTimer();
});
