const http = require('http');
const fs =require('fs');

//const { type } = require('os');

const hostname = '127.0.0.1';
const port = 3000;
const timer = 300;

http.createServer(function(req, res){
    console.log('funciona');
    res.writeHead(200, {'content-type':'text/HTML' } )
    res.write('Works');
    res.end();
  }).listen(3000);
