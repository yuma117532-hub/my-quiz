// 間違えた問題をローカルストレージに保存
function saveWrongQuestions() {
  localStorage.setItem(
    "wrongQuestions",
    JSON.stringify(wrongQuestions)
  );
}

// ローカルストレージから間違えた問題を読み込む
function saveWrongQuestions() {
  localStorage.setItem(
    getStorageKey(),
    JSON.stringify(wrongQuestions)
  );
}



// 現在の科目に合わせたキーを取得
function getStorageKey() {
  return "wrongQuestions_" + currentSubject;
}

// ローカルストレージから現在の科目の間違えた問題を読み込む
function loadWrongQuestions() {
  const data = localStorage.getItem(getStorageKey());

  if (data) {
    wrongQuestions = JSON.parse(data);
  } else {
    wrongQuestions = [];
  }
}