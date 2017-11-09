import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import HttpLink from 'apollo-link-http';
import Cache from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { HttpHeaders } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export class AppComponent {
  //Dynamic title change along with router
  private titleChangeSubscription: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private apollo: Apollo
  ) {
  }

  ngOnInit() {
    const httpLink = createHttpLink({ uri: '/graphql' });
    const middlewareLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('meteor-login-token', Accounts._storedLoginToken())
      });
      return forward(operation);
    })

    // use with apollo-client
    const link = middlewareLink.concat(httpLink);



    //  const httpLink = new HttpLink({ uri: '/graphql' });
    //  const middlewareLink = new ApolloLink((operation, forward) => {
    //    operation.setContext({
    //      headers: {
    //        'meteor-login-token': Accounts._storedLoginToken(),
    //      },
    //    });
    //    return forward(operation);
    //  });
    //
    //  const link = middlewareLink.concat(httpLink);

    // const client = new ApolloClient({
    //   link,
    //   cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
    // });
    //
    // console.log(client);
    //  console.log(this.apollo);
    const query = gql`{user {_id}}`;
    // const query = gql`
    // query TodoApp {
    //       todos {
    //         id
    //         text
    //         completed
    //       }
    //     }
    // `;
    // const q = client.query({query: query}).then((data)=> console.log(data)).catch(error => console.error(error));
    const q = this.apollo.query({query: query});
    q.subscribe((d) => { console.log(d); });
    // console.log(q);


    //  this.apollo.watchQuery<any>({
    //    query: CurrentUserForProfile
    //  })
    //    .valueChanges
    //    .subscribe(({data}) => {
    //      console.log(data);
    //     //  this.loading = data.loading;
    //     //  this.currentUser = data.currentUser;
    //    });
  }
  // ngOnInit() {
  //   this.titleChangeSubscription =
  //     this.router.events
  //       .filter((event) => event instanceof NavigationEnd)
  //       .map(() => this.activatedRoute)
  //       .map((route) => {
  //         while (route.firstChild) route = route.firstChild;
  //         return route;
  //       })
  //       .filter((route) => route.outlet === 'primary')
  //       .mergeMap((route) => route.data)
  //       .subscribe((event) => this.titleService.setTitle(event['title']));
  // }
  // ngOnDestroy() {
  //   this.titleChangeSubscription.unsubscribe();
  // }
}
