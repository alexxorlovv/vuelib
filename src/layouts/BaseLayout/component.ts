import Vue from 'vue'
import Component from 'vue-class-component'
import LeftMenuComponent from '@components/LeftMenuComponent.vue'
import VerticalMenuComponent from '@components/VerticalMenuComponent.vue'
import RightMenuComponent from '@components/RightMenuComponent.vue'
import UserMenuComponent from '@components/UserMenuComponent.vue'
import HeaderComponent from '@components/HeaderComponent.vue'
import FooterComponent from '@components/FooterComponent.vue'
@Component({
    components: {
        LeftMenuComponent,
        VerticalMenuComponent,
        RightMenuComponent,
        UserMenuComponent,
        HeaderComponent,
        FooterComponent
    },
    props: {

    }
})

class BaseLayout extends Vue {
  name: string = 'BaseLayout'
  isOpen: boolean = false
  dataMenu: string = "router"
  keyControl: boolean = false
  dataMenuTypes: Array<string> =[
    "router",
    "data"
  ]
  toogle(){
    this.isOpen = !this.isOpen
  }
  changeMenuCallback(change: boolean) {
    this.isOpen = change
  }
  keyControlOffHandler() {
    this.keyControl = false
  }
  keyMenu(e:any){
    if (e.srcKey === 'toogle' || e.srcKey === 'toogleRus') {
      this.toogle()
    }
    console.log("use")
    let focusElement = e.srcElement.querySelector(".menu__elements > .list > li")
    focusElement.focus({ preventScroll: true})
    this.keyControl = true
  }
}

export default BaseLayout
