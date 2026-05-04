const categoryOptions = {
  "英語": ["文法", "語彙"],
  "数学": ["計算"],
  "すべて": ["文法", "語彙", "計算"]
};

function updateCategoryOptions() {
  const subject = document.getElementById("subjectSelect").value;
  const categorySelect = document.getElementById("categorySelect");

  categorySelect.innerHTML = "";

  // 「すべて」は常に追加
  const allOption = document.createElement("option");
  allOption.value = "すべて";
  allOption.text = "すべて";
  categorySelect.appendChild(allOption);

  categoryOptions[subject].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.text = cat;
    categorySelect.appendChild(option);
  });
}

function updateProgress() {
  const progress = ((currentIndex + 1) / questions.length) * 100;

  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").innerText =
    (currentIndex + 1) + " / " + questions.length;
}

function showWeakness() {
  const el = document.getElementById("weakness");
  if (!el) return;

  const data = localStorage.getItem(getStorageKey());

  if (!data) {
    el.innerText = "弱点はまだありません";
    return;
  }

  const wrongs = JSON.parse(data);

  if (wrongs.length === 0) {
    el.innerText = "弱点はまだありません";
    return;
  }

  // 分野ごとに集計
  const count = {};
  wrongs.forEach(q => {
    const key = q.category || "未分類";
    count[key] = (count[key] || 0) + 1;
  });

  // 表示生成
  let text = "";
  for (const key in count) {
    text += `${key}：${count[key]}問\n`;
  }

  el.innerText = text.trim();
}