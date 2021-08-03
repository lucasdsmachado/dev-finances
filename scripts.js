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
    tr.dataset.index = index;
  },
  innerHTMLTransaction(transactions, index) {

    const CSSclass = transactions.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transactions.amount);

    const html = `
    <td class="description">${transactions.description}</td>
    <td class="${CSSclass}">${amount}</td>
    <td>${transactions.date}</td>
    <td>
      <img onclick="transaction.remove(${index})" src="./assets/minus.svg" alt="icone menos">
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

  formatAmount(value) {
    value = Number(value) * 100
    return value;
  },

  formatDate(date) {
    const splittedDate = date.split('-');
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
  },

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
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
      return {
          description: Form.description.value,
          amount: Form.amount.value,
          date: Form.date.value
      }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues();
    if(description.trim() === "" ||
       amount.trim() === "" ||
       date.trim() === "") {
         throw new Error("Por favor, preencha todos os campos");
       }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues();
    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);
    return {
      description,
      amount,
      date
    }
  },

  saveTransaction(transactions) {
    transaction.add(transactions);
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
  },

  submit(event) {
    event.preventDefault()

    try {
      Form.validateFields();
      const transactions = Form.formatValues();
      Form.saveTransaction(transactions);
      Form.clearFields();
      modal.close();
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    transaction.all.forEach((transaction, index) => { 
      DOM.addTransaction(transaction, index)});
    
    DOM.updateBalance();
  },
  reload() {
    DOM.clearTransactions();
    App.init();
  }
}

App.init();


