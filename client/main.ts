import '../imports/polyfills';
import { Meteor } from 'meteor/meteor';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../imports/app/app.module';
import { isBlank } from '@bomip/core';

Meteor.startup(() => {
  console.log(isBlank); 
  if (Meteor.isProduction) {
    enableProdMode();
  }
  platformBrowserDynamic().bootstrapModule(AppModule);

});
