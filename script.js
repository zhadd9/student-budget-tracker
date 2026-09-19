const form = document.getElementById("expenseForm");
const expensesContainer = document.getElementById("expenses");
const totalElement = document.getElementById("total");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
function renderExpenses() {
    expensesContainer.innerHTML = "";
    let total = 0;
    expenses.forEach((expense, index) => {
        total += Number(expense.amount);
        const div = document.createElement("div");
        div.className = "expense";
        div.innerHTML = `
            <div>
                <strong>${expense.name}</strong>
                <br>
                <small>${expense.category}</small>
            </div>
            <div>
                <strong>₸${expense.amount}</strong>
                <button class="delete" onclick="deleteExpense(${index})">
                    Delete
                </button>
            </div>
        `;
        expensesContainer.appendChild(div);
    });
    totalElement.textContent = `₸${total}`;
}
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;
    expenses.push({
        name,
        amount,
        category
    });
    saveExpenses();
    renderExpenses();
    form.reset();
});
function deleteExpense(index) {
    expenses.splice(index, 1);
    saveExpenses();
    renderExpenses();
}
renderExpenses();
