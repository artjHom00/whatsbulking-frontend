let router = require('express').Router()
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, {polling: true});


router.get('/', (req, res) => {
    res.render('index')
})

router.post('/send', (req, res) => {
    console.log("🚀 ~ router.post ~ req.body:", req.body)
    bot.sendMessage(process.env.CHAT_ID, `📌 New form request!

Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Comment: ${req.body.comment}`);

    res.sendStatus(200)
})

module.exports = router