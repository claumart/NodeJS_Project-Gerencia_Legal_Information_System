var mysql = require('mysql');
var myConnection = require('express-myconnection');
//Cambiar las siguientes dos variables
var dbUser = "root";
var pass = "12345";

module.exports.dbConnection = myConnection(mysql,{
    host: 'localhost',
    user: dbUser,
    password : pass,
    port : 3306, //port mysql
    database:'gerencialegal_amdc'
},'request');