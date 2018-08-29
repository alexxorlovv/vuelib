import Vue from 'vue'
import Component from 'vue-class-component'
import SideBarElement from '@elements/SideBarElement.vue'
import IconElement from '@elements/IconElement.vue'
import ListElement from '@elements/ListElement.vue'
import ListItemElement from '@elements/ListItemElement.vue'
import BadgeElement from '@elements/BadgeElement.vue'
import MenuItemListComponent from './components/MenuItemListComponent.vue'
import menuData from './menu'
import { Watch } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class'


const menu = namespace('menu')
//Vue.component("MenuItemComponent", MenuItemComponent)

@Component({
  components: {
    ListElement,
    SideBarElement,
    IconElement,
    ListItemElement,
    BadgeElement,
    MenuItemListComponent
  },
  props: {
    keyControl: {
      type: Boolean,
      required: false,
      default: false
    },
    dataMenu: {
      type: String,
      required: true,
      default: "router"
    },
    isOpenProp: {
      type: Boolean,
      required: true,
      default: false
    },
    theme: {
      type: String,
      required: false,
      default: 'default',
      validator: function (value: string): boolean {
        return [
          'default'
        ].indexOf(value) !== -1
      }
    },
    placement: {
      type: String,
      required: false,
      default: 'left',
      validator: function (value: string): boolean {
        return [
          'left',
          'right',
        ].indexOf(value) !== -1
      }
    },
    position: {
      type: String,
      required: false,
      default: 'static',
      validator: function (value: string): boolean {
        return [
          'static',
          'fixed',
        ].indexOf(value) !== -1
      }
    }
  }
})

export default class VerticalMenuComponent extends Vue {
  @menu.State('menuList') menuList: any
  name: string = 'VerticalMenuComponent'
  isOpen: boolean = true
  isClose: boolean = false
  theme: string
  placement: string
  position: string
  sections: any = {}
  topMenu: any = []
  bottomMenu: any = []
  dataMenu: string
  isOpenProp: boolean
  keyControl: boolean
  isCloseChildren: boolean = false
  isDiactiveMenu: boolean = false
  firstOpen: boolean = false


  sortListMenu(a:any, b:any){
    if(a.sort < b.sort) return 1
    if(a.sort > b.sort) return -1
    return 0
  }
  get sortedBottomMenu() {
    return this.bottomMenu.sort(this.sortListMenu)
  }
  get sortedTopMenu() {
    return this.topMenu.sort(this.sortListMenu)
  }

  get sortedSections(){
    let sortedSections:any = {}
    for(let section in this.sections) {
      sortedSections[section] = this.sections[section].sort(this.sortListMenu)
    }
    return sortedSections
  }

  firstOpenEventHandler() {
    this.firstOpen = true
  }
  firstCloseEventHandler() {
    this.firstOpen = false
  }
  diactiveMenuHandler() {
    this.isDiactiveMenu = true
    this.$nextTick(() => {
      this.isDiactiveMenu = false
    })
  }
  closeChildrenHandler() {
    this.isCloseChildren = true
    this.$nextTick(() => {
      this.isCloseChildren = false
    })
  }

  close() {
    this.isClose = true
    this.$nextTick(() => {
      this.isClose = false
      this.firstOpen = false
    })
  }
  fullCloseEventHandler(focus?: boolean){
    this.close()
    if(focus) {
      let element: any = this.$el.querySelector(".menu__elements > .list > li");
      element.focus({ preventScroll: true });
    }
  }
  keyControlOff() {
    this.$emit("keyControlOffEvent")
  }
  get classObject() {
    let classList: any = {
      'menu_left': false,
      'menu_right': false,
      'side-bar_fixed-right': false,
      'side-bar_fixed-left': false,
      'menu_closed': false,
      'key-control': false
    }
    if (this.placement === 'left') classList['menu_left'] = true
    if (this.placement === 'right') classList['menu_right'] = true
    if (this.placement === 'right' && this.position == 'fixed') classList['side-bar_fixed-right'] = true
    if (this.placement === 'left' && this.position == 'fixed') classList['side-bar_fixed-left'] = true

    if (!this.isOpen) { classList['menu_closed'] = true }
    else {classList['menu_closed'] = false}
    classList['key-control'] = this.keyControl
    let themeName: string = 'menu_theme_' + this.theme
    classList[themeName] = true

    return classList
  }
  created() {
    this.isOpen = this.isOpenProp

    if (this.isOpen) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
    if (this.dataMenu === "router") {
      let verticalMenu = this.menuList.verticalMenu
      this.topMenu = verticalMenu.top
      this.bottomMenu = verticalMenu.bottom
      this.sections = verticalMenu.sections
    }
  }

  closeMenu() {
    this.isOpen = false
    //this.$set(this.classObject, 'menu_closed', true)
    this.$emit("changeMenu", this.isOpen)
  }

  openMenu() {
    this.isOpen = true
   // this.$set(this.classObject, 'menu_closed', false)
    this.$emit("changeMenu", this.isOpen)
  }

  toogle(): void {
    this.close()
    if (this.isOpen) {
      this.closeMenu()
    } else {
      this.openMenu()
    }
  }

  @Watch('isOpenProp')
  openPropWatch(value: boolean, oldVal: boolean) {
    if (value) {
      this.openMenu()
    } else {
      this.closeMenu()
    }
  }
}
