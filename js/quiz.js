 // 問題を表示
function showQuestion() {

  if (!questions[currentIndex]) return;

  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("restartBtn").style.display = "none";
  document.getElementById("reviewBtn").style.display = "none";
  document.getElementById("result").innerText = "";

  const q = questions[currentIndex];
  document.getElementById("question").innerText = q.question;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  document.getElementById("progressBar").style.width = "100%";
  document.getElementById("progressText").innerText =
  questions.length + " / " + questions.length;

  // choicesをコピーしてシャッフル
  const shuffledChoices = [...q.choices];
  shuffleArray(shuffledChoices);

  shuffledChoices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(choice);
    choicesDiv.appendChild(btn);

      
    answered = false;
     
    const buttons = document.querySelectorAll("#choices button");
    buttons.forEach(btn => btn.disabled = false);
  });
    
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(btn => {
    btn.style.backgroundColor = "";
    btn.style.color = "";
  });
  updateProgress();
}

// 答えチェック
function checkAnswer(choice) {

  if (answered) return;

  answered = true;

  const correct = questions[currentIndex].answer;

  const buttons = document.querySelectorAll("#choices button");

  buttons.forEach(btn => {
    btn.disabled = true;

    if (btn.innerText === correct) {
        btn.classList.add("correct");
    }

    if (btn.innerText === choice && choice !== correct) {
        btn.classList.add("wrong");
    }
  });

  if (choice === correct) {
    document.getElementById("result").innerText = "正解！";
    score++;
  } else {
    document.getElementById("result").innerText = "不正解！ 正解は " + correct;
  
    if (!wrongQuestions.includes(questions[currentIndex])) {
      wrongQuestions.push(questions[currentIndex]);
      saveWrongQuestions();
    }

  }

  document.getElementById("score").innerText = "スコア: " + score;

  document.getElementById("nextBtn").style.display = "inline-block";
}

// 次の問題へ
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

//結果表示
function showResult() {
  document.getElementById("question").innerText = "終了！";
  document.getElementById("choices").innerHTML = "";

  document.getElementById("result").innerText = "";

  document.getElementById("finalResult").innerText =
    questions.length + "問中 " + score + "問正解！";

  document.getElementById("restartBtn").style.display = "inline-block";
  document.getElementById("reviewBtn").style.display = "inline-block";
  document.getElementById("nextBtn").style.display = "none";
}

//リスタート
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;

  wrongQuestions = [];
  clearWrongQuestions();
  isReviewMode = false;

  document.getElementById("finalResult").innerText = "";
  document.getElementById("score").innerText = "";
  document.getElementById("question").innerText = "読み込み中...";

  fetch("questions.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
      loadWrongQuestions();
      shuffleArray(questions);
      showQuestion();
    });

    wrongQuestions = [];
    localStorage.removeItem("wrongQuestions");
}

// 配列をシャッフルする関数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
