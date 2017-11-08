import '../imports/polyfills';
import { Meteor } from 'meteor/meteor';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from '../imports/app/app.module';
import { isBlank } from '@bomip/core';
import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

// import App from '/imports/ui/App';

const client = new ApolloClient(meteorClientConfig());

Meteor.startup(() => {
  console.log(client);
  if (Meteor.isProduction) {
    enableProdMode();
  }
  platformBrowserDynamic().bootstrapModule(AppModule);

});
