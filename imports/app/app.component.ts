import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Apollo } from 'apollo-angular';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

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
    const query = gql`query {user {_id}}`;
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

    // const q = this.apollo.query({ query: query });
    // q.subscribe((d) => { console.log(d); });

    this.apollo.watchQuery<any>({ query: query })
      .valueChanges //rxjs
      .subscribe(({ data }) => {
        console.log(data);
        return data.feed;
        //  this.loading = data.loading;
        //  this.currentUser = data.currentUser;
      });

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
