import Vue from "vue"
import Component from "vue-class-component"
import IconElement from "@elements/IconElement.vue"
import BadgeElement from "@elements/BadgeElement.vue"
import { Watch } from 'vue-property-decorator'
import MenuItemListComponent from './../MenuItemListComponent.vue'
import ListItemElement from '@elements/ListItemElement.vue'
import CollapseTransitionElement from '@elements/CollapseTransitionElement.vue'
@Component({
  components: {
    IconElement,
    BadgeElement,
    ListItemElement,
    CollapseTransitionElement
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    element: Object,
    isFirst: Boolean,
    placement: String,
    isHover: {
      type: Boolean,
      required: false,
      default: false
    },
    isOpen: Boolean,
    isClose: {
      type: Boolean,
      required: false,
      default: false
    },
    isCloseChildrenProp: Boolean,
    isDiactiveMenu: Boolean,
    firstOpen: Boolean
  }
})
export default class MenuItemComponent extends Vue {
  public name: string = "MenuItemComponent"
  public isShow: boolean = false
  public element: any
  public isInit: boolean = false
  public isCloseChildrenProp: boolean
  public isCloseChildren: boolean = false
  public isActiveMenu = false
  public activeMenuInit = false
  public isFirst: boolean
  public placement: string
  public timeoutKey: any;
  public intervalKey: any;
  public keydownEnabled = false;
  get clearedCounter() {
    if (this.element.counter) {
      if (this.element.counter > 99) {
        return '99+'
      }
      return this.element.counter
    }
    return 0
  }
  constructor() {
    super();
  }
  fullCloseEventHandler(focus?: boolean) {
    this.$emit("fullCloseEvent", focus)
  }
  keyDownHandler(e: any) {
    e.preventDefault();
    if (e.key === "Enter" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if(!this.$root.menuTimeoutTimer && !this.$root.menuTimeoutEnabled) {
        this.$root.menuTimeoutTimer = setTimeout(()=>{
          clearTimeout(this.$root.menuTimeoutTimer)
          this.$root.menuTimeoutTimer = false
          this.$root.menuTimeoutEnabled = true
        },700)
      }
      if (!this.keydownEnabled && this.$root.menuTimeoutEnabled) {
        this.keydownEnabled = true;
        this.timeoutKey = setTimeout(() => {
          this.keydownEnabled = false
          this.handlerMenuKey(e);
        }, 300);
      }
    }
  }
  keyUpHandler(e: any) {
    if (e.key === "Enter" || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (this.$root.menuTimeoutTimer) {
        clearTimeout(this.$root.menuTimeoutTimer)
        this.$root.menuTimeoutTimer = false
      }
      if (!this.$root.menuTimeoutEnabled) {
        this.handlerMenuKey(e);
      } else {
        this.$root.menuTimeoutEnabled = false
      }

      if (this.keydownEnabled) {
        clearTimeout(this.timeoutKey);
        this.keydownEnabled = false;
        this.handlerMenuKey(e);
      }
    }
  }
  handlerMenuKey(e: any) {
    let nextKey = ""
    let prevKey = ""
    if (this.placement === "left") {
      nextKey = "ArrowRight"
      prevKey = "ArrowLeft"
    } else if (this.placement === "right") {
      nextKey = "ArrowLeft"
      prevKey = "ArrowRight"
    }
    if (e.key === "Enter" && (this.element.sub.length === 0 || (this.element.link.length > 0 && this.element.isActiveLink))) {
      this.$router.push(this.element.link)
      this.$emit("fullCloseEvent",true)
    }
    if (e.key === "ArrowDown") {
      let parent = e.srcElement.parentElement.parentElement;
      if (e.srcElement.nextSibling) {
        e.srcElement.nextSibling.focus()
      } else if ((parent.nextSibling.className === "menu__elements" || parent.nextSibling.className === "menu__sections") && this.isFirst) {
        parent.nextSibling.querySelector(".list > .menu__item.menu__item-first").focus()
      } else if (this.isFirst) {
        parent.parentElement.querySelector(".menu__elements > .list > .menu__item.menu__item-first").focus()
      }

      if (!this.isFirst && !e.srcElement.nextSibling) {
        e.srcElement.parentElement.querySelector("li").focus()
      }

    }
    if (e.key === "ArrowUp") {
      let parent = e.srcElement.parentElement.parentElement;
      if (e.srcElement.previousSibling.nodeName === "LI") {
        e.srcElement.previousSibling.focus()
      } else if ((parent.previousSibling.className === "menu__elements" || parent.previousSibling.className === "menu__sections") && this.isFirst) {
        parent.previousSibling.querySelector(".list > .menu__item.menu__item-first:last-child").focus()
      } else if (this.isFirst) {
        let elems = parent.parentElement.querySelectorAll(".list > .menu__item.menu__item-first")
        if (elems.length > 0) {
          elems[elems.length - 1].focus()
        }
      }

      if (!this.isFirst && e.srcElement.previousSibling.nodeName !== "LI") {
        e.srcElement.parentElement.children[e.srcElement.parentElement.children.length - 1].focus()
      }

    }
    if (e.key === nextKey && this.element.sub.length > 0) {
      this.show()
      this.$nextTick(() => { e.srcElement.querySelector(".list>li").focus() })
    }
    if (e.key === prevKey && !this.isFirst) {
      this.$emit("parentCloseEvent")
      this.$nextTick(() => {
        e.srcElement.parentElement.parentElement.focus()
      })
    }
  }

  parentCloseEventHandler() {
    this.hide()
  }
  diactiveMenuHandler() {
    this.$emit("diactiveMenuEvent")
  }

  mouseStart(e: MouseEvent) {
    if (!this.isShow) {
      this.isShow = true
    }
  }
  mouseEnd(e: MouseEvent) {
    if (this.isShow) {
      this.isShow = false
    }
  }

  closeChildrenHandler() {
    this.isCloseChildren = true
    this.$nextTick(() => {
      this.isCloseChildren = false
    })
  }


  /* Отправляем Item List Что нужно закрыть всех Item текущего уровня кроме этого */
  show() {
    this.isShow = true
    this.isInit = true

    this.$emit("closeChildrenEvent")
    this.$nextTick(() => {
      if (this.isFirst) {
        this.$emit("firstOpenEvent")
      }
    })
  }
  hide() {
    if (this.isFirst && this.isShow) {
      this.$emit("firstCloseEvent")
    }
    this.isShow = false

    this.closeChildrenHandler() //Говорим дочерним компонентам что им нужно закрытся
  }
  toogle() {
    this.isShow ? this.hide() : this.show()
  }

  activeMenuHandler() {
    this.isActiveMenu = true
    this.$emit("activeMenuEvent")
  }

  /* ItemList верхнего уровня  нам сказал что нужно закрыть и все дочерние элементы */
  @Watch('isCloseChildrenProp')
  CloseChildrenWatch(isCloseChildrenPropValue: boolean, oldVal: boolean) {
    /* Если я инициатор то мне не нужно закрыватся */
    if (isCloseChildrenPropValue && !this.isInit) {
      this.hide()
      //this.$emit("closeChildrenEvent")
    }
    if (this.isInit) {
      this.isInit = false
    }
  }
  @Watch('isClose')
  closeWatch(isCloseValue: boolean, oldVal: boolean) {
    if (isCloseValue) {
      this.hide()
    }
  }
  @Watch('$route')
  routeChange(to: any, from: any) {
    if (this.element.sub.length === 0) {
      if (this.element.link === to.path && this.isActiveMenu === false) {
        this.isActiveMenu = true
        this.activeMenuInit = true
        this.$emit("diactiveMenuEvent")
        this.$nextTick(() => {
          this.$emit("activeMenuEvent")
        })
      }
    }
    //Отслеживаем только если нет sub elements

    //Если измененный роут равен линку итема
    //То:
    // 1 делаем итем активным
    // Отправляем событие о том что нужно сделать все элементы не активными кроме этого
    // Посылаем событие ListItem - о том что данный item является активным
  }

  @Watch("isDiactiveMenu")
  diactiveMenuChange(to: boolean, from: boolean) {
    if (!this.activeMenuInit && to) {
      this.isActiveMenu = false
    }
    if (this.activeMenuInit) {
      this.activeMenuInit = false
    }
  }

  beforeCreate() {
    this.$options.components.MenuItemListComponent = MenuItemListComponent
  }
  mounted() {
  }

  created() {
    if (this.$route.path === this.element.link && this.isActiveMenu === false) {
      this.isActiveMenu = true
      this.activeMenuInit = true
      this.$emit("diactiveMenuEvent")
      this.$nextTick(() => {
        this.$emit("activeMenuEvent")
      })
    }
  }
}
