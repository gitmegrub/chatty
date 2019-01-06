$(function(){
	//connect
	var socket = io.connect('http://localhost:3000')

	//inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	//emit user 
	send_username.click(function() {
		console.log(username.val())
		socket.emit('change_username', {username : username.val()})
	})

	//message

	//emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})	

	//listen on new message
	socket.on("new_message", (data) => {
		feedback.html(''); //remove typing feedback
		message.val(''); //clear
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//listen typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>" )
	})
});