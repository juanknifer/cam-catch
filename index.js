const http = require('http');
const fs =require('fs');
var path = require('path');


const hostname = '127.0.0.1';
const port = 3000;



    const server = http.createServer(function(req, res){
      
      var filePath = '.' + req.url;
      var extname = path.extname(filePath);

      if(req.url == '/'){
        fileurl = 'index.html';
      }else{
        fileurl = './' + req.url;
      }

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


      
    })


    server.listen(port,hostname,()=>{
      console.log('server is running')
    });




  

  
