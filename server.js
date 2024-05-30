const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mailgun = require('mailgun-js')({
    apiKey: 'eb1ac283762c04ce5cd51df98a05a314-0996409b-1de98b2a', // Replace 'YOUR_API_KEY' with your actual Mailgun API key
    domain: 'sandbox80ac0ca0eae74952a0cc577b868d89d1.mailgun.org'
});

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body;

    const data = {
        from: from,
        to: to,
        subject: subject,
        text: text
    };

    console.log('Received email data:', data);

    mailgun.messages().send(data, (error, body) => {
        if (error) {
            console.error('Mailgun Error:', error);
            res.status(500).json({ success: false, error: 'Failed to send email', details: error.message });
        } else {
            console.log('Email sent successfully:', body);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
