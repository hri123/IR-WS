var watson = require('watson-developer-cloud');

var personality_insights = watson.personality_insights({
  username: '3912dd5f-653d-4e09-9a27-8382ab7f6429',
  password: 'WmW2Jz6cUvEi',
  version: 'v2'
});

var Twit = require('twit');

var T = new Twit({
  consumer_key:       '1Ec4ge80RLIt5Vv3gsCDsLtYe',
  consumer_secret:    'MgadEBoIRJt0hTGoIkuaEhcHFwgWz4Fa5ZxAW7M1V8sL3gaVod',
  access_token:   '53731732-Rtd1LqeCSiUQMhdMqQmDFknYn99ZoZwFlenV4ybxr',
  access_token_secret: 'VUCzk66AUL2ppzVH9Fi1PuHIRDwb77whqsHeAn1iYcUqe',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var options = { screen_name: 'raghubk',
                count: 10000,
              include_rts: false };

T.get('statuses/user_timeline', options , function(err, data) {

  var tweets_concatenated = '';

  for (var i = 0; i < data.length ; i++) {
    // console.log(data[i].text);
    tweets_concatenated += data[i].text;
  }
  personality_insights.profile({
    // text: 'I am an optimist and will check and make sure if watson can detect that from the text I write here hopefully.',
    text: tweets_concatenated,
    language: 'en' },
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
  });
});
