const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customers = require("./models/customer")
const account = require("./models/account")
const transaction = require("./models/transactions");
const transactions = require('./models/transactions');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());


mongoose.connect("mongodb://146.190.0.104:27018/abd", {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
app.post('/api1', async (req, res) => {
    try {
        let userName = req.body.username
        let response = await customers.findOne({ username: userName })
        if (response) {
            if (response.accounts.length > 0) {
                let accounts = await account.find({ account_id: { $in: response.accounts } })
                response._doc.accounts = accounts
            }
        }
        res.status(200).send(response)
    } catch (error) {
        console.log("error", error)
    }
})

app.post("/api2", async (req, res) => {
    try {
        let account_id = req.body.accountId
        let transaction = await transactions.findOne({ account_id: account_id })
        let total_amount_sold = 0
        let total_amount_bought = 0
        if (transaction) {
            if (transaction.transactions.length > 0) {
                transaction.transactions.forEach(item => {
                    if (item.transaction_code == "sell") {
                        total_amount_sold = total_amount_sold + item.amount
                    }
                    if (item.transaction_code == "buy") {
                        total_amount_bought = total_amount_bought + item.amount
                    }
                })
            }

        }
        res.send({total_amount_bought,total_amount_sold})
    } catch (error) {
        console.log("error", error)
    }
})


app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({ "message": "Hello Crud Node Express" });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});