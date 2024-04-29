let router = require('express').Router()

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.get('/campaigns', (req, res) => {
    res.render('campaigns')
})

router.get('/subscription', (req, res) => {
    res.render('subscription')
})

router.get('/support', (req, res) => {
    res.render('support')
})

router.get('/earn-with-us', (req, res) => {
    res.render('earn-with-us')
})

module.exports = router