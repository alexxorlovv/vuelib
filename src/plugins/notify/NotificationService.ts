import Notification from './Notification'
import NotificationOptions from './NotificationOptions'
import Vue from 'vue'
import uuidv1 from 'uuid/v1'



enum NotificationType
{
  notify = "notify", confirm = "confirm", prompt = "prompt"
}

/*


*/


class NotifyEvent
{
  theme: string
  title: string
  message: string
  settings: object
  eventType: NotificationType
  id: Symbol
  constructor(eventType: NotificationType, theme: string, title: string, message: string, settings: object){
    this.eventType = eventType
    this.theme = theme
    this.title = title
    this.message = message
    this.settings = settings
    this.id = uuidv1()
  }
}

class MessageSettings
{
  duration: 500
  position:string = "right-bottom"
  border:string = "curved"
  icon: string
  iconType: string = "fill"
  type: string = "fill"
  isClose: boolean = true
  buttons: Array<any> = []
}

enum MessageType
{
  info, warning, danger, success
}

class NotificationService
{
  protected options: NotificationOptions
  protected nonitfications: Notification[]
  protected type:NotificationType =  NotificationType.notify
  protected readonly emitter: Vue

  constructor(options : NotificationOptions){
    this.options = options
    this.emitter = new Vue()
  }
  on(event: string | Array<string>, callback: any){
    this.emitter.$on(event, callback)
  }

  confirm(type: string, title: string, message: string, callback: any, settings:object){
    let defaultSettings = new MessageSettings()
    settings = {...defaultSettings, ...settings}

    const notify = new NotifyEvent(NotificationType.confirm, type, title, message, settings)
    this.emitter.$emit("notify", notify)
  }



  prompt(inputs: any, buttons: any){
    this.type = NotificationType.prompt
  }

  message(type: string, title: string, message: string, settings: object):void {
    let defaultSettings = new MessageSettings()
    settings = {...defaultSettings, ...settings}
    const notify = new NotifyEvent(NotificationType.notify, type, title, message, settings)
    this.emitter.$emit("notify", notify)
  }
  danger(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"error"}
    this.message("danger", title, message, {...defaultSettings, ...settings})
  }
  success(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"ok"}
    this.message("success", title, message, {...defaultSettings, ...settings})
  }
  warning(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"error"}
    this.message("warning", title, message, {...defaultSettings, ...settings})
  }
  info(title: string, message: string, settings: object):void {
    const defaultSettings = {icon:"info"}
    this.message("info", title, message, {...defaultSettings, ...settings})
  }




  getOptions(): NotificationOptions {
    return this.options
  }


}

export default NotificationService
