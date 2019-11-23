require('dotenv').config()

var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

var app = express();

//connect databsae
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection to database established')
}).catch(err => {
    console.log('db error ' + err.message);
    process.exit(-1)
})

// setup mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


// setup body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

// setup template engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/apps/views')

// setup static foder
app.use('/static', express.static(__dirname + '/public'))

// add controllers
var controllers = require(__dirname + '\\Apps\\controllers')
app.use(controllers)

app.listen(process.env.PORT, function() {
    console.log('Server listening on port ' + process.env.PORT);
});