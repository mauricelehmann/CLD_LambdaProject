zip -FSr deployment.zip node_modules index.js
aws lambda update-function-code --function-name compress --zip-file fileb://deployment.zip