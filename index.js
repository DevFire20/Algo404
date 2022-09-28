const fs = require('fs');
const path = require('path');
const http = require("http");
const hostName = "localHost";
const port = 3000;
const Server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by ${req.method}`);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/html");
//   res.end("<html> <body> Hello World </body> </html>");
if (req.method === "GET") {
    var fileUrl;
    if (req.url === "/" ) {
        fileUrl = '/index.html';
    } else {
        fileUrl = req.url;
    }
    var filePath = path.resolve('./Public' + fileUrl);
    const fileExt = path.extname(filePath);

    if (fileExt === '.html') {
        fs.exists(filePath,(exists)=> {
            if (!exists) {
                res.statusCode = 404,
                res.setHeader('Content-Type', 'text/html')
                res.end(`<html><body><h1> Ur wahala too much </h1></body></html>`)
                return;
        }else{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html'),
            fs.createReadStream(filePath).pipe(res);
        }
    })   
    }else{ 
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html'),
        res.end(`<html> <body> ${fileUrl} is not html </body> </html>`);
    }
    }else{ 
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html> <body> ${req.method} is not supported </body> </html>`);
    }
    });
Server.listen(port, hostName, () => {
  console.log(`Server listening on ${hostName}`);
});
