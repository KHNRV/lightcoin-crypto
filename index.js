class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
    // Update the balance in the account
  }
  commit() {
    if (this.isAllowed()) {
      // Keep track of the time of the transaction
      this.time = new Date();

      // Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
  isAllowed() {
    return this.account.balance + this.value >= 0 ? true : false;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    this.transactions.forEach((transaction) => (balance += transaction.value));
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log("Transaction 1:", t1);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
// console.log("Transaction 2:", t2);

const t3 = new Deposit(120.0, myAccount);
t3.commit();
// console.log("Transaction 3:", t3);

console.log("Transactions", myAccount.transactions);
console.log("Balance:", myAccount.balance);
