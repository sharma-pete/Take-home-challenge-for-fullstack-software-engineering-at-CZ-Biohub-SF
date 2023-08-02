const mysql = require('mysql')

function connectToDB() {
    const conn = mysql.createConnection(
        {
            host:'localhost',
            user: 'root',
            password: 'abcd1234',
            database: 'takeHomeChallangeDB'
        }
    )    
    console.log('Trying to connect to the DB')
    conn.connect((err) =>{
        if(err) {
            console.log(`couldn't connect to DB: ${err}`)
        } else {
            console.log('successfully connected to the DB')
        }
    }) 
    return conn
}

module.exports= {
    connectToDB
}