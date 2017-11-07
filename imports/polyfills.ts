import 'core-js/es7/reflect';
const oldThen = Promise.prototype.then;
Object.defineProperty(Promise.prototype, "then", {
  set: function(){
    return;
  },
  get(){
    return oldThen;
  }
});
require('zone.js');

declare var module : any;
global['System'] = {
  import(path: string){
    return module.dynamicImport(path);
  }

  // Client entry point, imports all client code
// 'use strict';
// import 'reflect-metadata';
// import 'zone.js/dist/zone.js';
// import 'zone.js/dist/long-stack-trace-zone';
//
// import '/imports/startup/client/index';
// import '/imports/startup/both';
