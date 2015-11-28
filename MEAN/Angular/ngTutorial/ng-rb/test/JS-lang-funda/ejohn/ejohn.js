window.onload = function() {
  // console.log('hello on load using window.onload');
};

// Self-executing, temporary, function
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

  function highest(){ 
    return makeArray(arguments).sort(function(a,b){ 
      return b - a; 
    }); 
  } 

  // The arguments object is not an Array. It is similar to an Array, but does not have any Array properties except length.
  function makeArray(array){ 
    return Array().slice.call( array ); 
  } 

  console.log('the highest values is: ' + highest(1, 1, 2, 3)[0]);
  console.log('this also works: ' + Math.max.call( Math, 1, 1, 2, 3));

  console.log('/////////////////////////////////////////////////////////////');
  console.log('Closures');
  console.log('/////////////////////////////////////////////////////////////');

  var a = 5; 
  function runMe(a){ 
    console.log( "Check the value of a: " + a ); 

   function innerRun(){ 
     console.log( "Check the value of b: " + b ); 
     console.log( "Check the value of c: " + c ); 
   } 

   var b = 7; 
   innerRun(); 
   var c = 8; 
 } 
 runMe(6); 
 
 for ( var d = 0; d < 3; d++ ) { 
   setTimeout(function() {
     // tricky 
     console.log( "Check the value of d: " + d ); 
   }, 100); 
 }

 console.log('/////////////////////////////////////////////////////////////');
 console.log('Temporary Scope');
 console.log('/////////////////////////////////////////////////////////////');


var lib = null;

(function() {
    // common variables across all functions can be defined here
    var myLib = window.myLib1 = function() {

        this.func = function() {
            console.log('Inside myLib1 func');
        }
    }

    myLib.prototype.func = function() {
      console.log('this will never be called, will be overridden'); 
    }

    myLib.func2 = function() {
      console.log('Inside myLib1 func2');
    }

    // Prototyped properties affect all objects of the same constructor, simultaneously, even if they already exist.
    // func3 can only be called by an instance of myLib1
    myLib.prototype.func3 = function() {
      console.log('Inside myLib1 func3'); 
    }
})();
lib = new myLib1();
lib.func();
myLib1.func2();
lib.func3();

var myLib2 = (function(){ 
  function myLib(){ 
    this.func = function() {
      console.log('Inside myLib2 func');
    } 
  } 

  return myLib; 
})();
lib = new myLib2();
lib.func();

function myLib3(){ 
  this.func = function() {
    console.log('Inside myLib3 func');
  } 
}
lib = new myLib3();
lib.func();

  // broken closures in this loop!
  var count1 = 0; 
  for ( var i = 0; i < 4; i++ ) { 
    setTimeout(function(){ 
      console.log( "Broken - Check the value of i: " + i + "; count: " + count1++); 
    }, i * 200); 
  }

  // broken closures in this loop! - Fixed
  var count2 = 0; 
  for ( var i = 0; i < 4; i++ ) {
    (function(i){ 
      setTimeout(function(){ 
        console.log( "Fixed - Check the value of i: " + i + "; count: " + count2++); 
      }, i * 200); 
    })(i);
  }

 console.log('/////////////////////////////////////////////////////////////');
 console.log('Function Prototypes');
 console.log('/////////////////////////////////////////////////////////////');

 console.log('/////////////////////////////////////////////////////////////');
 console.log('Instance Type');
 console.log('/////////////////////////////////////////////////////////////');


window.assert = function(isTrue, printString) {
  if (isTrue) {
    console.log("PASS: " + printString)
  } else {
    console.log("FAIL: " + printString)
  }
}

function Inst_Test(){} 
 
var inst_test = new Inst_Test(); 
 
assert( typeof inst_test == "object", "However the type of the instance is still an object." );   
assert( inst_test instanceof Inst_Test, "The object was instantiated properly." ); 
assert( inst_test.constructor == Inst_Test, "The ninja object was created by the Ninja function." );

 console.log('/////////////////////////////////////////////////////////////');
 console.log('Inheritance');
 console.log('/////////////////////////////////////////////////////////////');

function ClassA(){}
ClassA.prototype.dance = function(){};

function ClassB(){}

// Achieve similar, but non-inheritable, results
ClassB.prototype = ClassA.prototype;

var objctB = new ClassB();
assert( objctB instanceof ClassB, "objectB receives functionality from the ClassA prototype" );
assert( objctB instanceof ClassA, "... and the ClassB prototype" );
assert( objctB instanceof Object, "... and the Object prototype" );

ClassB.prototype = new ClassA(); // this to works

objctB = new ClassB();
assert( objctB instanceof ClassB, "objectB receives functionality from the ClassA prototype" );
assert( objctB instanceof ClassA, "... and the ClassB prototype" );
assert( objctB instanceof Object, "... and the Object prototype" );


 console.log('/////////////////////////////////////////////////////////////');
 console.log('Built-in Prototypes');
 console.log('/////////////////////////////////////////////////////////////');

 console.log('/////////////////////////////////////////////////////////////');
 console.log('Enforcing Function Context');
 console.log('/////////////////////////////////////////////////////////////');

 console.log('/////////////////////////////////////////////////////////////');
 console.log('Function Length');
 console.log('/////////////////////////////////////////////////////////////');

function addMethod(object, name, fn){ 
  // Save a reference to the old method 
  var old = object[ name ]; 
 
  // Overwrite the method with our new one 
  object[ name ] = function(){ 
    // Check the number of incoming arguments, 
    // compared to our overloaded function 
    if ( fn.length == arguments.length ) 
      // If there was a match, run the function 
      return fn.apply( this, arguments ); 
 
    // Otherwise, fallback to the old method 
    else if ( typeof old === "function" ) 
      return old.apply( this, arguments ); 
  }; 
} 
 
function Ninjas(){ 
  var ninjas = [ "Dean Edwards", "Sam Stephenson", "Alex Russell" ]; 
  addMethod(this, "find", function(){ 
    return ninjas; 
  }); 
  addMethod(this, "find", function(name){ 
    var ret = []; 
    for ( var i = 0; i < ninjas.length; i++ ) 
      if ( ninjas[i].indexOf(name) == 0 ) 
        ret.push( ninjas[i] ); 
    return ret; 
  }); 
  addMethod(this, "find", function(first, last){ 
    var ret = []; 
    for ( var i = 0; i < ninjas.length; i++ ) 
      if ( ninjas[i] == (first + " " + last) ) 
        ret.push( ninjas[i] ); 
    return ret; 
  }); 
} 
 
var ninjas = new Ninjas(); 
assert( ninjas.find().length == 3, "Finds all ninjas" ); 
assert( ninjas.find("Sam").length == 1, "Finds ninjas by first name" ); 
assert( ninjas.find("Dean", "Edwards").length == 1, "Finds ninjas by first and last name" ); 
assert( ninjas.find("Alex", "X", "Russell") == null, "Does nothing" );
})();
