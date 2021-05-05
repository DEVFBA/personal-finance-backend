const fetch = require('node-fetch');

async function retrieveLastEODInsertDate(){

    const internalAPIPrefix = process.env.PERSONAL_FINANCE_API;

    const apiURL = internalAPIPrefix + 'quotesEOD/lastInsertDate'

    const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    });

    //console.log('Response ', response);    
    const data = await response.json();

    //console.log('Data ', data);

    if(data.length > 0){
        //console.log('Entro en el correcto')
        return data[0].createdAt;
    } else{
        //console.log('Aqui no')
        return 0;
    }

}

module.exports = {
    retrieveLastEODInsertDate
}