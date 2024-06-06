const express = require('express');
const cors = require('cors');
const { Request } = require('./src/DB/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/health', (req, res) => {
    res.send("I'm running...");
});

app.post('/track-visit', (req, res) => {
    const visitData = {
        timestamp: req.body.timestamp,
        url: req.body.url,
        referrer: req.body.referrer,
        userAgent: req.body.userAgent,
        ip: req.ip,
        language: req.body.language,
        screenResolution: req.body.screenResolution,
        viewportSize: req.body.viewportSize,
        timezone: req.body.timeZone,
        platform: req.body.platform,
    };
    try {
        Request.create(visitData);
        console.log(visitData);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/show-visits', async (req,res)=>{
    const data = await Request.find({})
    .catch(error => {
        console.log(error);
    })
    console.log("No. of hits: "+data.length);
    res.json({
        "No of total hits": data.length
    });
});

app.listen(5000, () => {
    console.log('App listening on port 5000!');
});
