const allQuestions = [
  {
    question: "Qual a atitude correta ao ser seguido por alguém estranho?",
    answers: [
      { text: "Ir para um lugar movimentado", correct: true },
      {
        text: "Ficar parado no local",
        correct: false,
        explanation:
          "Ficar parado facilita que a pessoa se aproxime. Ir para um local movimentado aumenta sua segurança.",
      },
    ],
  },
  {
    question: "O que você deve fazer ao encontrar um objeto suspeito?",
    answers: [
      { text: "Avisar as autoridades", correct: true },
      {
        text: "Tentar abrir para ver o que é",
        correct: false,
        explanation:
          "Abrir objetos suspeitos pode ser perigoso, pois podem conter substâncias nocivas ou explosivos.",
      },
    ],
  },
  {
    question: "Como garantir a segurança pessoal ao caminhar à noite?",
    answers: [
      { text: "Evitar ruas escuras e mal iluminadas", correct: true },
      {
        text: "Andar com o celular na mão",
        correct: false,
        explanation:
          "Andar distraído com o celular pode tornar você um alvo fácil. Mantenha-se atento ao ambiente.",
      },
    ],
  },
  {
    question: "Qual é a melhor maneira de se proteger ao usar transporte público?",
    answers: [
      { text: "Evitar distrair-se com o celular", correct: true },
      {
        text: "Carregar objetos de valor à vista",
        correct: false,
        explanation:
          "Mostrar objetos de valor pode atrair a atenção de pessoas mal-intencionadas.",
      },
    ],
  },
  {
    question: "O que fazer ao presenciar um crime?",
    answers: [
      {
        text: "Intervir imediatamente",
        correct: false,
        explanation:
          "Intervir pode colocar sua segurança em risco. O melhor é avisar as autoridades.",
      },
      { text: "Avisar as autoridades e manter-se seguro", correct: true },
    ],
  },
  {
    question: "Como se comportar ao perceber um comportamento suspeito em um local público?",
    answers: [
      {
        text: "Ignorar e continuar com sua rotina",
        correct: false,
        explanation:
          "Ignorar pode permitir que o crime aconteça. Fique atento e reporte o comportamento à segurança.",
      },
      { text: "Avisar a segurança ou a polícia", correct: true },
    ],
  },
  {
    question: "O que fazer para se proteger durante um assalto?",
    answers: [
      { text: "Entregar o que for pedido e manter a calma", correct: true },
      {
        text: "Reagir de forma agressiva",
        correct: false,
        explanation:
          "Reagir pode colocar sua vida em risco. O melhor é colaborar e manter a calma.",
      },
    ],
  },
  {
    question: "Como agir ao perceber alguém te observando de forma constante?",
    answers: [
      {
        text: "Ignorar e continuar com suas atividades",
        correct: false,
        explanation:
          "Ignorar pode fazer com que você se torne um alvo. Fique atento e avalie a situação.",
      },
      { text: "Ficar atento e procurar um local mais seguro", correct: true },
    ],
  },
  {
    question: "O que você deve fazer se alguém tentar te abordar em uma rua deserta?",
    answers: [
      {
        text: "Tentar correr o mais rápido possível",
        correct: false,
        explanation:
          "Correr pode ser perigoso, especialmente se a pessoa estiver te seguindo. O melhor é procurar um lugar seguro e pedir ajuda.",
      },
      { text: "Tentar se aproximar de pessoas em um local movimentado", correct: true },
    ],
  },
];

// Sortear 5 perguntas aleatórias
function getRandomQuestions(allQuestions, numberOfQuestions = 5) {
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfQuestions);
}

let questions = getRandomQuestions(allQuestions);

let currentQuestionIndex = 0;
let score = 0;
let mistakes = [];

function loadQuestion() {
  const quiz = document.getElementById("quiz");
  const questionElement = quiz.querySelector(".question");
  const answersContainer = quiz.querySelector(".answers");

  // Verifica se há mais perguntas
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    // Adiciona novas opções
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.dataset.index = index;
      button.onclick = () => selectAnswer(answer, button, answersContainer);
      answersContainer.appendChild(button);
    });
  } else {
    showResults();
  }
}

function selectAnswer(answer, button, container) {
  // Desabilita todas as opções
  const buttons = container.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (answer.correct) {
    score++;
  } else {
    mistakes.push({
      question: questions[currentQuestionIndex].question,
      explanation: answer.explanation,
    });
  }

  currentQuestionIndex++;
  setTimeout(() => {
    loadQuestion();
  }, 1000);
}

function showResults() {
  const quiz = document.getElementById("quiz");
  const resultElement = document.getElementById("result");

  const percentage = Math.round((score / questions.length) * 100);

  quiz.style.display = "none";
  resultElement.style.color = "white";
  resultElement.innerHTML = `
    <h3>Quiz concluído!</h3>
    <p>Sua pontuação: ${percentage}% (${score}/${questions.length} perguntas corretas)</p>
    ${
      mistakes.length > 0
        ? `<p><strong>Você cometeu os seguintes erros:</strong></p>
           <ul>${mistakes
             .map(
               (mistake) =>
                 `<li><strong>${mistake.question}</strong>:<br> ${mistake.explanation}</li>`
             )
             .join("")}</ul>`
        : "<p>Parabéns! Você acertou todas as questões.</p>"
    }
    <p>Continue aprendendo sobre segurança para manter-se protegido!</p>
    <button id="retryQuiz" class="retry-button" onclick="resetQuiz()">Refazer Quiz</button>
  `;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  mistakes = [];
  questions = getRandomQuestions(allQuestions);
  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").innerHTML = "";
  loadQuestion();
}

// Inicializa o quiz
loadQuestion();
