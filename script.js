// Get saved data from browser
let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let loans = JSON.parse(localStorage.getItem("loans")) || [];

// ===============================
// INCOME
// ===============================

document.getElementById("incomeForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const source = document.getElementById("incomeSource").value;
    const amount = Number(document.getElementById("incomeAmount").value);
    const date = document.getElementById("incomeDate").value;

    const income = {
        id: Date.now(),
        source: source,
        amount: amount,
        date: date
    };

    incomes.push(income);

    saveData();

    this.reset();

    displayIncome();

    updateDashboard();
});


// Display Income

function displayIncome() {

    const table = document.getElementById("incomeTable");

    table.innerHTML = "";

    incomes.forEach(function(income) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${income.source}</td>
            <td>₹${income.amount}</td>
            <td>${income.date}</td>
            <td>
                <button class="delete-btn"
                onclick="deleteIncome(${income.id})">
                Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// Delete Income

function deleteIncome(id) {

    incomes = incomes.filter(function(income) {
        return income.id !== id;
    });

    saveData();

    displayIncome();

    updateDashboard();
}


// ===============================
// EXPENSE
// ===============================

document.getElementById("expenseForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const category =
        document.getElementById("expenseCategory").value;

    const amount =
        Number(document.getElementById("expenseAmount").value);

    const date =
        document.getElementById("expenseDate").value;

    const expense = {

        id: Date.now(),

        category: category,

        amount: amount,

        date: date
    };

    expenses.push(expense);

    saveData();

    this.reset();

    displayExpenses();

    updateDashboard();
});


// Display Expenses

function displayExpenses() {

    const table =
        document.getElementById("expenseTable");

    table.innerHTML = "";

    expenses.forEach(function(expense) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.category}</td>

            <td>₹${expense.amount}</td>

            <td>${expense.date}</td>

            <td>
                <button class="delete-btn"
                onclick="deleteExpense(${expense.id})">
                Delete
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}


// Delete Expense

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {

        return expense.id !== id;

    });

    saveData();

    displayExpenses();

    updateDashboard();
}


// ===============================
// LOANS
// ===============================

document.getElementById("loanForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const name =
        document.getElementById("loanName").value;

    const amount =
        Number(document.getElementById("loanAmount").value);

    const paid =
        Number(document.getElementById("loanPaid").value);

    const date =
        document.getElementById("loanDate").value;

    if (paid > amount) {

        alert("Paid amount cannot be greater than loan amount.");

        return;
    }

    const loan = {

        id: Date.now(),

        name: name,

        amount: amount,

        paid: paid,

        date: date
    };

    loans.push(loan);

    saveData();

    this.reset();

    displayLoans();

    updateDashboard();
});


// Display Loans

function displayLoans() {

    const table =
        document.getElementById("loanTable");

    table.innerHTML = "";

    loans.forEach(function(loan) {

        const outstanding =
            loan.amount - loan.paid;

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${loan.name}</td>

            <td>₹${loan.amount}</td>

            <td>₹${loan.paid}</td>

            <td>₹${outstanding}</td>

            <td>${loan.date}</td>

            <td>
                <button class="delete-btn"
                onclick="deleteLoan(${loan.id})">
                Delete
                </button>
            </td>

        `;

        table.appendChild(row);
    });
}


// Delete Loan

function deleteLoan(id) {

    loans = loans.filter(function(loan) {

        return loan.id !== id;

    });

    saveData();

    displayLoans();

    updateDashboard();
}


// ===============================
// DASHBOARD
// ===============================

function updateDashboard() {

    // Calculate income

    const totalIncome =
        incomes.reduce(function(total, income) {

            return total + income.amount;

        }, 0);


    // Calculate expenses

    const totalExpense =
        expenses.reduce(function(total, expense) {

            return total + expense.amount;

        }, 0);


    // Calculate savings

    const savings =
        totalIncome - totalExpense;


    // Calculate outstanding loans

    const totalLoan =
        loans.reduce(function(total, loan) {

            return total + (loan.amount - loan.paid);

        }, 0);


    document.getElementById("totalIncome")
        .textContent = totalIncome.toLocaleString("en-IN");

    document.getElementById("totalExpense")
        .textContent = totalExpense.toLocaleString("en-IN");

    document.getElementById("totalSavings")
        .textContent = savings.toLocaleString("en-IN");

    document.getElementById("totalLoan")
        .textContent = totalLoan.toLocaleString("en-IN");
}


// ===============================
// LOCAL STORAGE
// ===============================

function saveData() {

    localStorage.setItem(
        "incomes",
        JSON.stringify(incomes)
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    localStorage.setItem(
        "loans",
        JSON.stringify(loans)
    );
}


// ===============================
// LOAD DATA WHEN PAGE OPENS
// ===============================

displayIncome();

displayExpenses();

displayLoans();

updateDashboard();