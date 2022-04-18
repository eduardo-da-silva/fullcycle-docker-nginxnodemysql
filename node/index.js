const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql1 = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)  ENGINE=INNODB;`
connection.query(sql1)

// const sql2 = `INSERT INTO people(name) values('Eduardo da Silva')`
// connection.query(sql2)
connection.end()


app.get('/', (req,res) => {
    const conn = mysql.createConnection(config)
    const sql = `SELECT name FROM people`
    conn.query(sql, function(err, data, fields) {
        if (err) res.send('<h1>Erro de acesso</h1>')
        let resText = '<h1>Full Cycle!!!</h1>'
        for (person of data) {
            resText += person.name
            resText += '<br>'
        } 
        res.send(resText)
    })
    conn.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})