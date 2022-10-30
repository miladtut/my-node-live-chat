let mongoose = require('mongoose')

let schema = mongoose.Schema({
    user1_id:{
        type:String,
    },
    user2_id:{
        type:String,
    },
    messages:[
        {
            sender_id:String,
            reciever_id:String,
            msg:String
        }
    ]
})

let Conversation = mongoose.model('conversation',schema)


module.exports = Conversation