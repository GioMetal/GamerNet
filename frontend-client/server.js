const HTTP = require('http');
const FS = require('fs');
const { stringify } = require('querystring');
const internal = require('stream');
const port = 4200;

var hasIndex = false;

const server = HTTP.createServer(function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');

    if(req.url == '/')
    {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        data = FS.readFileSync('./static/index.html');
        res.end(data);
        return;
    }

    let splot = req.url.split('/');
    let testStr = '/' + splot[splot.length-1];

    switch(splot[splot.length-2] )
    {
        case 'views':
        {
            testStr = '/'+splot[splot.length-2]+'/'+ splot[splot.length-1];
        }
        break;
        case 'userimgs':
        {
            testStr = '/'+splot[splot.length-2]+'/'+ splot[splot.length-1];
        }
        break;

        case 'classes':
        {
            testStr = '/'+splot[splot.length-2]+'/'+ splot[splot.length-1];
        }
        break;

        case 'components':
        {
            testStr = '/'+splot[splot.length-2]+'/'+ splot[splot.length-1];
        }
        break;
    }

    let contentType = req.headers.accept.substring(0, req.headers.accept.indexOf(','));
    data = FS.readFile('./static'+testStr, function(err, content){
        if(err)
        {
            sp = req.url.indexOf('.');
            if(true) // no exension, we can assume it is for routing parseInt(sp) == -1
            {
                res.setHeader('Content-Type', 'text/html');
                res.writeHead(200);
                data = FS.readFileSync('./static/index.html');

                res.end(data);
                return;
            }

            res.setHeader('Content-Type', 'text/html');
            res.writeHead(404);
            res.end('THIS IS SERVER 404'); 
            console.log(req.url);
            return;
        }
        else
        {
            
            let sp = req.url;
            sp = sp.substring(req.url.indexOf('.'), req.url.length);
            console.log(sp);
            switch(sp)
            {
                case '.js':
                {
                    contentType = 'application/javascript';
                }
            }
            
            res.setHeader('Content-Type', contentType);
            res.writeHead(200);
            res.end(content);
        }
    });
});

server.listen(port, function(){
    console.log("Sever running on " + port + "...");
});
