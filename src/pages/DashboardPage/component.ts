import Vue from 'vue'
import BaseLayout from '@layouts/BaseLayout.vue'
import Component from 'vue-class-component'
import FormTextElement from '@elements/FormTextElement.vue'
import FormElement from '@elements/FormElement.vue'
import ButtonElement from '@elements/ButtonElement.vue'
import IconElement from '@elements/IconElement.vue'
function randomInteger(min: number, max: number): number {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}
function randomStr(m: number): string {
  var m = m || 9, s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < m; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
  return s;
};
@Component({
    components: {
      BaseLayout,
      FormTextElement,
      FormElement,
      ButtonElement,
      IconElement
    },
    props: {

    }
})

class DashboardPage extends Vue {
  name: string = "DashboardPage"
  showTop: boolean = true
  theme:string = 'focus'
  text: string = "My Text"
  themes:Array<string> = [
    "danger",
    "focus",
    "brand",
    "success",
    "warning",
    "primary",
    "secondary",
    "metal",
    "info",
    "lighter",
    "darker"
  ]
  placement: string = 'top'
  placements: Array<string> = [
    "left",
    "top",
    "right",
    "bottom"
  ]
  icons: Array<string> = ["home", "menu", "arrow-right", "arrow-down", "more", "delete"]
  icon: string = "home"

  buttons:any = [
    {
      callback: function(alert: any){alert.hide();},
      settings:{
        text: "Click me",
        textTransform: "capitalize",
        icon: "home",
        theme: "warning",
        type: "fill",
        border: "rounded"
      }
    }
  ]

  toogleTop(){
    //this.showTop = !this.showTop
    this.theme = this.themes[randomInteger(0, this.themes.length - 1)]
    this.placement = this.placements[randomInteger(0, this.placements.length - 1)]
    this.text = randomStr(15)
    this.icon = this.icons[randomInteger(0, this.icons.length - 1)]
    console.log(this.icon)
    //console.dir(this._)
  }
  logg(text: string){
    alert("Home " + text);
  }

  callbackAlert(alertComponent: any) {
    alert("my callback");
    alertComponent.hide();

  }
  mounted(){}
  created(){
    this.buttons[0]['callback'] = this.callbackAlert
    //console.log(this.$router)
  }

  notifier(){
    this.$notify.info("title","message",{position: "left-top"})
    this.$notify.warning("title","message",{position: "left-center"})
    this.$notify.danger("title","message",{position: "left-bottom"})

    this.$notify.success("title","message",{position: "center-top"})
    this.$notify.info("title","message",{position: "center-center"})
    this.$notify.warning("title","message",{position: "center-bottom"})

    this.$notify.danger("title","message",{position: "right-top"})
    this.$notify.success("title","message",{position: "right-center"})
    this.$notify.info("title","message",{position: "right-bottom", buttons:[
      {
        settings: {text:"Close", theme:"danger"},
        callback:function(alert: any){
          alert.hide()
        }
      },
      {
        settings: {text:"Notify Center"},
        callback:(alert: any)=>{
          this.$notify.info("YOhoho","Callback use",{position: "center-center"})
        }
      }
    ]})

   // this.$notify.info("title","message",{position: "center-center"})
  }
}

export default DashboardPage

