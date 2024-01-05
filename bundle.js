(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  function add (f, s) {
    console.log(f + s);
  }

  function sub (f, s) {
    console.log(f - s);
  }

  sub(2, 4);
  add(4, 4);

}));
