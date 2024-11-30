require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const app = express()
app.use(express.json())
const porta = 3000
app.listen(porta, () => console.log(`Executando. Porta ${porta}`))

const {DB_USER, DB_PASSWORD, DB_HOST, DB_DB, DB_PORT} = process.env

function obterConexao() {
    return mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DB,
        password: DB_PASSWORD,
        port: DB_PORT
    })
}
app.get('/medicos', (req, res) => {

    obterConexao().query('SELECT * FROM tb_medico', (err, results, fields) => {
        //results tem as linhas
        //fields tem meta dados sobre os resultados, caso estejam disponível
        console.log(results)
        console.log(fields)
        console.log(err)
        res.send('ok')
    })
})

app.post('/medicos', (req, res) => {

        const crm = req.body.crm
        const nome = req.body.nome

        const sql = "INSERT INTO tb_medico (crm, nome) VALUES (?,?)"
        obterConexao().query(sql,[crm,nome], (err, results, fields) => {
            //results tem as linhas
            //fields tem meta dados sobre os resultados, caso estejam disponível
            console.log(results)
            console.log(fields)
            console.log(err)
            res.status(201).send('criado')
        })

})

app.get('/pacientes', (req, res) => {
    obterConexao().query('SELECT * FROM tb_paciente', (err, results, fields) => {
        //results tem as linhas
        //fields tem meta dados sobre os resultados, caso estejam disponível
        console.log(results)
        console.log(fields)
        console.log(err)
        res.send('ok')
    })
})

