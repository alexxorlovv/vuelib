// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vue2-animate/dist/vue2-animate.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'

import './assets/base.styl'
import Vue from 'vue'
import Main from './Main/Main.vue'
import routerData from './router'
import Vuex from 'vuex'
import storeFile from './store/'
import vuexI18n from 'vuex-i18n'
import ruLocale from './i18n/ru'
import enLocale from './i18n/en'
import VueResource from 'vue-resource'
import moment from 'moment'
import VueCookies from 'vue-cookies'
import VueRouterTitle from 'vue-router-title'
import VeeValidate from 'vee-validate'
import VueMask, { VueMaskDirective } from 'v-mask'
import VueLodash from 'vue-lodash'
import vuescroll from 'vuescroll'
import _ from 'lodash'
import Tooltip from './directives/Tooltip'
import Abroad from './directives/Abroad'
import shortKey from 'vue-shortkey'
import VueHotkey from 'v-hotkey'
import LinkElement from '@elements/LinkElement.vue'
Vue.use(VueHotkey)
Vue.use(shortKey)
Vue.use(VueLodash, _)
// import VeeValidateRu from 'vee-validate/dist/locale/ru'
import Router from 'vue-router'

Vue.use(Router)


Vue.component("LinkElement", LinkElement)

declare module 'vue/types/vue' {
  // 3. Объявите расширение для Vue
  interface Vue {
    _: any,
    menuTimeoutTimer: any,
    menuTimeoutEnabled: any
  }
  interface VueRouter {
    options: any,
    push: any
  }
  interface VueClass<Vue> {
    components: any
  }
}
let router = new Router(routerData)
Vue.use(vuescroll)


Vue.config.performance = true

const configValidate = {
  locale: 'ru',
  dictionary: {ru: 'vee-validate/dist/locale/ru'}
}
Vue.use(VeeValidate, configValidate)
Vue.use(VueMask)
Vue.directive('mask', VueMaskDirective)


// declare global{
//   interface Window {
//     closeAbroad: any;
//   }
// }

Vue.config.productionTip = false

Vue.use(Vuex)





/*
Animation event types:
  transitionrun  - enter
  transitionstart
  transitionend
  transitioncancel
*/

/*
Tooltip
1. Enabled/Dsiabled
2. Placement: Top\Left\Right\Bottom
3. Trigger: Hover\Click\...
4. Theme: Dark\...
5. Content: Text
It is ok.

bind: вызывается однократно, при первичном связывании директивы с элементом. Здесь можно поместить код инициализации.
inserted: вызывается после вставки связанного элемента внутрь элемента родителя (заметьте, что сам родитель может на этот момент и не принадлежать ещё основному дереву элементов).
update: вызывается после обновления VNode компонента-контейнера, но, возможно, до обновления дочерних элементов. Значение директивы к этому моменту может измениться, а может и нет. Сравнивая текущее и прошлое значения, вы можете избежать избыточных операций (см. ниже об аргументах хуков).
componentUpdated: вызывается после обновления как VNode компонента-контейнера, так и VNode его потомков.
unbind: вызывается однократно, при отвязывании директивы от элемента.
*/


Vue.directive("tooltip", Tooltip)
Vue.directive("abroad", Abroad)

const store = new Vuex.Store(storeFile)
const defaultLocale = 'ru'

moment.locale(defaultLocale)

// Vue.use(VueAxios, axios)
Vue.use(VueResource)
Vue.use(vuexI18n.plugin, store)


Vue.i18n.add('ru', ruLocale)
Vue.i18n.add('en', enLocale)
Vue.i18n.set(defaultLocale)

Vue.use(VueRouterTitle, {
  store,
  router,
  defaultTitle: 'application'
})



new Vue({
  el: '#app',
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  store,
  router,
  template: '<Main/>',
  components: { Main }
})

