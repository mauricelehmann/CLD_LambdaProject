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

    console.log("result: " + JSON.stringify(result))

    var file = result.files[0].content
    console.log("file: " + file)


    var compressedFile = await compress(file)
    console.log("compressed file: " + compressedFile)

    const response = {
        statusCode: "200",  
        headers: {
            'content-type': "text/plain"  
        },                     
        body: compressedFile.toString('base64'),       // a JSON string.
        isBase64Encoded:  true     // for binary support
    }    
    return response;
};


async function compress(file){
    
    if(!file)
    {
        return "File was not found";
    }
    
    return lzma.compress(file);
}