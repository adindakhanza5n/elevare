
// Initialize the task list on page load
renderTasks();

let transactions = [];
let categories = ['Expenses', 'Income', 'Investments', 'Savings'];

// Transaction structure
function Transaction(type, amount, category, description, date) {
  this.type = type;
  this.amount = amount;
  this.category = category;
  this.description = description;
  this.date = new Date(date);
}
```

2. **Add transactions**

```javascript
function addTransaction(type, amount, category, description, date) {
  const newTransaction = new Transaction(type, amount, category, description, date);
  transactions.push(newTransaction);
}

// Example usage
addTransaction('Income', 2000, 'Salary', 'Monthly salary', new Date());
```

3. **Create daily and weekly summaries**

```javascript
function getDailySummary(date) {
  return transactions.filter(t => t.date.toDateString() === date.toDateString());
}

function getWeeklySummary(date) {
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);
  return transactions.filter(t => t.date >= startOfWeek && t.date <= endOfWeek);
}

// Example usage
console.log('Daily summary for today:', getDailySummary(new Date()));
console.log('Weekly summary for this week:', getWeeklySummary(new Date()));
```

4. **Display financial flow**

```javascript
function getFinancialFlow() {
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(t => {
    if (t.type === 'Income') {
      totalIncome += t.amount;
    } else if (t.type === 'Expenses') {
      totalExpenses += t.amount;
    }
  });

  return {
    totalIncome,
    totalExpenses,
    netFlow: totalIncome - totalExpenses
  };
}

// Example usage
console.log('Financial flow:', getFinancialFlow());
```

5. **Reminders to pay bills**

For simplicity, let's assume we have a fixed list of bills with their due dates. In a real application, you'd likely fetch this data from a database or API.

```javascript
const bills = [
  { name: 'Rent', amount: 1500, dueDate: new Date('2023-08-15') },
  { name: 'Utilities', amount: 200, dueDate: new Date('2023-08-20') },
  // ...
];

function checkUpcomingBills() {
  const today = new Date();
  bills.forEach(bill => {
    if (bill.dueDate < today && bill.dueDate > today.setDate(today.getDate() - 7)) {
      console.log(`Reminder: ${bill.name} (${bill.amount}) is due in 7 days.`);
    }
  });
}

// Example usage
checkUpcomingBills();