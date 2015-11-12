// Usage
// node node_modules/karma/bin/karma start test/bld_yr_ng/karma.conf.js
// in the directory C:\H\C\GitHub\IR-WS\MEAN\Angular\ngTutorial\ng-rb

// Can be shared using jsbin - http://output.jsbin.com/mawizo/embed?html,js,output


module.exports = function(config){
  config.set({

    basePath : '../../',

    files : [
      'bld_yr_ng/src/**/*.js', // this line added for - build your own angularjs
      'test/bld_yr_ng/**/*.js' // this line added for - build your own angularjs
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
//            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};