import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:6969');
function subscribeToUploadProg(cb) {
   
    socket.on(`imageLocations`, (isUploaded) => cb(isUploaded));
    
}
export { subscribeToUploadProg };