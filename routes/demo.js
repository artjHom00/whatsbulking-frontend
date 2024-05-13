let router = require('express').Router()

router.get('/dashboard', (req, res) => {
    res.render('dashboard/dashboard')
})

router.get('/campaigns', (req, res) => {
    res.render('dashboard/campaigns')
})

router.get('/subscription', (req, res) => {
    res.render('dashboard/subscription')
})

router.get('/support', (req, res) => {
    res.render('dashboard/support')
})

router.get('/earn-with-us', (req, res) => {
    res.render('dashboard/earn-with-us')
})

module.exports = router