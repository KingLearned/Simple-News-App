const SQL = require('mysql')

const MYSQL = SQL.createConnection({
    host: "Localhost",
    user: "root",
    password: 'Learned 1945',
    database: 'trendsdb'
})

MYSQL.connect((err, result) => {
    if(err, result){
        console.log('Data Base Initiated!')
    }else{
        console.log('Data Base Not Found!\nSTART Apache & MySQL from Xampp API')
    }
})

module.exports = MYSQL