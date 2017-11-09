import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState, makeStateKey } from '@angular/platform-browser';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink, HttpLinkHandler } from 'apollo-angular-link-http';
import { InMemoryCache, NormalizedCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';

// GraphiQL: http://localhost:3000/graphiql
const uri = 'http://localhost:3000/graphql';

const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  exports: [
    BrowserTransferStateModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  cache: InMemoryCache;
  link: ApolloLink;

  constructor(
    private apollo: Apollo,
    private readonly transferState: TransferState,
    private httpLink: HttpLink
  ) {
    // this.cache = new InMemoryCache().restore(window.__APOLLO_STATE__);
    this.cache = new InMemoryCache();

    // const http = createHttpLink({ uri: Meteor.absoluteUrl('graphql'), fetch: fetch, ssrMode: true });
    const http = this.httpLink.create({ uri: uri });

    const middlewareLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('meteor-login-token', Accounts._storedLoginToken() || '')
      });
      return forward(operation);
    })

    this.link = middlewareLink.concat(http);

    this.apollo.create({
      link: this.link,
      cache: this.cache,
    });

    if (Meteor.isClient) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }

  onServer() {
    this.transferState.onSerialize(STATE_KEY, () =>
      this.cache.extract()
    );
  }

  onBrowser() {
    const state = this.transferState.get<NormalizedCache>(STATE_KEY, null);

    this.cache.restore(state);
  }
}
