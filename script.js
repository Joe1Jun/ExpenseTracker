
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
let expenses = [];

form.addEventListener('submit', addExpense);

function addExpense(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const expense = { description, amount };
    expenses.push(expense);
    renderExpenses();
    form.reset();
}

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `${expense.description}: $${expense.amount.toFixed(2)}
            <button class="btn btn-warning btn-sm ml-2" onclick="editExpense(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>`;
        expenseList.appendChild(li);
    });
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('description').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    deleteExpense(index); // Remove it from the list while editing
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}
