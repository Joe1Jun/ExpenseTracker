// Get the form element with the ID 'expense-form'
const form = document.getElementById("expense-form");
// Get the unordered list element with the ID 'expense-list'
const expenseList = document.getElementById("expense-list");

// Initialize an empty array to store the expenses
let expenses = [];


// Add an event listener to the form that listens for the 'submit' event
// When the form is submitted, the addExpense function will be called
form.addEventListener('submit', addExpense);


function addExpense(e) {
    // Prevent the default form submission behavior (which would reload the page)
    e.preventDefault();

    // Get the value of the description input field
    const description = document.getElementById('description').value;
    
    // Get the value of the amount input field and convert it to a float
    const amount = parseFloat(document.getElementById('amount').value);

    // Create an expense object with the description and amount
    const expense = { description, amount };
    
    // Add the new expense to the expenses array
    expenses.push(expense);
    
    // Re-render the expense list to include the new expense
    renderExpenses();
    
    // Reset the form fields
    form.reset();
}


function renderExpenses() {
    // Clear the current contents of the expense list
    expenseList.innerHTML = '';
    
    // Loop through each expense in the expenses array
    expenses.forEach((expense, index) => {
        // Create a new list item element
        const li = document.createElement('li');
        
        // Add classes to the list item for Bootstrap styling
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Set the inner HTML of the list item to include the expense description and amount
        // Also include 'Edit' and 'Delete' buttons with event handlers for their respective functions
        li.innerHTML = `${expense.description}: €${expense.amount.toFixed(2)}
            <button class="btn btn-warning btn-sm ml-2" onclick="editExpense(${index})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteExpense(${index})">Delete</button>`;
        
        // Append the list item to the expense list
        expenseList.appendChild(li);
    });
}


function editExpense(index) {
    // Get the expense to be edited from the expenses array using the index
    const expense = expenses[index];
    
    // Set the value of the description input field to the expense's description
    document.getElementById('description').value = expenses.description
    // Set the value of the amount input field to the expense's amount
    document.getElementById('amount').value = expense.amount
    
    // Remove the expense from the array (it will be re-added when the form is resubmitted)
    deleteExpense(index);
     // Remove it from the list while editing
}


function deleteExpense(index) {
    // Remove the expense from the expenses array at the given index
    expenses.splice(index, 1);
    
    // Re-render the expense list to reflect the deletion
    renderExpenses();
}


function getQueryParams() {
    const queryParams = {};
    window.location.search
      .substring(1)
      .split("&")
      .forEach(function (param) {
        const [key, value] = param.split("=");
        queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
      });
    return queryParams;
  }

  // Show message if status is 'deleted'
  document.addEventListener("DOMContentLoaded", function() {
    const params = getQueryParams();
    if (params.status === "deleted") {
      const popup = document.getElementById("messagePopup");
      popup.style.display = "block";
      setTimeout(() => {
        popup.style.display = "none";
      }, 5000); // Hide the popup after 5 seconds
    }
  });
