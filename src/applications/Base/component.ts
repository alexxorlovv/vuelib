import Vue from 'vue'
import Vuex from 'vuex'
import Component from 'vue-class-component'
import Application from '@core/Application'
import TypeApplication from '@core/TypeApplication'
import store from './store.ts'

//Vue.use(Vuex)
//Vue.$store.registerModule('base',store)


@Component({
    components: {
        //hello: HelloComponent
    },
    props: {

    }
})
class Base extends Application {
  public name = "Base"
  public description = "Base Test Application"
  public isDefault = false
  public type = TypeApplication.standart

  created(){
    this.$store.registerModule('base',store)

  }
}

export default Base
