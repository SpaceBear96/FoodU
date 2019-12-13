const uuid = require('node-uuid');

module.exports = {

    generateFileName: function (file) {
        var nameFile = uuid.v1({ node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab] }).toString() + file.name;

        return nameFile;
    }
}