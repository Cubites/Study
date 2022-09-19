const express = require('express');
const app = express();
// const port = process.env.PORT || 4000;
app.set('port', process.env.PORT || 4000);

// mongoose (mongoDB 연결)
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:user1234@cluster0.y7zfj.mongodb.net/?retryWrites=true&w=majority', {
    // mongoose 6.0 이상부터는 지우고 실행
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));



app.listen(app.get('port'), () => {
    console.log(app.get('port') + ' port connected...');
});