const http = require('http');
const fs =require('fs');
var path = require('path');
const url = require('url');
var formidable = require('formidable');

const hostname = '127.0.0.1';
const port = 3000;
 HEAD

 function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

    const server = http.createServer(function(req, res){
      const baseURL = 'http://' + req.headers.host + '/';
      const reqUrl = new URL(req.url,baseURL);
      var queryData = reqUrl.query;
      var pathName = reqUrl.pathname;
      switch(req.method ){
        case 'POST':
          if(pathName == '/uploadImage'){
            var form = new formidable.IncomingForm();
            form.parse(req, function (err, fields, files) {
              var oldpath = files.image.path;
              var newpath = `./images/capture_${getRandomInt(10000,99999)}.jpg`;
              fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
              });
            })
          }
          break;
        case 'GET':

          var filePath2 = '.' + req.url;
          var extname = path.extname(filePath2);
          if(pathName == '/'){
            fileurl = 'index.html';
          }else if(pathName == '/contacto'){
            fileurl = 'contact.html';
          } else{
            fileurl = './' + req.url;
          }console.log(pathName);
          switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            default:
              contentType = 'text/HTML';
              break;
        }

          fs.readFile(fileurl, function (err, html) {
            if (err) {
                throw err; 
            }   
            res.writeHead(200, {'content-type':contentType } )
            res.write(html);
            res.end();
          });
        break;
      }



      



      
    })


    server.listen(port,hostname,()=>{
      console.log('server is running')
    });

//const timer = 300;

const server = http.createServer(function(req, res){
    console.log('funciona');
    res.writeHead(200, {'content-type':'text/HTML' } )
    res.write('Works');
    res.end();
  })
  
 server.listen(port,hostname,()=>{
   console.log('server is running')
 });
  

