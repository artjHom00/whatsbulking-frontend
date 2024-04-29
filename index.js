let express = require('express')
let app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/', require('./routes/index'))
app.use('/demo', require('./routes/demo'))

app.listen(80, () => {
    console.log('[live] on :80')
})