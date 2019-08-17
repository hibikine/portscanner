import * as net from 'net';

function portInUse(port: number, serverIP = '127.0.0.1') {
  return new Promise(callback => {
    const server = net.createServer(function(socket) {
      socket.write('Echo server\r\n');
      socket.pipe(socket);
    });

    server.listen(port, serverIP);
    server.on('error', () => {
      callback(true);
    });
    server.on('listening', () => {
      server.close();
      callback(false);
    });
  });
}

(async () => console.log(await portInUse(25565)))();
