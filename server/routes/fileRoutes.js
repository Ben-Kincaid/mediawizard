require('dotenv').load();

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require('multer');
var fileType = require('file-type');
var imagemin = require('imagemin');
var imageminMozJpeg = require('imagemin-mozjpeg')
var imageminPngQuant = require('imagemin-pngquant')
const io = require('socket.io')();
var AWS = require('aws-sdk');


//Schema for managing 'File' collection in Mongo
var FileSchema = require('../models/FileSchema');

//Middleware for verifying JWT/Passing userId to request
var verifyToken = require('./middleware/verifyToken');


//update AWS config with keys/secrets and initialize s3 instance
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;
var s3Bucket = process.env.AWS_S3_BUCKET;

AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
})

const s3 = new AWS.S3({ params: { Bucket: 'mediawizard' } });

let upload = multer();

var router = express.Router();

//On all requests to /file/, use cors amd verifyToken middleware
router.use(cors());
router.use(verifyToken);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * @function uploadFile
 * @description Optimizes a given buffer and uploads it to S3
 * 
 * @param {String} userId 
 * @param {Buffer} buffer 
 * @param {String} name 
 * @param {String} type 
 * @param {String} quality 
 * 
 * @returns {Promise}
*/

const deleteFile = (key) => {
    return new Promise((resolve, reject) => {
        let params = {
            Bucket: "mediawizard",
            Key: key
        }

        s3.deleteObject(params, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

io.on('connection', (client) => {
    client.on('subscribeToUploadProg', (files) => {
        
        
    })
})
io.listen(6969);
const uploadFile = (userId, buffer, name, type, quality, key) => {
    return new Promise((resolve, reject) => {
        //initialize function to emit data via ws
        

        //make sure quality is a rounded Float
        let qualityFmt = Math.round(parseFloat(quality));
    
        // create minimized buffer - returns promise which resolves the finished buffer
        let newBuffer = imagemin.buffer(buffer, {
            plugins: [
                imageminMozJpeg({quality: qualityFmt}),
                imageminPngQuant({quality: qualityFmt}) // set quality to slider val
            ]
        })

        // After new buffer resolves, upload to S3
        newBuffer.then((buffer) => {
            
          console.log("SIZE");
       

             
                console.log(qualityFmt);
                let params = {
                    ACL: 'public-read',
                    Body: buffer,
                    ContentType: type.mime,
                    Key: `${name}.${type.ext}`
                };

                s3.upload(params).send((err, data) => {
                    if(err) reject(err);
                    console.log("LOCATION");
                   
                    console.log(data.size)
                    io.emit(`imageLocations`, { location: data.Location, size: buffer.byteLength, key });
                    let filePayload = {
                        userId: userId,
                        name: `${name}.${type.ext}`,
                        type: type.mime,
                        location: data.Location
                    }

                    console.log('uploaded');
                    FileSchema.create(filePayload, (err, record) => {
                        console.log(err);
                        console.log(record);
                        if(err) reject(err);
                        console.log("CREATED AND RESOLVED");
                        resolve(record);
                    })
                });
          
        })

    })
}


/**
 * @event POST /upload
 * @description Handles the /upload route - uploads and compresses files via formdata
 * 
 * @param {FileList} req.files
 * @param {Array} req.body.quality
*/
router.post('/upload', upload.any(), function (req, res) {
    
    console.log(req.files);
    const uploadPromises = req.files.map((file, i) => {   
        let fileQuality = (Array.isArray(req.body.quality) ? 
            req.body.quality[i] : 
            req.body.quality
        );
        let timestamp = Date.now().toString();
        let fileName = `${req.userId}/${timestamp}-${file.originalname}-optimized`;
    

        return uploadFile(
            req.userId,
            file.buffer,
            fileName,
            fileType(file.buffer), 
            fileQuality,
            i
        );
    })

    Promise.all(uploadPromises).then((response) => {
        console.log('resolving promises!');
        res.status(200).json(response);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({
            message: 'Error - Couldnt Upload File. Please Try Again',
            error: err
        })
    })
})


/**
 * @event POST /view
 * @description 
 * 
 * @param {FileList} req.files
 * @param {Array} req.body.quality
*/
router.get('/view', verifyToken, (req, res) => {
    

    var files = FileSchema.find({userId: req.userId}, (err, files) => {
        console.log();
        if(err) res.status(400).json({
            message: 'Error - couldnt find any images for user.', 
            error: err
        });
        
        var userFiles = files.map((file, i) => {
            return {
                fileId: file._id,
                name: file.name,
                type: file.type,
                location: file.location
            }
        })

        res.status(200).json(userFiles);



    }).skip(req.headers['paged'] * 10).limit(10);

})


router.delete('/delete', verifyToken, (req, res) => {
    console.log('deleting...');
    console.log(req.body);
 
    
    FileSchema.deleteOne({ _id: req.body.fileId}, (err) => {
        if(err) res.status(400).json({
            message: 'Error - couldnt find object to delete.', 
            error: err
        })
        deleteFile(req.body.fileKey).then((response) => {
            console.log("DONE!");
            console.log(response);
            res.status(200).send({ success: true });
        }).catch((err) => {
            console.log(err);
            res.status(400).send({ success: false });
        })
        
    })
})
module.exports = router