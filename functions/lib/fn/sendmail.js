"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const cors = require("cors");
const sendmail = require("sendmail");
const send = sendmail();
// Works locally but not on firebase free hosting because external network is not accessible
exports.mailer = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, () => {
        const data = req.body;
        send({
            from: data.email,
            to: 'thibaultsavary@protonmail.ch',
            subject: `${data.subject} ${data.reference}`,
            html: data.content,
        }, (error, reply) => {
            // See #48 on github issues
            if (error && error.code !== 'ECONNRESET') {
                console.error(error);
            }
            else {
                res.send({ message: 'success' });
            }
        });
    });
});
//# sourceMappingURL=sendmail.js.map