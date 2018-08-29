import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import Vue from 'vue'

@Module({ namespaced: true })
export default class Menu extends VuexModule {
  public menuList: {[key: string] : Array<any>} = {}
  public isLoaded: boolean = false


  @Mutation
  addMenu(payload: any) {
    Vue.set(this.menuList, payload.name, payload.data)
  }

  @Mutation
  loaded(payload: any) {
    this.isLoaded = true
  }

}
