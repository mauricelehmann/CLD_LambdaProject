var lzma = require('lzma-native');
var atob = require('atob');
const parser = require('lambda-multipart-parser')

exports.handler = async (event) => {

    var body = ""
    if(event.isBase64Encoded){
        body = atob(event.body)
    }else{
        body = event.body
    }
    
    const result = await parser.parse(event);


    var file = result.files[0].content

    if(!file)
    return {
        statusCode: "404",
        body: "File was not found"
    }

    var compressedFile = await compress(file)

    const response = {
        statusCode: "200",  
        headers: {
            'content-type': "application/x-7z-compressed"  
        },                     
        body: compressedFile.toString('base64'),       // a JSON string.
        isBase64Encoded:  true     // for binary support
    }    
    return response;
};


async function compress(file){
    
    return lzma.compress(file);
}