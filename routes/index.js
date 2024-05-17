let router = require('express').Router()
let nodemailer = require('nodemailer')
const TelegramBot = require('node-telegram-bot-api')
const ejs = require('ejs');

let pendingRequests = []

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

router.post('/send', async (req, res) => {

    let renderTemplateAndSendEmail = (name = req.body.name) => {
        ejs.renderFile(__dirname + '/templates/email-template.ejs', { name, link: 'examplelink' }, (err, data) => {
            if (err) {
              console.log(err);
            } else {
                const info = transporter.sendMail({
                    from: 'admin@whatsbulking.com', // sender address
                    to: req.body.email, // list of receivers
                    subject: `WhatsBulking | Meeting for ${name}`, // Subject line
                    html: data
                }).then((info) => {
                      console.log(info)
                }).catch(e => {
                    bot.sendMessage(process.env.CHAT_ID, `Error Occured Sending Message to ${req.body.email}: ${e}`);
                })
            }
        })
    }
    try {
        if(req.body.isContinued) {
    
            let foundRequest = pendingRequests.find(pendingRequest => {
                if(pendingRequest.email === req.body.email) {                
                    return true
                }
            })

            if(!foundRequest) {
                return res.sendStatus(500)
            }
    
            clearTimeout(foundRequest.timeout);
            foundRequest.timeout = null;
    
            await bot.editMessageText(`❗️ Full Lead
    
👤: ${foundRequest.name}
💻: ${foundRequest.email}
📞: ${foundRequest.phone}
📍: ${foundRequest.metaInfo}
${foundRequest.comment ? `📃: ${foundRequest.comment}` : ``}
    
Company Name: ${req.body.companyName}
Has a Website: ${req.body.hasWebsite}
${req.body.websiteVal ? `🔗: ${req.body.websiteVal}` : ``}
${req.body.amount ? `Amount of messages per month: ${req.body.amount}` : ``}
            
            `, {
                chat_id: process.env.CHAT_ID,
                message_id: foundRequest.messageId
            });
            renderTemplateAndSendEmail(foundRequest.name)
                    
            res.sendStatus(200)
        } else {
            let { message_id: messageId } = await bot.sendMessage(process.env.CHAT_ID, `❗️ New Lead
    
👤: ${req.body.name}
💻: ${req.body.email}
📞: ${req.body.phone}
📍: ${req.body.metaInfo}
${req.body.comment ? `📃: ${req.body.comment}` : ``}`)
    
            const pendingRequestsLength = pendingRequests.push({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                meta: req.body.metaInfo,
                comment: req.body.comment,
                timeout: null,
                messageId
            })
    
            pendingRequests[pendingRequestsLength-1].timeout = setTimeout(() => {
                renderTemplateAndSendEmail()
    
                pendingRequests = pendingRequests.filter((item) => item.id !== pendingRequestsLength-1)
            }, 15*60*1000)
            res.sendStatus(200)
        }
    } catch(e) {
        console.log("🚀 ~ router.post ~ e:", e)
    }


    


            
        
})

module.exports = router