let express = require('express')
let bodyParser = require('body-parser')
let app = express()
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', require('./routes/index'))
app.use('/demo', require('./routes/demo'))

app.listen(80, () => {
    console.log('[live] on :80')
})