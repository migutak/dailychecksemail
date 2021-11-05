"use strict";
const nodemailer = require("nodemailer");
require('log-timestamp');
const axios = require('axios');
const cron = require("node-cron");
//
async function main(data) {

    //
    let transporter = nodemailer.createTransport({
        host: process.env.SMTPSERVER || 'smtp.gmail.com',
        port: process.env.SMTPPORT || 587,
        secure: false, // true for 465, false for other ports
        tls: { rejectUnauthorized: false },
        auth: {
            user: process.env.SMTPUSER || 'ecollectsystem@gmail.com',
            pass: process.env.PASS || 'W1ndowsxp',
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"E-Collect" <ecollect@co-opbank.co.ke>' || 'ecollectsystem@gmail.com',
        to: process.env.TOEMAIL || 'kevin.abongo@royalcyber.com',
        subject: "E-Collect Daily checks - " + new Date(),
        html: "<b>Daily check on below tables today:</b>" +
            '<table style="border: 1px solid black">' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black; border-collapse: collapse;">LOANS_STAGE</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.CHECK_LOANS_STAGE+'</th></tr>' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black">CUSTOMER_STAGE</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.CHECK_CUSTOMER_STAGE+'</th></tr>' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black">WATCH_STAGE</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.CHECK_WATCH_STAGE+'</th></tr>' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black">MCOOPCASH_STAGE</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.CHECK_MCOOPCASH_STAGE+'</th></tr>' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black">TBL_IPF_DETAILS</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.TBL_IPF_DETAILS+'</th></tr>' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black">CARDS_STAGE</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.CHECK_CARDS_STAGE+'</th></tr>' +
            '<tr style="border: 1px solid black"><th style="border: 1px solid black">CARDS_WATCH_STAGE</th><th style="border: 1px solid black; border-collapse: collapse;">'+data.CHECK_CARDS_WATCH_STAGE+'</th></tr>' +
            '</table>'
    });

    console.log("Message sent: %s", info.messageId);
}

async function sendEmail() {
    try {
        const response = await axios.get(process.env.NODEAPI + '/nodeapi/checks');
        console.log(response.data);
        main(response.data[0]).catch(console.error);
    } catch (error) {
        console.error(error);
    }
}

cron.schedule("0 7 * * *", function () {
    // everyday at 7am
    sendEmail();
});   
