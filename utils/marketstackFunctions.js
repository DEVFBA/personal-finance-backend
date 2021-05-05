const fetch = require('node-fetch');

async function retrieveHomeEOD(){

    const token = process.env.MARKETSTACK_TOKEN;

    const apiURL = `http://api.marketstack.com/v1/eod?access_key=${token}&symbols=AAPL,AMZN,TSLA,FB&limit=8`

    const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return data;

}

async function insertEOD(dataToInsert){

    //console.log('Data To Insert ', dataToInsert);

    const apiURL = process.env.PERSONAL_FINANCE_API + 'quotesEOD/insert';

    //console.log('API URL ', apiURL);

    for(let i = 0; i < dataToInsert.length; i++){
        
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToInsert[i])
        });

        const data = await response.json();

        //console.log('Data ', i, ' ', data);

    }

}

module.exports = {
    retrieveHomeEOD,
    insertEOD
}