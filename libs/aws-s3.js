const AWS = require('aws-sdk');

const uuid = require('node-uuid');

const config = require('../config/index');

const helper = require('../libs/helper');

AWS.config.update({
    region: config.aws.s3.REGION,
    accessKeyId: config.aws.s3.ACCESS_KEY,
    secretAccessKey: config.aws.s3.SECRET_KEY
});

const s3Bucket = new AWS.S3();

module.exports = {

    putObject: (bucket, file) => {

        var fileName = helper.generateFileName(file);
        var buccketNameLenght = bucket.match(/[/](\w+)/).index;

        var params = {
            Bucket: bucket,
            Body: file.data,
            Key: fileName,
            ContentType:  file.mimetype 
        }
        s3Bucket.putObject(params, function (err, data) {
            if (err) {
                console.log('Error al subir el objeto', err.stack);
                throw new Error('Error al subir objeto');
            } else {
                console.log("Objeto subido correctamente ");
                return data;
            }
        });
        console.log('Imagen subida');
        return fileName 
    },

    deleteObject: (bucket, key) => {
        var params = {
            Bucket: bucket,
            Key: key
        }
        return s3Bucket.deleteObject(params, function (err, data) {
            if (err) {
                console.log("ERROR in callback", err);
                throw new Error('Error al eliminar objeto');
            } else {
                console.log("Objeto eliminado correctamente");
                return data;
            }
        });
    },

    downloadObject: (bucket, key) => {
        var params = {
            Bucket: bucket,
            Key: key
        }

        return s3Bucket.getObject(params)
            .createReadStream(key)
            .on('error', function (err) {
                res.status(500).json({ error: "Error -> " + err });
            })
    },

    getObject: (bucket, key) => {
        var params = {
            Bucket: bucket,
            Key: key
        }
        return s3Bucket.getObject(params).createReadStream();

        // try {
        //     const data = await s3Bucket.getObject(params).promise()
        //     return data
        // } catch (err) {
        //     throw new Error(`No se pudo obtener el archivo ${err.message}`)
        // }
        // createReadStream
    },

    getDownloadUrl: (bucket, key) => {
        var params = {
            Bucket: bucket,
            Key: key
        }
        return s3Bucket.getSignedUrl('getObject', params)
    }
}