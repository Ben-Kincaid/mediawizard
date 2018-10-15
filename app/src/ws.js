import openSocket from 'socket.io-client';

//open socket on port 6969
const socket = openSocket('http://localhost:6969');

//takes a callback which will return the uploaded file object. 
function subscribeToUploadProg(cb) {   
    socket.on(`imageLocations`, (isUploaded) => cb(isUploaded));
}
export { subscribeToUploadProg };