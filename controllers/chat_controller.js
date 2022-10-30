let User = require('../models/user');
let Conversation = require('../models/conversation');

async function sendMsg(req,res){
    let conv = await Conversation.findById(req.body.conv_id)
    if(req.body.msg){
        conv.messages.push({
            sender_id:req.body.sender_id,
            reciever_id:req.body.reciever_id,
            msg:req.body.msg
        })
        await conv.save()
    }
    res.redirect('/')
}



module.exports = {
    sendMsg
}