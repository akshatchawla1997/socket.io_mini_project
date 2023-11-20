document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let name;
    let text = document.querySelector('#TextArea');
    let msgArea = document.querySelector('.msg_area');

    console.log('Textarea element:', text);

    do {
        name = prompt("Please enter your name");
    } while (!name);

    text.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e.target.value);
            e.target.value = ''; // Clear the textarea after sending the message
        }
    });

    const sendMessage = (message) => {
        let userMsg = {
            user: name,
            msg: message.trim()
        };

        // Append outgoing message
        appendMessage(userMsg, 'outgoing');
        
        // send message to the server

        socket.emit('message', userMsg)
    };

    const appendMessage = (msg, type) => {
        let mainDiv = document.createElement('div');
        let className = type;
        mainDiv.classList.add(className, 'message');
        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.msg}</p>`;

        mainDiv.innerHTML = markup;
        msgArea.appendChild(mainDiv);
    };
    // Receive message
    socket.on('message',(msg)=>appendMessage(msg,'incoming'))

});


