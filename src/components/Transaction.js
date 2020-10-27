import React, { Component } from 'react';
import Moment from 'react-moment';
import '../styles/transaction.css'


class Transaction extends Component {


    deleteTransaction = () => {
        this.props.deleteTransaction(this.props.data._id)
    }

    render() {
        return (
            <div className="transaction" >
                <div>
                    {this.props.data.vendor}
                </div>
                <div className={this.props.data.amount> 0 ? "green" : "red"}>
                    {this.props.data.amount}
                </div>
                <div className="category-expense">
                {this.props.data.category}
                </div>
                <div>
                 <Moment format="DD.MM.YY">{this.props.data.date}</Moment>
                 </div>
                 <div> <button onClick={this.deleteTransaction}>Delete</button></div>
                 
                
            </div>
        )
    }
}

export default Transaction;