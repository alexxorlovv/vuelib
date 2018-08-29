import Vue from 'vue'
import Component from 'vue-class-component'
//import LinkElement from '@elements/LinkElement.vue'
@Component({
    components: {
      //LinkElement
    },
    props: {

    }
})

class HeaderComponent extends Vue {
  name: string = 'header-component'
  dis:boolean = false

  toogleDisable(){
    this.dis = !this.dis
  }
}

export default HeaderComponent

