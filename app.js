
let express = require('express');

let app = express()

let server = require('http').createServer(app);

let path = require('path')

let io = require('socket.io')(server);

require('./sockets/messages')(io)



let bodyparser = require('body-parser')

require('./configs/db_init')

let session = require('express-session')
let sessionStore = require('connect-mongodb-session')(session)
let store = new sessionStore({
    uri:process.env.DB_URL,
    collection:'sessions'
})

app.use(session({
    secret:process.env.SESSION_SECRET,
    store:store,
    saveUninitialized:false,
    cookie:{
        maxAge:1*60*60*1000
    }
}))

let webRoutes = require('./routes/web')

let flash = require('connect-flash')

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static(path.join(__dirname,'public')))


app.use(bodyparser.urlencoded())

app.use(flash())

app.use(webRoutes)



server.listen(3000,()=>{
    console.log('server now running')
})



