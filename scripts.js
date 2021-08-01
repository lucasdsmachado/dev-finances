const modal = {
  open(){
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close(){
      document 
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
  }
}

const transaction = {
  all: [
    {
      description: 'Luz',
      amount: -50000,
      date: '23/01/2021'
    },
    {
      description: 'Website',
      amount: 500000,
      date: '23/01/2021'
    },
    {
      description: 'Internet',
      amount: -20000,
      date: '23/01/2021'
    },
    {
      description: 'App',
      amount: 200000,
      date: '23/01/2021'
    }
    ],
  add(newtransaction) {
    transaction.all.push(newtransaction);
    App.reload();
  },

  remove(index) {
    transaction.all.splice(index, 1);
    App.reload();
  },

  incomes() {
    let income = 0;
    transaction.all.forEach(transaction => {
      if(transaction.amount > 0)
        income += transaction.amount;
    })
    return income;
  },

  expenses() {
    let expense = 0;
    transaction.all.forEach(transaction => {
      if(transaction.amount < 0)
        expense += transaction.amount;
    })
    return expense;
  },

  total() {
    return transaction.incomes() + transaction.expenses();
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),
  
  addTransaction (transactions, index) {
    const tr = document.createElement('tr');
    tr.innerHTML = DOM.innerHTMLTransaction(transactions);
    DOM.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transactions) {

    const CSSclass = transactions.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transactions.amount);

    const html = `
    <td class="description">${transactions.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td>${transactions.date}</td>
    <td>
      <img src="./assets/minus.svg" alt="icone menos">
    </td>
    `;
    return html;
  },
  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(transaction.incomes());

    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(transaction.expenses());

    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(transaction.total());
  },
  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? "-" : "";
    value = String(value).replace(/\D/g, "");
    value = Number(value)/100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value;
  }
}

const Form = {
  
}

const App = {
  init() {
    transaction.all.forEach(transaction => { 
      DOM.addTransaction(transaction)});
    
    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
}

App.init();


