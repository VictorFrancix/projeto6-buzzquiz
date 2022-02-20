let allquizz = document.querySelector(".listaQuizz")
const telaInicial = document.querySelector(".home")
const quizzPage = document.querySelector(".quizz-page")


function criarQuizz(acionado) {
    telaInicial.classList.add("disappear")
}

homePageRender()

function homePageRender() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(quizGenerator);
}

function quizGenerator(quizz) {
    let arrayquizz = quizz.data
    arrayquizz.forEach(quizzGeral);
}

// function QuizzUsuario(message){
//     chat.innerHTML += `
//     <li class="public">
//         <span>
//             <time>(${message.time})  </time>
//             <strong>${message.from}</strong>
//             para
//             <strong>${message.to}</strong>:
//             ${message.text}
//         </span>
//     </li>
//     `
// }

function quizzGeral(quizz) {
    allquizz.innerHTML += `
    <div class="quizz" onclick="openQuizz(${quizz.id})">
        <p class="escritaBrancaQuizz"> ${quizz.title} </p>
        <img src="${quizz.image}" alt = "">
    </div>
`
}

function openQuizz(id) {
    console.log(telaInicial)
    telaInicial.classList.add("disappear")
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${id}`)
    promise.then(openQuizzRender)
}

function openQuizzRender(quizz) {
    quizzPage.classList.remove("disappear")
    let arrayQuizz = quizz.data
    quizzPage.innerHTML += `<nav class="sub-header">
            <p>${arrayQuizz.title}</p>
        </nav>`
    let arrayQuestions = arrayQuizz.questions

    arrayQuestions.forEach(function (arrayQuestions) {
        quizzPage.innerHTML += `<nav class="questions">
            <article>
                <div class="question-title">
                    <p>${arrayQuestions.title}</p>
                </div>`

        let arrayAnswers = arrayQuestions.answers

        arrayAnswers.forEach(function (arrayAnswers) {
            quizzPage.innerHTML += `<div class="answer">
                        <div class="alternatives ${arrayAnswers.isCorrectAnswer}">
                            <img src="${arrayAnswers.image}" alt="simpson">
                            <p>${arrayAnswers.text}</p>
                        </div>`
        })
    })
    console.log(quizzPage)
}
