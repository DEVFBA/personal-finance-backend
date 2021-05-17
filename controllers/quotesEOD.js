const mongoose= require('mongoose');
const { retrieveHomeEOD, insertEOD } = require('../utils/marketstackFunctions');
const QuoteEOD = mongoose.model("QuoteEOD");
const { retrieveLastEODInsertDate } = require('../utils/APIFunctions');

async function getQuoteEODMarketStack(req, res, next){

    console.log('Respuesta de Fecha ', await retrieveLastEODInsertDate())

    //const lastInsertDate = new Date(await retrieveLastEODInsertDate());
    //const lastInsertDate = new Date(0);
    let lastInsertDate = null;
    const today = new Date();

    lastInsertDate = await retrieveLastEODInsertDate();

    console.log('Fecha ', lastInsertDate);

    if(lastInsertDate){
        lastInsertDate = new Date(lastInsertDate);
    } else {
        lastInsertDate = new Date(0);
    }

    console.log('Fecha ', lastInsertDate);
    lastInsertDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if(!lastInsertDate || today > lastInsertDate){

        console.log('Debe recuperar datos de Marketstack');

        //QuoteEOD.deleteMany();
        await deleteQuoteEOD();

        const marketstackData = await retrieveHomeEOD();

        const dataToCreate = marketstackData.data;

        await insertEOD(dataToCreate);
        
    } else {
        console.log('Debe traer directo de la bd interna');
    }

/*     const marketstackData = await retrieveHomeEOD();

    const dataToCreate = marketstackData.data;

    await insertEOD(dataToCreate); */

    QuoteEOD.find({}).then(quotes => {
        res.send(quotes)
    }).catch(next);

    //const marketstackData = await retrieveHomeEOD();

    //const dataToCreate = marketstackData.data;

    //console.log('Data To Create ', dataToCreate);

    //await insertEOD(dataToCreate);

}

async function deleteQuoteEOD(req, res){

    console.log('Entra a borrar');

    QuoteEOD.deleteMany().then(r => {
        res.status(200).send(`Quotes Deleted`);
    });

}

function createQuoteEOD(req, res, next){
    
    const quoteEOD = new QuoteEOD(req.body);
     
    quoteEOD.save().then(quoteEOD => {
        res.status(201).send(quoteEOD)
      }).catch(next)

}

function getLastEODInsertDate(req, res, next){

    QuoteEOD.find(
        {},
        {
            _id:0,
            createdAt:1
        }, {
            sort:{
                createdAt: 1
            },
            limit: 1
        }, 
        (err, date) => {
            return res.json(date)
        }
        ).catch(next);

}

module.exports = {
    createQuoteEOD,
    getQuoteEODMarketStack,
    getLastEODInsertDate
}