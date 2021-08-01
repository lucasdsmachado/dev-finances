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

const transactions = [
{
  id: 1,
  description: 'Luz',
  amount: -50000,
  date: '23/01/2021'
},
{
  id: 2,
  description: 'Website',
  amount: 500000,
  date: '23/01/2021'
},
{
  id: 3,
  description: 'Internet',
  amount: -20000,
  date: '23/01/2021'
},
{
  id: 4,
  description: 'App',
  amount: 200000,
  date: '23/01/2021'
}
]

const transaction = {
  incomes() {

  },
  expenses() {

  },
  total() {

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

transactions.forEach(function(transaction) { 
  DOM.addTransaction(transaction)});
