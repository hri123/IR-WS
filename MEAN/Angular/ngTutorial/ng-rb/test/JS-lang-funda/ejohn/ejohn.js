window.onload = function() {
  // console.log('hello on load using window.onload');
};

(function() {

  // console.log('hello on load using anonymous function');

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Goal: To be able to understand this function:');

  // Function.prototype.bind = function() {
  //   var fn = this,
  //     args = Array.prototype.slice.call(arguments),
  //     object = args.shift();
  //   return function() {
  //     return fn.apply(object,
  //       args.concat(Array.prototype.slice.call(arguments)));
  //   };
  // };

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Defining Functions');
  console.log('/////////////////////////////////////////////////////////////');

  console.log('isNimble before the function definition: ' + isNimble); // works as isNimble is the actual function name

  function isNimble() {
    return true;
  }

  console.log('canFly before the function definition: ' + canFly); // return undefined before the actual assignment

  var canFly = function() {
    return true;
  };

  console.log('canFly after the function definition: ' + canFly); // works fine

  window.isDeadly = function() {
    return true;
  };

  // console.log(isNimble, canFly, isDeadly); // console.log can take multiple parameters

  var dualName = function myDualName() {
    console.log("This function is named two things - at once!");
  };
  dualName();

  console.log('typeof myDualName: ' + typeof myDualName);

  console.log(dualName);

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Named Functions');
  console.log('/////////////////////////////////////////////////////////////');

  var ninja = {
    yell_noNameFunc: function(n) {
      return n > 0 ? ninja.yell_noNameFunc(n - 1) + "a" : "hiy";
    },
    yell_noNameFuncWithThis: function(n) {
      return n > 0 ? this.yell_noNameFuncWithThis(n - 1) + "a" : "hiy";
    },
    yell_namedFunc: function yell_namedFunc(n) {
      return n > 0 ? yell_namedFunc(n - 1) + "a" : "hiy";
    },
    yell_noNameFuncWithCallee: function(n) {
      return n > 0 ? arguments.callee(n - 1) + "a" : "hiy";
    }

  };
  console.log("ninja.yell_noNameFunc(4) == 'hiyaaaa': ", ninja.yell_noNameFunc(4) == 'hiyaaaa'); // using comma in console.log, using '+' is not giving results as expected, needs to be investigated

  var samurai = {
    yell_noNameFunc: ninja.yell_noNameFunc,
    yell_noNameFuncWithThis: ninja.yell_noNameFuncWithThis,
    yell_namedFunc: ninja.yell_namedFunc,
    yell_noNameFuncWithCallee: ninja.yell_noNameFuncWithCallee
  };
  var ninja = null;

  try {
    console.log('samurai.yell_noNameFunc(4): ' + samurai.yell_noNameFunc(4));
  } catch (e) {
    console.log("Uh, this isn't good! Where'd ninja.yell_noNameFunc go?");
  }
  console.log('samurai.yell_noNameFuncWithThis(4): ' + samurai.yell_noNameFuncWithThis(4));
  console.log('samurai.yell_namedFunc(4): ' + samurai.yell_namedFunc(4));
  console.log('samurai.yell_noNameFuncWithCallee(4): ' + samurai.yell_noNameFuncWithCallee(4));

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Functions as Objects');
  console.log('/////////////////////////////////////////////////////////////');

  var obj = {};
  var fn = function() {};
  obj.prop = "some value";
  fn.prop = "some value";
  console.log('obj.prop == fn.prop: ', obj.prop == fn.prop);

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Context');
  console.log('/////////////////////////////////////////////////////////////');

  function katana(){ 
    this.isSharp = true; 
  } 
  katana(); 
  console.log('A global object now exists with that name and value: ', this.isSharp);

  function katana2() {
    this.isSharp2 = true;
  }

  var var_katana2 = new katana2();
  console.log('A global object does not exist with that name and value: ', this.isSharp2);
  console.log('A member variables exists with that name and value: ', var_katana2.isSharp2);

  var context_object = {}; 
  function context_fn(dummyVar) {
    return this; 
  } 
  console.log("The context is the global object.", context_fn(10) == this);
  console.log("The context is changed to a specific object.", context_fn.call(context_object, 10) == context_object); // call takes individual values for arguments
  console.log("The context is changed to a specific object.", context_fn.apply(context_object, [10]) == context_object); // apply takes array

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Instantiation');
  console.log('/////////////////////////////////////////////////////////////');

  function User(first, last){ 
    if ( !(this instanceof User) )  // make it more generic - use - if (!(this instanceof arguments.callee))
      return new User(first, last); 

    this.name = first + " " + last; 
  } 

  var name = "Resig"; 
  var user = User("John", name);
  console.log('make sure that the new operator is always used: ' + user.name);

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Flexible Arguments');
  console.log('/////////////////////////////////////////////////////////////');


})();
