
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transactions from './components/Transactions'
import Operations from './components/Operations'
import Category from './components/Category'
import axios from 'axios'


class App extends Component {

  constructor() {
    super()
    this.state = {
      transactions: []

    }
  }

  calculateBalance = () => {

    let sum = 0
    let transactions = [...this.state.transactions]
    for (let i = 0; i < transactions.length; i++) {
      sum += transactions[i].amount
    }

    return sum
  }

  addDeposite = async (amount, vendor, category, date) => {
    let transaction = await axios.post(`http://localhost:3001/transaction`, { amount: parseInt(amount), vendor: vendor.charAt(0).toUpperCase() + vendor.slice(1), category: category.toLowerCase(), date: date })
    let transactions = [...this.state.transactions]
    transactions.unshift(transaction.data)
    this.setState({ transactions })
  }

  addWithdraw = async (amount, vendor, category, date) => {
    if (amount > this.calculateBalance()) {
      alert("you dont have enough money")
      return
    }
    let transaction = await axios.post(`http://localhost:3001/transaction`, { amount: -parseInt(amount), vendor: vendor.charAt(0).toUpperCase() + vendor.slice(1), category: category.toLowerCase(), date: date })
    let transactions = [...this.state.transactions]
    transactions.unshift(transaction.data)
    this.setState({ transactions })
  }

  deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:3001/transaction/${id}`)
    this.getTransactions()

  }

  async getTransactions() {
    let transactions = await axios.get("http://localhost:3001/transactions")
    this.setState({ transactions: transactions.data })
    return transactions
  }

  async componentDidMount() {
    const response = await this.getTransactions()
    this.setState({ transactions: response.data })
  }


  render() {

    return (
      <Router>
        <div className="App">
          <div className="header">
            <h1>Expense Tracker</h1>
          </div>

          <Route path="/add" exact component={Operations}><div id="operations"><Operations addDeposite={this.addDeposite} addWithdraw={this.addWithdraw} calculateBalance={this.calculateBalance} /></div></Route>


          <div className="main-routes">
            <Route path="/" exact component={Transactions}>
              <div id="balance" >

                <h1 className={this.calculateBalance() > 500 ? "green" : "red"}> {this.calculateBalance()}  </h1>

              </div>
              <Transactions transactions={this.state.transactions} deleteTransaction={this.deleteTransaction} /></Route>
            <Route path="/category"> <Category transactions={this.state.transactions} calculateBalance={this.calculateBalance} /></Route>
          </div>
          <div className="footer">
            <div className="feature"><Link to="/">Home</Link></div>
            <div className="white"><Link to="/add" ><button className="plus">Add</button></Link>
            </div>
            <div className="feature"> <Link to="/category">History</Link></div>
            <div className="feature"><Link to="/charts">Charts</Link>  </div>
          </div>
        </div>
      </Router>
    );

  }
}

export default App;
