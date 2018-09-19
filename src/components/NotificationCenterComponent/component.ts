import Vue from 'vue'
import Component from 'vue-class-component'
//import { Emit, Inject, Model, Prop, Provide, Watch } from 'vue-property-decorator'

import NotificationService from '@/plugins/notify/NotificationService'
import NotificationOptions from '@/plugins/notify/NotificationOptions'
//import NotificationService from '../../plugins/notify/NotificationService';

class Stack
{
  protected elements: any = []
  construct() {
  }
  pop() {
    return this.elements.pop()
  }
  push(element: any) {
    this.elements.push(element)
  }
  count() {
    return this.elements.length
  }
  isEmpty() {
    return this.elements.length === 0 ? true : false
  }
}


@Component({
    components: {

    },
    props: {
      // position: {
      //   type: String,
      //   required: false,
      //   default: "bottom-right",
      //   validator: function (value: string): boolean {
      //     return [
      //       'top-center', 'bottom-center', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'center-center', 'center-right', 'center-left'
      //     ].indexOf(value) !== -1
      //   }
      // },
      // zIndex: {
      //   type: String,
      //   required: false,
      //   default: "9999999999"
      // },
      // newestOnTop:{
      //   type: Boolean,
      //   required: false,
      //   default: false
      // },
      // offsetX: {
      //   type: String,
      //   required: false,
      //   default: "20px"
      // },
      // offsetY: {
      //   type: String,
      //   required: false,
      //   default: "20px"
      // },
      // spacing: {
      //   type: String,
      //   required: false,
      //   default: "10px"
      // },
    }
})

export default class NotificationCenterComponent extends Vue {
  name: string = 'NotificationCenterComponent'


  opts: NotificationOptions

  leftTopNotifications:any = {}
  leftCenterNotifications:any = {}
  leftBottomNotifications:any = {}

  rightTopNotifications:any = {}
  rightCenterNotifications:any = {}
  rightBottomNotifications:any = {}

  centerTopNotifications:any = {}
  centerCenterNotifications:any = {}
  centerBottomNotifications:any = {}


  namesCache = {}
  namesNotification: any = {
    "left-top":{name:"leftTopNotifications", leave: "fadeOutLeft", enter: "fadeInLeft"},
    "left-center":{name:"leftCenterNotifications", leave: "fadeOutLeft", enter: "fadeInLeft"},
    "left-bottom":{name:"leftBottomNotifications", leave: "fadeOutLeft", enter: "fadeInLeft"},
    "center-top":{name:"centerTopNotifications", leave: "fadeOutUp", enter: "fadeInDown"},
    "center-center":{name:"centerCenterNotifications", leave: "zoomOut", enter: "zoomIn"},
    "center-bottom":{name:"centerBottomNotifications", leave: "fadeOutDown", enter: "fadeInUp"},
    "right-top":{name:"rightTopNotifications", leave: "fadeOutRight", enter: "fadeInRight"},
    "right-center":{name:"rightCenterNotifications", leave: "fadeOutRight", enter: "fadeInRight"},
    "right-bottom":{name:"rightBottomNotifications", leave: "fadeOutRight", enter: "fadeInRight"}
  }

  notifyPositions: Array<string> = [
    "left-top",
    "left-center",
    "left-bottom",
    "center-top",
    "center-center",
    "center-bottom",
    "right-top",
    "right-center",
    "right-bottom",
  ]
  countNotify: any = {
    "all": 0,
    "left-top": 0,
    "left-center": 0,
    "left-bottom": 0,
    "center-top": 0,
    "center-center": 0,
    "center-bottom": 0,
    "right-top": 0,
    "right-center": 0,
    "right-bottom": 0
  }
  //allStack: any = new Stack()
  typeStack: any = {
    "left-top": [],
    "left-center": [],
    "left-bottom": [],
    "center-top": [],
    "center-center": [],
    "center-bottom": [],
    "right-top": [],
    "right-center": [],
    "right-bottom": []
  }
  /*
  Notification Options
  ------------------------------------
    backdrop: number = -1
    animationDuration: number = 3000
    maxOnScreen: number = 8
    maxAtPosition: number = 6
    showProgressBar:boolean = true
    pauseOnHover:boolean = true
    closeOnClick:boolean = true
    newItemsOnTop:boolean = true
    spacing: string = "10px"
    offsetX: string = "20px"
    offsetY: string = "20px"
    zIndex: number = 999999999999999
  */


  // Важно чтобы они удалялись не только по анимации и сокрытию но и из dom то есть из коллекции
  // Можно делать анимацию с задержкой
  // и SetTimeout который удаляет элемент из списка и удаляет сам себя
  // а можно просто настроить transition-group и дело в шляпе и не нужны анимации с задержой, нужен только set-timeout

  // Еще важный момент нужно сделать анимацию у alert опциональной
  //Сюда по сути должны прийдти данные по alert которые мы регистрируем

  getStack(position: string): any{
    let cache = this.typeStack[position]
    if(typeof(cache) !== "undefined") {
      if(this.getSize('all') === this.opts.maxOnScreen) {
        return false;
      }
      if(this.getSize(position) < this.opts.maxAtPosition) {
        if(cache.length === 0) {
          return false;
        }
        return cache.pop()
      } else{
      }
    } else {
      console.error(`position: ${position} not found.`)
    }
    return false;
  }

  setStack(alert: any){
    let cache = this.typeStack[alert.settings.position]
    if(typeof(cache) !== "undefined") {
      cache.push(alert)
    } else {
      console.error(`position: ${alert.settings.position} not found.`)
    }
  }

  getSize(position:string) {
    if(typeof(this.countNotify[position]) !== "undefined") {
      return this.countNotify[position]
    } else {
      console.error(`position: ${position} not found.`)
      return 0
    }
  }
  increment(position: string){
    if(typeof(this.countNotify[position]) !== "undefined") {
      this.countNotify[position]++
      this.countNotify["all"]++
    } else {
      console.error(`position: ${position} not found.`)
    }
  }
  decrement(position: string){
    if(typeof(this.countNotify[position]) !== "undefined") {
      this.countNotify[position]--
      this.countNotify["all"]--
    } else {
      console.error(`position: ${position} not found.`)
    }
  }


  closeHandler(index: number, position: string) {
    let storage: any = this.getStorage(position)
    this.removeAlert(storage,alert)
  }

  getStorage(position: string)
  {
    let component: any = this
    let namePosition: any = this.namesNotification[position]

    if(typeof(namePosition) === "undefined") {
      console.error(`storage position: ${position} - not found.`)
      return false
    }
    let storage = component[namePosition.name]
    return storage
  }

  addAlert(position: string)
  {
    let alert: any = this.getStack(position)
    if(!alert) {
      return;
    }
    let notification = this.getStorage(alert.settings.position)
    this.$set(notification,alert.id,alert)
    this.increment(alert.settings.position)
    if(alert.eventType === 'notify') {
      this.removeForTime(notification, alert)
    }
  }

  removeAlert(storage: any,alert: any)
  {
    this.$delete(storage, alert.id)
    this.decrement(alert.settings.position)
  }

  removeForTime(storage: any, alert: any) {
    let timer = setTimeout(()=> {
      this.removeAlert(storage, alert)
      this.addAlert(alert.settings.position)
      clearTimeout(timer)
    },3000)
  }


  registerAlert(alert: any) {
   // this.$set(this.notifyCache,this.notifyCache.length, alert)
  }

  created() {
    this.opts = this.$notify.getOptions()
    console.log(this.opts)
    this.$notify.on("notify",(event: any)=>{
      this.setStack(event)
      this.addAlert(event.settings.position)
    })
  }
  mounted() {
  }
}

