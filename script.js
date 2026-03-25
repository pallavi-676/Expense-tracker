let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveData() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!title || amount <= 0) {
    alert("Please enter valid data");
    return;
  }

  const expense = {
    id: Date.now(),
    title,
    amount: Number(amount),
    category
  };

  expenses.push(expense);
  saveData();
  render();
}

function deleteExpense(id) {
  expenses = expenses.filter(e => e.id !== id);
  saveData();
  render();
}

function render() {
  const list = document.getElementById("list");
  const totalEl = document.getElementById("total");
  const chart = document.getElementById("chart");

  list.innerHTML = "";

  let total = 0;
  let categoryTotals = {};

  expenses.forEach(e => {
    total += e.amount;

    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;

    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <span>${e.title} - ₹${e.amount}</span>
      <button class="delete" onclick="deleteExpense(${e.id})">X</button>
    `;

    list.appendChild(div);
  });

  totalEl.innerText = total;

  chart.innerHTML = "";

  for (let cat in categoryTotals) {
    const percent = (categoryTotals[cat] / total) * 100;

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.width = percent + "%";
    bar.style.background = getColor(cat);
    bar.innerText = `${cat} (${Math.round(percent)}%)`;

    chart.appendChild(bar);
  }
}

function getColor(category) {
  const colors = {
    Food: "linear-gradient(135deg, #ff9f43, #ff6b6b)",
    Travel: "linear-gradient(135deg, #54a0ff, #5f27cd)",
    Shopping: "linear-gradient(135deg, #f368e0, #ff9ff3)",
    Other: "linear-gradient(135deg, #1dd1a1, #10ac84)"
  };
  return colors[category] || "#999";
}

render();