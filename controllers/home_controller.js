const User = require("../models/user")
const crypto = require("crypto");
const Conversation = require("../models/conversation");
const { use } = require("../routes/web");


async function index(req,res){
    let user = await User.findById(req.session.user._id);
    let users = await User.find();
    let currentChat = await Conversation.findById(user.current_chat.chatId);
    let chat_with  = {};
    if(currentChat){
        chat_with = currentChat.user1_id != String(user._id) ? await User.findById(currentChat.user1_id) : await User.findById(currentChat.user2_id) ;
    }
    console.log(chat_with,'pppp')
    res.render('index',{user:user,users:users,currentChat:currentChat,chat_with:chat_with})
}

async function logout(req,res){
    let user = await User.findById(req.session.user._id)
    user.is_online = true;
    await user.save()
    req.session.destroy(()=>res.redirect('/login'))
}

async function setCurrentChat(req,res){
    let me = await User.findById(req.session.user._id);

    let conv = await Conversation.findOne({
        user1_id:{
            $in: [
                String(me._id),
                req.params['id']
            ]
        },
        user2_id:{
            $in: [
                String(me._id),
                req.params['id']
            ]
        }
    });
    if(!conv){
        conv = await Conversation.create({
            user1_id:me._id,
            user2_id:req.params['id']
        })
    }
    
    me.current_chat = {
        userId:req.param['id'],
        chatId:conv._id
    }
    me.save();
    res.redirect('/')
}


module.exports = {
    index,
    setCurrentChat,
    logout
}