import React, { Component } from 'react';
import Transaction from './Transaction'
import '../styles/transactions.css'

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            date: ""   
        }
        this.updateText = this.updateText.bind(this)
    }

    updateText = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        
        return(
            <div >
                 
                <div>
                    <h4>Filter by month</h4>
                    <input type="date" className="input" name="date" placeholder="Date" onChange={this.updateText} />
                </div>
                {this.state.date === "" ? this.props.transactions.map( (t) =>  
                <div className="transactions" key={t._id}> <Transaction data={t}  deleteTransaction={this.props.deleteTransaction}/> </div>) : this.props.transactions.filter(t => t.date.substring(5,7) === this.state.date.substring(5,7)).map( (t) =>  
                <div className="transactions" key={t._id}> <Transaction data={t}  deleteTransaction={this.props.deleteTransaction}/> </div>
                    )}
                    
            </div>
        )
    }
}

export default Transactions;