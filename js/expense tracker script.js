let expenseTable = document.getElementById("expense_table");
let addExpenseButton = document.getElementById("add_button");
let totalExpensesValue = document.getElementById("total_expense_value");

addExpenseButton.addEventListener("click", addExpense);
expenseTable.addEventListener("click", removeExpense);

let valuesToSum = [];

function addExpense(event) {
  event.preventDefault();

  let expenseName = document.getElementById("expense_name").value;
  let expenseDate = document.getElementById("expense_date").value;
  let expensePrice = parseInt(document.getElementById("expense_price").value);

  let valuesTable = [expenseName, expenseDate, expensePrice];

  if (isNaN(valuesTable[2])) {
    alert("Please, provice price value");
    return;
  }

  // ADDING PRICES TO AN ARRAY WHICH WILL BE USED TO SUM ALL PRICES TOGETHER
  valuesToSum.push(expensePrice);
  //console.log(valuesToSum);

  // SUMMING PRICES FROM AN ARRAY
  let totalValue = valuesToSum.reduce((a, b) => a + b, 0);
  console.log(totalValue);
  // DISPLAYING THE SUM OF ALL EXPENSES
  totalExpensesValue.innerHTML = `<h3>Total Price of Expenses: ${totalValue} </h3>`;

  let newExpenseRow = document.createElement("tr"); // creates new row for the expense
  newExpenseRow.className = "expense_table_row"; // adds class to the new row element

  for (let i = 0; i < 3; i++) {
    let cell = document.createElement("td");
    cell.appendChild(document.createTextNode(valuesTable[i]));
    cell.className = "expense_table_cell";
    if (i == 2) {
      cell.className = "expense_table_cell price";
    }
    newExpenseRow.appendChild(cell); // adds new <td> with value to the row
    //console.log(newExpenseRow);
  }

  // CREATING DELETE BUTTON FOR SPECIFIC EXPENSE

  let deleteButton = document.createElement("button"); //create delete button
  deleteButton.className = "delete_button"; //add button class
  deleteButton.textContent = "X"; // add name

  let deleteExpenseCell = document.createElement("td"); //create cell <td> for the button
  deleteExpenseCell.className = "expense_table_cell"; // add cell class
  deleteExpenseCell.appendChild(deleteButton); // add deleteButton into the deleteExpenseCell

  newExpenseRow.appendChild(deleteExpenseCell); // add deleteExpenseCell into the row

  // ADDING WHOLE ROW INTO THE TABLE
  expenseTable.appendChild(newExpenseRow);
}
// DELETING EXPENSE ROW
function removeExpense(event) {
  if (event.target.classList.contains("delete_button")) {
    //makes removeExpense() activate only when clicking a delete button, not whole <td> element
    if (confirm("Are You Sure?")) {
      // confirm() shows confimation window, if true, task will be deleted
      let tr = event.target.closest("tr"); // targets row in which deleteExpenseCell is located

      // CHECKS EVERY CELL IN ROW (tr) TO FIND A CELL WITH "price" class which contains a value to subtract from "Total Price of Expenses"; THEN SUBTRACTS
      let cells = tr.children;
      let deleteCounter = 1;
      for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("price")) {
          let totalValue = valuesToSum.reduce((a, b) => a + b, 0);

          // GOES THROUGH valuesToSum array IN ORDER TO FIND A VALUE EQUAL TO THE "PRICE" value IN "cells[i]"; then
          for (let j = 0; j < valuesToSum.length; j++) {
            console.log(cells[i].innerHTML);
            console.log(valuesToSum[j]);
            if (cells[i].innerHTML == valuesToSum[j] && deleteCounter === 1) {
              valuesToSum.splice(j, 1);
              deleteCounter = 0;
            }
          }
          console.log(valuesToSum);
          deleteCounter = 1;
          let valueAfterSubtraction = totalValue - parseInt(cells[i].innerHTML);
          totalExpensesValue.innerHTML = `<h3>Total Price of Expenses: ${valueAfterSubtraction} </h3>`;
        }
      }
      // REMOVES ROW
      //console.log(tr);
      tr.remove();
    }
  }
  /*
    Instead of subtracting from the sum of expenses, 
    make the sum equal 0 and rerun function that calculates the sum.
    */
}
