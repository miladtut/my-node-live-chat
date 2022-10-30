const socket = io.connect('http://127.0.0.1:3000');
socket.on('connect',()=>console.log('connected'))

socket.on('msg-in',(data)=>{
    console.log(data)
    var msg = '<div class="message"><img class="avatar-md" src="'+data.from.image+'" data-toggle="tooltip" data-placement="top" title="Keith" alt="avatar"><div class="text-main"><div class="text-group"><div class="text"><p>'+data.msg+'</p></div></div><span>09:46 AM</span></div></div>';
    $('#msgs').append(msg)

})

socket.on('writting',()=>{
    $('#writting').show()
})

socket.on('stopped',()=>{
    $('#writting').hide()
})

function join(id){
    socket.emit('join',{"user_id":id})
}

function sendMsg(from,to,msg,data){
    var msgme = "<div class=\"message me\">"+
    "<div class=\"text-main\">"+
        "<div class=\"text-group me\">"+
            "<div class=\"text me\">"+
                "<p>"+msg+"</p>"+
            "</div>"+
        "</div>"+
        "<span>11:32 AM</span>"+
    "</div>"+
    "</div>";
    if(msg){
        $('#msgs').append(msgme)
        socket.emit('msg-out',{
            from:from,
            channel:to,
            msg:msg,
            other:data
        })
    }
    
}

function iamWrittingNow(to){
    socket.emit('writting',to)
}

function iamStoppedWritting(to){
    socket.emit('stopped',to)
}