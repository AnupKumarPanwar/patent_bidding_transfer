const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const logger = require('morgan');
const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const manageRouter = require('./api/routes/manage');
const auctionRouter = require('./api/routes/auction');
const fileUpload = require('express-fileupload');
const app = express();

const mongoose = require('mongoose');
const url = "mongodb://localhost/pider";
mongoose.connect(url, { useNewUrlParser: true });

// multer
app.use(fileUpload({
  useTempFiles : false
}));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use( bodyParser.json({limit: "15360mb", type:'application/json'}) ); 
// app.use( bodyParser.urlencoded({limit: "15360mb", type:'application/json'}) );    

// Prevent CORS error !!!!!!! that are enforced by the browser !
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

app.use('/static', express.static(path.join(__dirname, 'uploads')));
app.use('/auction', auctionRouter)
app.use('/manage', manageRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err
  });
});

module.exports = app;
