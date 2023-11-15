const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { User } = require('./models/User');

const app = express();
app.set('port', 4000);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    console.log('Cookies data-type: ' + typeof(req.cookies));
    console.dir(req.cookies);
    res.send(req.cookies);
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);
    console.log('server');
    console.log(req);
    res.send('ok');
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 실행 중...`);
});