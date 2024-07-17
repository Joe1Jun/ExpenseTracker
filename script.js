const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");

//create expenses array to store expense objects
let expenses = [];

//when submit event occurs the addExpense method is called
form.addEventListener('submit', addExpense);



function addExpense() {
    
    //grab the value inputted by the user
    const description = document.getElementById('description').value;
    //grab the value inputted by the user
    const amount = parseFloat(document.getElementById('amount').value);
    // create expense object with two value from user values inputted
    const expense = { description, amount };
    // add expense object to the array
    expenses.push(expense);
    //render Expense method called to render expenses on page
    renderExpense();
    form.reset();
    

}

function renderExpense() {
    
    expenseList.innerHTML = "";
    

}

function editExpense() {
    

}

function deleteExpense() {
    


}

function saveToLocalStorage() {
    

}

function loadFromLocalStorage() {
    

}