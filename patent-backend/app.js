const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const manageRouter = require('./api/routes/manage');

const app = express();

const mongoose = require('mongoose');
const url = "mongodb://localhost/pider";
mongoose.connect(url, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit : '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manage', manageRouter);

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
