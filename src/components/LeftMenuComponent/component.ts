import Vue from 'vue'
import Component from 'vue-class-component'
import ElementComponent from './components/ElementComponent.vue'
import SectionComponent from './components/SectionComponent.vue'
import { Watch } from 'vue-property-decorator'
import menuData from './menu'

@Component({
    components: {
      ElementComponent,
      SectionComponent,
    },
    props: {

    }
})

class LeftMenuComponent extends Vue {
  name: string = 'LeftMenuComponent'
  isOpen: boolean = false
  isClose: boolean = false
  openClass = "opened"
  closeClass = "closed"
  isCloseChildren: boolean = false
  elements:any = menuData.elements
  sections:any = menuData.sections

  closeChildrenHandler() {
    // childrens -> CloseEvent Run
    this.isCloseChildren = true
    this.$nextTick(()=>{
      this.isCloseChildren = false
    })
  }

  close(){
    this.isClose = true
    this.$nextTick(()=>{
      this.isClose = false
    })
  }

  mounted(){

  }

  toogle() {
    this.close()
    this.isOpen = !this.isOpen
    //this.$nextTick(()=>this.isOpen = !this.isOpen)
    //setTimeout(()=>this.isOpen = !this.isOpen,15)

  }

}

class ElementMenu
{
  icon: string
  link: string
  name: string
  counter?: number
  sub: any[]

  constructor(icon: string, text: string, link: string, counter: number){}
}

export default LeftMenuComponent

