import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';
import { createHttpLink } from 'apollo-link-http';

@NgModule({
  imports: [
    // Transition between server and client
    BrowserModule.withServerTransition({
      appId: 'bomip-universal'
    }),
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'todoList',
        component: TodoListComponent,
        data: {
          title: 'Todo List'
        }
      },
      {
        path: 'todoAdd',
        loadChildren: './todo-add/todo-add.module#TodoAddModule',
        data: {
          title: 'Add Todo'
        }
      },
      // Home Page
      {
        path: '',
        redirectTo: '/todoList',
        pathMatch: 'full'
      },
      // 404 Page
      {
        path: '**',
        component: PageNotFoundComponent,
        data: {
          title: '404 Page Not Found'
        }
      }
    ]),
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
  ],
  declarations: [
    AppComponent,
    TodoListComponent,
    PageNotFoundComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // const httpLink = new HttpLink({ uri: '/graphql' });
    // const http = httpLink.create({ uri: '/graphql' });
    // const authMiddleware = new ApolloLink((operation, forward) => {
    //   operation.setContext({
    //     headers: new HttpHeaders().set('meteor-login-token', Accounts._storedLoginToken())
    //   });
    //   return forward(operation);
    // });

    const http = createHttpLink({ uri: '/graphql' });
    const middlewareLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set('meteor-login-token', Accounts._storedLoginToken())
      });
      return forward(operation);
    })

    // use with apollo-client
    const link = middlewareLink.concat(http);

    apollo.create({
      // By default, this client will send queries to the
      // `/graphql` endpoint on the same host
      // link: httpLink.create({ uri: '/graphql' }),
      link: link,
      cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
    });
  }
}
