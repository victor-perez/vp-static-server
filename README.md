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

### node
`node bin/server [options]`

### npm run
this works only by npm > 2

`npm run server -- [options]`

### npm start
will always run `node bin/server -c ./config.json`

`npm start`

### scripting
```javascript
var server = require('vp-static-server'),
    options = {},
    app = server(options); //returns Express application
```

## Options

### node & npm run
```
-r   --root          Document root to use [./]                                  
-a   --host          Address to use [0.0.0.0]                                   
-p   --port          Port to use [3000]
-o   --open          Open server URL in your default browser [true]
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
port | number | 3000 | Port to use
open | boolean | true | Open server URL in your default browser
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
    "open": true
}
```
### scripting

Name | Type | Default | Description
--- | --- | --- | ---
root | string | ./ | Document root to use
host | string | 0.0.0.0 | Address to use
port | number | 3000 | Port to use
open | boolean | true | Open server URL in your default browser
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
        open: true
    },
    app = server(options); //returns express application
```
