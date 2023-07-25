const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//all currancies
app.get("/getAllCurrancies", async (req, res)=>{
    const namesURL = 'https://openexchangerates.org/api/currencies.json?app_id=7ac3a17efba149bfbf11b862a2d9b186';

    try {
        const namesResponse = await axios.get(namesURL);
        const nameData = namesResponse.data;

        return res.json(nameData);

    } catch (err) {
        console.log(err);        
    }
});

//get the target ammount
app.get("/convert", async (req, res)=>{
    const {
        date, source_currancy, target_currancy, amount_in_source
    } = req.query;

    try {
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=7ac3a17efba149bfbf11b862a2d9b186`
   
        const dataResponse = await axios.get(dataURL);
        const rates = dataResponse.data.rates;

        //Rates
        const sourceRate = rates[source_currancy];
        const targetRate = rates[target_currancy];
        
        //Final target value
        const targetAmount = (targetRate / sourceRate) * amount_in_source;

        return res.json(targetAmount.toFixed(2));

    } catch (err) {
        console.error(err);
        
    }
})

app.listen(5000, ()=>{
    console.log("server started");
})

