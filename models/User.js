// Usuario.js
const mongoose = require('mongoose');                         //Importando mongoose.
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.
const crypto = require('crypto');                             //Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          //Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;                  

const UserSchema = new mongoose.Schema({                   //Definiendo el objeto UsuarioSchema con el constructor Schema.
    userName: {                                                  //Definiendo cada campo con sus tipo sde datos y validaciones.
        type: String,
        required: [true, "no puede estar vacío"],
        index: true,
    },                                           
    userLastName: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        unique: true, //este campo no se puede repetir
        lowercase: true,
        required: [true, "no puede estar vacío"],
        match: [/\S+@\S+\.\S+/, "es inválido"],
        index: true,
    },
    profilePicture: String,
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
    },
    { timestamps: true }
);

// usando plugin de validación para que no se repitan correos ni usernames
UserSchema.plugin(uniqueValidator, { message: "Ya existe" });

UserSchema.methods.createPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex"); // generando una "salt" random para cada usuario
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex"); // generando un hash utilizando la sal
};

/**
 * Recibe el password, genera y compara el has con el de la base de datos
 */
UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign({
    id: this._id,
    userName: this.userName,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

/**
 * Devuelve la representación de un usuario después de autenticar
 */
UserSchema.methods.toAuthJSON = function(){
  return {
    email: this.email,
    token: this.generateJWT()
  };
};

/**
* Devuelve la representación de un usuario, sólo datos públicos
*/
UserSchema.methods.publicData = function(){
  return {
    id: this.id,
    userName: this.userName,
    userLastName: this.userLastName,
    email: this.email,
    profilePicture: this.profilePicture,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model("User", UserSchema);    //Define el modelo Usuario, utilizando el esquema UsuarioSchema.