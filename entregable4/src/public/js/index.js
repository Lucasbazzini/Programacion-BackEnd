const changeSocket = io();

changeSocket.emit('message', 'Hola, este mensaje viene por websocket!');

changeSocket.on('user_connected', (data) => {
    console.warn(data);
    
});

changeSocket.on('individual', (data) => {
    console.log(data);
    
});