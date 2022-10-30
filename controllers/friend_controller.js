const User = require("../models/user")

async function acceptFriendRequest(req,res){
    let user = await User.findById(req.params['id']);
    let me = await User.findById(req.session.user._id);
    user.sent_requests.remove(me.id);
    me.friend_requests.remove(user.id)
    me.friends.push(user.id)
    user.friends.push(me.id)
    await user.save();
    await me.save()
    res.redirect('/')
}
async function rejectFriendRequest(req,res){
    let user = await User.findById(req.params['id']);
    let me = await User.findById(req.session.user._id);
    user.sent_requests.remove(me.id);
    me.friend_requests.remove(user.id)
    await user.save();
    await me.save()
    res.redirect('/')
}
async function sendFriendRequest(req,res){
    let user = await User.findById(req.params['id']);
    let me = await User.findById(req.session.user._id);
    user.friend_requests.push(me.id);
    me.sent_requests.push(user.id)
    await user.save();
    await me.save()
    res.redirect('/')
}
async function cancelSentFriendRequest(req,res){
    let user = await User.findById(req.params['id']);
    let me = await User.findById(req.session.user._id);
    user.friend_requests.remove(me.id);
    me.sent_requests.remove(user.id)
    await user.save();
    await me.save()
    res.redirect('/')
}
async function removeFriend(req,res){
    let user = await User.findById(req.params['id']);
    let me = await User.findById(req.session.user._id);
    user.friends.remove(me.id);
    me.friends.remove(user.id)
    await user.save();
    await me.save()
    res.redirect('/')
}


module.exports = {
    acceptFriendRequest,
    rejectFriendRequest,
    sendFriendRequest,
    cancelSentFriendRequest,
    removeFriend
}