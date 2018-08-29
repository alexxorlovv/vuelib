import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'


// export default {
//   state: {
//     wheels: 2
//   }
// }

@Module
export default class Interface extends VuexModule {
  public zIndex: number = 1
  public theme: string = "default"
  public themeList: Array<string> = []
  public menuList: object
  @Mutation
  incrWheels(extra: any) {
   // this.wheels += extra
  }
  // action 'incr' commits mutation 'increment' when done with return value as payload
 // @Action({ commit: 'increment' }) incr() { return 5 }
  get axles() {
   return 1
  }
}
