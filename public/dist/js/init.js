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

socket.on('status',(data)=>{
    if(data.status == 'online'){
        $('.'+data.uid).addClass(
            'online'
        )
    }else{
        $('.'+data.uid).removeClass(
            'online'
        )
    }
    
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







var peer = new Peer()
var peerID = null;
var personPeerID = null;

socket.on('someOneRequestYourPeer',(data)=>{
   socket.emit('hereIsMyPeer',{
    to:data.from,
    peer:peerID
   })        
})

socket.on('peerSent',(data)=>{
    personPeerID = data.peer
    
    navigator.mediaDevices.getUserMedia({
        // audio:true,
        video:true
    }).then(stream=>{
        console.log('start stream')
        showVideoSource(stream)
        let call = peer.call(personPeerID,stream);
        call.on('stream',strm=>showVideoDist(strm))
    }).catch(err=>console.log(err))

})

peer.on('call',(call)=>{
    call.answer()
    call.on('stream',strm=>showVideoDist(strm))
    // navigator.mediaDevices.getUserMedia({
    //     audio:true,
    //     video:true
    // }).then(stream=>{
    //     showVideoSource(stream);
    //     call.answer(stream)
    //     call.on('stream',strm=>showVideoDist(strm))
    // }).catch(err=>console.log(err))
    
})

peer.on('open', id=>{
    peerID = id;
});



function getPeer(from,to){
    socket.emit('requestPeerID',{from:from,to:to})
}

function showVideoSource(stream){
    let video = document.getElementById('source');
    video.srcObject = stream
    video.play()
    $('#call1').hide();
    $('#chat1').hide();
    $('stream1').show()
}

function showVideoDist(stream){
    let video = document.getElementById('dist');
    video.srcObject = stream
    $('#call1').hide();
    $('#chat1').hide();
    $('stream1').show()
    // video.play()
}

