var watson = require('watson-developer-cloud');

var alchemy_language = watson.alchemy_language({
  api_key: '1c382fbd8937e1ab1591f696045c48a118a34051'
});

var params = {
  text: 'IBM Watson won the Jeopardy television show hosted by Alex Trebek'
};

alchemy_language.sentiment(params, function (err, response) {
  if (err)
    console.log('error:', err);
  else
    console.log(JSON.stringify(response, null, 2));
});
