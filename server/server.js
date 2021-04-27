const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// const userController = require("./controllers/userController");
// const cookieController = require("./controllers/cookieController");
// const sessionController = require("./controllers/sessionController");
// note from kerri - commented out session controller temp due to node errors


const app = express();
const PORT = 3000;

//load view engine
app.set('views',path.join(__dirname,'../views'))
app.set('view engine','pug')

const apiRouter = require('./api/api_router.js');
const libraryRouter = require('./api/libraryRouter.js');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './client/html-scss')));

app.get("/", /*cookieController.setSSIDCookie,*/ (req, res) => {
    res.sendFile(path.resolve(__dirname,'../html-scss/index.html'))
})

//login page path
// app.get('/login', userController.createUser,)
// // note from kerri - commented out cookieController.setCookie temp due to node errors

// app.get("/login", (res, req) => {
//   console.log('login')
//   res.sendFile(path.resolve(__dirname, "../client/html-scss/login.html"));
//   console.log('login after')
// })

app.use('/api/', apiRouter,(req,res)=>{
  res.status(200).send(res.locals.books)
});
app.use('/db', libraryRouter);



// catch all for requests to unknown route

app.use((req, res) => res.status(400).send('Page Not Found'));

// global error handler

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred, but why tho?' },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
