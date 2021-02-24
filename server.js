
const express = require('express');
require('dotenv').config();
const config = require('./config');

const OpenTok = require('opentok'),
    OT = new OpenTok(config.OT_API_KEY, config.OT_API_SECRET);

const app = express();
const port = process.env.PORT;

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/:you', (req, res) => {
  if(config.USERS.indexOf(req.params.you) === -1){
    res.sendStatus(401);
    return;
  }
  let fakeId = Math.floor(Math.random() * 1000) + 1;
  //Generate token
  let token = OT.generateToken(config.OT_SESSION, {
    role : 'publisher',
    expireTime : (new Date().getTime() / 1000)+((1/12) * 24 * 60 * 60), // just 2 hours for testing
    data : 'name=' + req.params.you + fakeId,
    initialLayoutClassList : ['focus']
  });
  res.render('index', { apiKey: config.OT_API_KEY, sessionId: config.OT_SESSION, token, codec: process.env.PROJECT_CODEC });
});

app.listen(port, () => {
  console.log(`Opentok Videoclip app listening at http://localhost:${port}`);
});
