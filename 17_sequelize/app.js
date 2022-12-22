const express = require('express');
const cookieParser = require('cookie-parser');
const models = require('./models/index');

let app = express();

app.set('PORT', 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Router
let dbRouter = require('./routes/db');

app.use('/db', dbRouter);



// sequelize DB 연결
models.sequelize.sync().then(() => {
// models.sequelize.sync({force: true}).then(() => {
    console.log("-------------- datatest DB 연결 성공 ------------");
}).catch(err => {
    console.log("연결 실패");
    console.log(err);
});

app.listen(app.get('PORT'), () => {
    console.log(`express server listeing on port ${app.get('PORT')}...`);
});