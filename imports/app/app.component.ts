import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CurrentUserForProfile = gql`{user}`;

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
      console.log(apollo);
      //  apollo.query({query: gql`{ user }`}).then(console.log);

   }

   ngOnInit() {
   this.apollo.watchQuery<any>({
     query: CurrentUserForProfile
   })
     .valueChanges
     .subscribe(({data}) => {
       console.log(data);
      //  this.loading = data.loading;
      //  this.currentUser = data.currentUser;
     });
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
