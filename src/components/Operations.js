import React, { Component } from 'react'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

import '../styles/operations.css'

class Operations extends Component {

    constructor() {
        super()
        this.state = {
            amount: 0,
            vendor: "",
            category: "",
            date: "",
            snackBarOpen: false,
            snackBarMsg: ''
        }
        this.updateText = this.updateText.bind(this)
    }

    clearState = () => {
        this.setState({
            amount:0,
            
        })
    }

    snackBarClose = (event) => {
        this.setState({
            snackBarOpen: false

        })
    }

    calculateBalance =() => {
        this.props.calculateBalance()
    }

    addDeposite = () => {
        if (this.state.amount === 0 || this.state.vendor === "" || this.state.category === "" || this.state.date === "") {
            this.setState({
                snackBarOpen: true,
                snackBarMsg: "All fields are required"
            })
            
        } else {
            this.props.addDeposite(this.state.amount, this.state.vendor, this.state.category,this.state.date)
            this.clearState()
            this.setState({
                snackBarOpen: true,
                snackBarMsg: "Deposite added succesfully"
            })
        }
        
    }

    addWithdraw = () => {
        
        if (this.state.amount === 0 || this.state.vendor === "" || this.state.category === "" || this.state.date === "") {
            this.setState({
                snackBarOpen: true,
                snackBarMsg: "All fields are required"
            })
            
        }else if(this.state.amount <= 0) {
            this.setState({
                snackBarOpen: "error",
                snackBarMsg: "Amount must be a positive number"
            })
        } else {
            this.props.addWithdraw(this.state.amount, this.state.vendor, this.state.category,this.state.date)
            this.setState({
                snackBarOpen: true,
                snackBarMsg: "Withdraw added succesfully"
            })
        }
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
        const snackBarMsg = this.state.snackBarMsg
        return (
            <div className="operations">
                <h3>Insert a transaction:</h3>
                <div>
                    <input type="date" className="input" name="date" placeholder="Date" onChange={this.updateText} />
                </div>
                <div>
                    <input type="number" className="input" name="amount" placeholder="Amount" onChange={this.updateText} />
                </div> <div>
                    <input type="text" className="input" name="vendor" placeholder="Vendor" onChange={this.updateText} />
                </div> <div>
                    <input type="text" className="input" name="category" placeholder="Category" onChange={this.updateText} />
                </div>

                <button  className={`expensebtn deposite ${snackBarMsg === "All fields are required" ? "animate-no" : ""}`} onClick={this.addDeposite}>Deposite</button>

                <button  className={`expensebtn withdraw ${snackBarMsg === "All fields are required" ? "animate-no" : ""}`} onClick={this.addWithdraw}>Withdraw</button>
                <SnackBar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackBarClose}
                    message={<span id="message-id">{this.state.snackBarMsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-lable="Close"
                            color="inherit"
                            onClick={this.snackBarClose}>
                            x
                        </IconButton>
                    ]}
                />
            </div>

        )
    }
}

export default Operations