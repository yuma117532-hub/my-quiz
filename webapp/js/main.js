let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let wrongQuestions = [];
let isReviewMode = false;

let currentSubject = "すべて";

const QUESTION_LIMIT = 5;

  

  
  









  



// 復習モード開始
function startReview() {
  if (wrongQuestions.length === 0) {
    alert("復習する問題がありません");
    return;
  }

  isReviewMode = true;
  questions = [...wrongQuestions]; // 間違えた問題だけにする
  shuffleArray(questions);

  currentIndex = 0;
  score = 0;

  showQuestion();
}





// クイズ開始
function startQuiz() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "block";

  currentIndex = 0;
  score = 0;

  const subject = document.getElementById("subjectSelect").value;
  currentSubject = subject;
  const category = document.getElementById("categorySelect").value;


  // ▼ 読み込むファイル一覧
  let files = [];

  if (subject === "英語") {
    files = ["data/english.json"];
  } else if (subject === "数学") {
    files = ["data/math.json"];
  } else {
    // 「すべて」の場合 → 全ファイル
    files = ["data/english.json", "data/math.json"];
  }

  // ▼ 複数JSONをまとめて取得
  Promise.all(
    files.map(file => fetch(file).then(res => res.json()))
  ).then(results => {
    // 配列を結合
    let allQuestions = results.flat();

    // ▼ 分野フィルタ
    if (category === "すべて") {
      questions = allQuestions;
    } else {
      questions = allQuestions.filter(q => q.category === category);
    }

    if (questions.length === 0) {
      alert("問題がありません");
      goHome();
      return;
    }

    shuffleArray(questions);
    questions = questions.slice(0, QUESTION_LIMIT);

    showQuestion();

  
  });
}

function goHome() {
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("homeScreen").style.display = "block";

  showWeakness();
}

updateCategoryOptions();
document.addEventListener("DOMContentLoaded", () => {
  showWeakness();
});
  // 最初に実行
 //showQuestion();

