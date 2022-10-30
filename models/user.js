let mongoose = require('mongoose')

let schema = mongoose.Schema({
    name:{
        type:String,
        default:'user'
    },
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    image:{
        type:String,
        default:'/dist/img/avatars/avatar-male-1.jpg'
    },
    is_online:{
        type:Boolean,
        default:false
    },
    friends:{
        type:[],
        default:[]
    },
    friend_requests:{
        type:[],
        default:[]
    },
    sent_requests:{
        type:[],
        default:[]
    },
    current_chat:{
        userId:String,
        chatId:String
    }
})

let User = mongoose.model('user',schema)


module.exports = User