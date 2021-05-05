// QuoteEOD.js
const mongoose = require('mongoose');                         //Importando mongoose.               

const QuoteEODSchema = new mongoose.Schema({                   //Definiendo el objeto UsuarioSchema con el constructor Schema.
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
    adj_high: Number,
    adj_low: Number,
    adj_close: Number,
    adj_open: Number,
    adj_volume: Number,
    split_factor: Number,
    symbol: String,
    exchange: String,
    date: Date
    },
    { collection: "quotesEOD", timestamps: true }
);

/**
* Devuelve la representación de un Quote EOD, sólo datos públicos
*/
QuoteEODSchema.methods.publicData = function(){
  return {
    open: this.open,
    high: this.high,
    low: this.low,
    close: this.close,
    volume: this.volume,
    adj_high: this.adj_high,
    adj_low: this.adj_low,
    adj_close: this.adj_close,
    adj_open: this.adj_open,
    adj_volume: this.adj_volume,
    split_factor: this.split_factor,
    symbol: this.symbol,
    exchange: this.exchange,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("QuoteEOD", QuoteEODSchema);    //Define el modelo Quote EOD, utilizando el esquema QuoteEODSchema.