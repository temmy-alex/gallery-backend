const fs = require('fs');

function removePhoto (path) {
    fs.unlink(path, function (error) {
        if(error) throw({
            status: 500,
            message: error.toString()
        });
    })
}

module.exports = removePhoto;