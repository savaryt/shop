"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require("cors");
const nodemailer = require("nodemailer");
// Alternative to sendmail
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});
exports.mailer = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => {
        const data = req.body;
        const options = {
            from: data.email,
            to: 'thibaultsavarypro@gmail.com',
            subject: `${data.subject} ${data.reference}`,
            text: data.content,
        };
        return mailTransport.sendMail(options)
            .then(() => res.send({ message: 'success' }))
            .catch((error) => res.send(error));
    });
});
//# sourceMappingURL=nodemailer.js.map