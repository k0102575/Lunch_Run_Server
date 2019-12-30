import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from "./util/swagger/option";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// const indexRouter = require('./routes/index');
// const userRouter = require('./routes/user');
// const authRouter = require('./routes/auth');
// const restaurantCategoryRouter = require('./routes/restaurantCategory');
// const restaurantRouter = require('./routes/restaurant');
// const restaurantFavoriteRouter = require('./routes/restaurantFavorite');
// const reviewRouter = require('./routes/review');
// const tagRouter = require('./routes/tag');
// const reportTypeRouter = require('./routes/reportType');
// const restaurantReportRouter = require('./routes/restaurantReport');

const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', indexRouter);
// app.use('/', userRouter);
// app.use('/auth', authRouter);
// app.use('/', restaurantRouter);
// app.use('/', restaurantCategoryRouter);
// app.use('/', reviewRouter);
// app.use('/', tagRouter);
// app.use('/', reportTypeRouter);
// app.use('/', restaurantFavoriteRouter);
// app.use('/', restaurantReportRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

module.exports = app;
