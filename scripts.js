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
  id: 1,
  description: 'Internet',
  amount: -20000,
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
  },
  innerHTMLTransaction(transactions) {

    const html = `
    <td class="description">${transactions.description}</td>
    <td class="expense">${transactions.amount}</td>
    <td>${transactions.date}</td>
    <td>
      <img src="./assets/minus.svg" alt="icone menos">
    </td>
    `;
    return html;
  }
}
