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

### Global
usage: vp-static-server [options]                                                 

options:                                                                          
  -r   --root          Document root to use [./]                                  
  -a   --host          Address to use [0.0.0.0]                                   
  -p   --port          Port to use [3000]                                         
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
