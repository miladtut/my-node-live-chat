const { disconnect } = require('mongoose');
let Conversation = require('../models/conversation');
let User = require('../models/user')
var clients = [];
var IO;
function start(io){
    IO = io;
    io.on('connection',(socket)=>{
        socket.on('join',(data)=>{
            socket.join(data.user_id)
            setUserStatusToOnline(data.user_id)
            clients.push({
                sid:socket.id,
                uid:data.user_id
            })
            console.log(clients)
        });
        socket.on('msg-out',(data)=>{
            io.to(data.channel).emit('msg-in',{
                from:data.from,
                msg:data.msg,
            });
            sendmsg(data.other,data.msg)
        })
        socket.on('disconnect',()=>{
            console.log(socket.id)
            var client = clients.find(el=>el.sid == socket.id);
            if(client){
                setUserStatusToOffline(client.uid)
            }
        })
        socket.on('writting',(to)=>{
            console.log('writting',to)
            io.to(to).emit('writting');
        })
        socket.on('stopped',(to)=>{
            console.log('stopped',to)
            io.to(to).emit('stopped');
        })
    })
    
}

async function sendmsg(data,msg){
    let conv = await Conversation.findById(data.conv_id)
    if(msg){
        conv.messages.push({
            sender_id:data.sender_id,
            reciever_id:data.reciever_id,
            msg:msg
        })
        await conv.save()
    }
}

function setUserStatusToOnline(id){
    User.findById(id).then((user)=>{
        user.is_online = true;
        user.save()
        IO.emit('status',{
            uid:user.id,
            status:'online'
        })
    })
}
function setUserStatusToOffline(id){
    User.findById(id).then((user)=>{
        user.is_online = false;
        user.save()
        IO.emit('status',{
            uid:user.id,
            status:'offline'
        })
    })
}

module.exports = start