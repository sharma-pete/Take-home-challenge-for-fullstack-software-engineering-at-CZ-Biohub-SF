const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000

const connectonService = require('./backend/connectionService')
const fiboCalc = require('./backend/fibonacciCalculator')

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

const conn = connectonService.connectToDB()

app.get('/', (req, res) => {
    console.log('inside display index')
    res.render('index')
})

app.post('/fibonacci', (req, res)=>{
    try{

        console.log('calculating fibonacci')

        const n = parseInt(req.body.n, 10);
        if (!n || isNaN(n) || n <= 0) {
            return res.status(400).json({ error: 'Input numberhas to be positive' });
        }
        
        const sqlQuery = "SELECT * FROM sequences"
        conn.query(sqlQuery, (error, existingRow)=>{
            
            if (error) throw error

            if(existingRow.length > 0){
                console.log('we have an existing row')
                let existingNum = existingRow[0].num
                let existingSequence = existingRow[0].sequence
    
                if(n>existingNum){
                    console.log('input is greater than calculations before')
                    const newFiboSeq = fiboCalc.computePartialFiboSequence(existingSequence.split(','), n)
                    const comaSeperatedNewFiboSeq = newFiboSeq.join(', ')
                    const deleteQuery = 'DELETE FROM sequences WHERE num = ?'
                    conn.query(deleteQuery,[existingNum])
                    
                    const insertNewQuery = 'INSERT INTO sequences (num, sequence) VALUES (?, ?)'
                    conn.query(insertNewQuery, [n, comaSeperatedNewFiboSeq], (err, results) => {
                        if (err) throw err
                        res.redirect(`/fibonacci/${n}`)
                    })
                }
                else if (n < existingNum) {
                    console.log('input is smaller than calculations before')
                    // const prevSeq = fiboCalc.fetchComputedFiboSequence(existingSequence.split(','), n)
                    // const comaSeperatedPrevSeq = prevSeq.join(', ')
                    // const deleteQuery = 'DELETE FROM sequences WHERE num = ?'
                    
                    // conn.query(deleteQuery,[existingNum])
                    
                    // const insertNewQuery = 'INSERT INTO sequences (num, sequence) VALUES (?, ?)'
                    // conn.query(insertNewQuery, [n, comaSeperatedPrevSeq], (err, results) => {
                    //     if (err) throw err
                    //     res.redirect(`/fibonacci/${n}`)
                    // })
                    res.redirect(`/fibonacci/lesser/${n}`)
                }
                else if ( n == existingNum ) {
                    console.log('input matched a previously calculated sequence')
                    res.redirect(`/fibonacci/${existingNum}`)
                }
            } else {
                console.log('no previous row found, calculationg fresh')
                const fullFiboSeq = fiboCalc.computeFullFiboSequence(n)
                const commaSeperatedfullFiboSeq = fullFiboSeq.join(', ')
                const insertQuery = 'INSERT INTO sequences (num, sequence) VALUES (?, ?)'
                conn.query(insertQuery, [n, commaSeperatedfullFiboSeq], (err, results) => {
                    if (err) throw err
                    res.redirect(`/fibonacci/${n}`)
                })
            }
        })
    } catch (err) {
        console.log('An Error Has Occured: ', err)
        res.status(500).json({error: 'An Error Has Occured'})
    }
})

app.get('/fibonacci/:n', (req,res) => {
    console.log('inside display fibo')
    const n = parseInt(req.params.n, 10)

    const retrivalQuery = 'SELECT sequence FROM sequences WHERE num = ?'
    conn.query(retrivalQuery, [n], (error, results)=>{
        if(error) throw error

        const numbers = results[0].sequence.split(', ')
        res.render('fibonacci', {numbers})
    })
})

app.get('/fibonacci/lesser/:n', (req,res) => {
    console.log("inside display lesser fibo")
    const n = parseInt(req.params.n, 10)

    const retrivalQuery = 'SELECT sequence FROM sequences'
    conn.query(retrivalQuery, (error, result) =>{
        if(error) throw error

        const greaterNumbers = result[0].sequence.split(', ')

        var numbers = fiboCalc.fetchComputedFiboSequence(greaterNumbers, n)
        res.render('fibonacci', {numbers})
    })
})


app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})