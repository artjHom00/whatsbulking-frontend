let router = require('express').Router()
let nodemailer = require('nodemailer')
const TelegramBot = require('node-telegram-bot-api')
const ejs = require('ejs');

const transporter = nodemailer.createTransport({
    host: "smtp.timeweb.ru",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "admin@whatsbulking.com",
      pass: "0bzr0j3af5",
    },
})

const bot = new TelegramBot(process.env.TOKEN, {polling: true});


router.get('/', (req, res) => {
    res.render('index')
})

router.get('/confirm', (req, res) => {
    res.render('confirm')
})
router.get('/success', (req, res) => {
    res.render('success')
})

router.post('/send', (req, res) => {

    bot.sendMessage(process.env.CHAT_ID, `📌 New form request!

Name: ${req.body.name}
Email: ${req.body.email}
Phone: ${req.body.phone}
Meta: ${req.body.metaInfo}
Comment: ${req.body.comment}`);

    res.sendStatus(200)

    ejs.renderFile(__dirname + '/templates/email-template.ejs', { name: req.body.name, link: 'examplelink' }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
            const info = transporter.sendMail({
                from: 'admin@whatsbulking.com', // sender address
                to: req.body.email, // list of receivers
                subject: `WhatsBulking | Meeting for ${req.body.name}`, // Subject line
                html: data
            }).then((info) => {
                  console.log(info)
            }).catch(e => {
                bot.sendMessage(process.env.CHAT_ID, `Error Occured Sending Message to ${req.body.email}: ${e}`);
            })
        }
    })

            
        
})

module.exports = router