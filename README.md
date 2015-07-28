vp-static-server
======
Simple static server using express static middle-ware

## Getting Started

### Install

#### Global
`npm install vp-static-server -g`

#### Project dependencie 
`npm install vp-static-server --save`

#### GIT
`git clone https://github.com/victor-perez/vp-static-server.git`

## Usage

### global
`vp-static-server [options]`

or

`vpss [options]`

### node
`node bin/server [options]`

### npm run
this works only by npm > 2

`npm run server -- [options]`

### npm start
will always run `node bin/server -c ./vp-static-server.json`

`npm start`

### scripting
```javascript
var server = require('vp-static-server'),
    options = {},
    app = server(options); //returns Express application
```

## Options

### cli, node & npm run
```
-r   --root          Document root to use [./]                                  
-a   --host          Address to use [0.0.0.0]                                   
-p   --port          Port to use [0] ( auto select )
-o   --open          Open server URL in your default browser [true]
-s   --https         Create a ssl server ( HTTPS ) [false]
     --https-cert    CERT file for ssl server [ssl/127.0.0.1.cert]
     --https-key     KEY file for ssl server [ssl/127.0.0.1.key]
     --static-*      Express.static options:                                    
                     --static-dotfiles       [ignore]                           
                     --static-etag           [true]                             
                     --static-index          [index.html]                       
                     --static-lastmodified   [true]                             
                     --static-maxage         [0]                                
                     --static-redirect       [true]                             
                     more info http://expressjs.com/4x/api.html#express.static  
-c   --config        Path to the configuration file                             
-h   --help          Print this list and exit.                                  
```

### config.json
Name | Type | Default | Description
--- | --- | --- | ---
root | string | ./ | Document root to use
host | string | 0.0.0.0 | Address to use
port | number | 0 | Port to use 0 = auto select
open | boolean | true | Open server URL in your default browser
https | boolean\|object | false | Create a ssl server ( HTTPS ), if `true` it will use ssl/127.0.0.1.(cert\|key)
https.cert | string | ssl/127.0.0.1.cert | CERT file for ssl server
https.key | string | ssl/127.0.0.1.key | KEY file for ssl server
static | object | {} | Express.static options [http://expressjs.com/4x/api.html#express.static]

#### example
```json
{
    "root": "./",
    "static": {
        "dotfiles": "ignore",
        "etag": true,
        "index": "index.html",
        "lastModified": true,
        "maxAge": 0,
        "redirect": true
    },
    "host": "0.0.0.0",
    "port": 3000,
    "open": true,
    "https": false
}
```
### scripting

Name | Type | Default | Description
--- | --- | --- | ---
root | string | ./ | Document root to use
host | string | 0.0.0.0 | Address to use
port | number | 0 | Port to use 0 = auto select
open | boolean | true | Open server URL in your default browser
https | boolean\|object | false | Create a ssl server ( HTTPS ), if `true` it will use ssl/127.0.0.1.(cert\|key)
https.cert | string | ssl/127.0.0.1.cert | CERT file for ssl server
https.key | string | ssl/127.0.0.1.key | KEY file for ssl server
static | object | {} | Express.static options [http://expressjs.com/4x/api.html#express.static]

#### example
```javascript
var server = require('vp-static-server'),
    options = {
        root: "./",
        static: {
            dotfiles: "ignore",
            etag: true,
            index: "index.html",
            lastModified: true,
            maxAge: 0,
            redirect: true
        },
        host: "0.0.0.0",
        port: 3000,
        open: true,
        https: false
    },
    app = server(options); //returns express application
```
