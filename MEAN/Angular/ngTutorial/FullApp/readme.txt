What does this application cover
--------------------------------

- Hot towel as base
- Cloudant (bluemix shared free) service for storing documents

Deploying on Bluemix:
----------------------

(http://hot-towel-h.mybluemix.net/)

1. See page https://github.com/sahat/hackathon-starter and section - how to deploy on bluemix

2. Changes in the src installed from - https://github.com/johnpapa/generator-hottowel to get it running on bluemix

a. added the file .cfignore with the entries

node_modules/
bower_components/

b. removed entry
,
"scripts": {
  "postinstall": "gulp wiredep"
}

from .bowerrc
(can probably include the file .bowerrc in .cfignore too I guess ? try ...)

c. add "bower": "^1.7.7", to dependencies in package.son

Watson APIs
-----------

1. https://github.com/watson-developer-cloud/node-sdk - npm install watson-developer-cloud --save

Twitter APIs
------------

1. https://apps.twitter.com/app/new

2. twitter: [{
    consumer_key:       '1Ec4ge80RLIt5Vv3gsCDsLtYe',
    consumer_secret:    'MgadEBoIRJt0hTGoIkuaEhcHFwgWz4Fa5ZxAW7M1V8sL3gaVod',
    access_token_key:   '53731732-Rtd1LqeCSiUQMhdMqQmDFknYn99ZoZwFlenV4ybxr',
    access_token_secret:'VUCzk66AUL2ppzVH9Fi1PuHIRDwb77whqsHeAn1iYcUqe'
  }]
