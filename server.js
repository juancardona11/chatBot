'use strict'
const cors = require('cors');

const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const chatRoutes = require('./api/api.routes')

app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json());
app.use(express.static('tts'));
app.use(cors());
app.use('/api', router);

chatRoutes(router)

router.get('/', (req, res) => {
  res.send('Hello from home');
});
app.use(router);
app.listen(3000, () => console.log(`Server runing on port ${3000}`));