import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@components/HelloWorld.vue'
import SignInPage from '@pages/SignInPage.vue'
import SignOutPage from '@pages/SignUpPage.vue'
import DashboardPage from '@pages/DashboardPage.vue'
import IndexPage from '@pages/IndexPage.vue'

import { RouterMode } from 'vue-router/types'
//import BaseRouters from '@applications/Base/router.ts'

Vue.use(Router)

let modeRoute: RouterMode = "history"

export default {
  mode: modeRoute,
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage,
      meta: { menu: { verticalMenu: { position: "top", sort: 2 } }, icon: "menu", title: "dashboard", isActiveLink: true },
      children: [
        {
          path: 'dashboard',
          component: DashboardPage,
          meta: { title: "account1", icon: "menu", counter: 12, counterTheme: "primary" }
        }, {
          path: 'dashboard',
          component: DashboardPage,
          meta: { title: "account6", icon: "menu", counter: 2, counterTheme: "primary", menu: {verticalMenu: {}} }
        }, {
          path: 'dashboard',
          component: DashboardPage,
          meta: { title: "account2", icon: "menu", counter: 999, counterTheme: "success", menu: { verticalMenu: {position:"bottom"} } }
        }, {
          path: 'dashboard',
          component: DashboardPage,
          meta: { title: "account3", icon: "menu", counter: 999, counterTheme: "success", menu: { verticalMenu: {position: "top"} } }
        }, {
          path: 'dashboard',
          component: DashboardPage,
          meta: { title: "account4", icon: "menu", counter: 1, counterTheme: "warning", menu: { verticalMenu: { position: "section", sectionName:"MultiAccounts" } } }
        }, {
          path: 'dashboard',
          component: DashboardPage,
          meta: { title: "account5", icon: "menu", counter: 0, counterTheme: "brand", menu: { verticalMenu: { position: "section", sectionName: "Accounts" } } }
        }
      ]
    },
    // {
    //   path: '/applications',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   children: BaseRouters,
    //   meta: {title: "Base"}
    // },
    {
      path: '/signin',
      name: 'signin',
      component: SignInPage,
      meta: { title: "Sign In", icon: "menu", menu: { verticalMenu: { sort: 1 } }, }
    },
    {
      path: '/messages',
      name: 'messages',
      component: DashboardPage,
      meta: { title: "Messages", icon: "menu", counter: 1, counterTheme: "success", menu: { verticalMenu: { position: "top", sort: 3 } }, position: "top" }
    },
    // {
    //   path: '/dashboard',
    //   name: 'dashboard',
    //   component: Dashboard,
    //   meta: {title: "Dashboard"}
    // },
    {
      path: '/signup',
      name: 'signup',
      component: SignOutPage,
      meta: { title: "Sign Up", menu: { verticalMenu: { } }, icon: "menu" }
    },
    {
      path: '/logout',
      name: 'logout',
      //component: SignOut,
      meta: { title: "Logout", menu: {verticalMenu: {position:"bottom"}}, icon: "menu" }
    }
  ]
}


