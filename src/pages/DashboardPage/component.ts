import Vue from 'vue'
import BaseLayout from '@layouts/BaseLayout.vue'
import Component from 'vue-class-component'
import FormTextElement from '@elements/FormTextElement.vue'
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
      FormTextElement
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
  toogleTop(){
    //this.showTop = !this.showTop
    this.theme = this.themes[randomInteger(0, this.themes.length - 1)]
    this.placement = this.placements[randomInteger(0, this.placements.length - 1)]
    this.text = randomStr(15)
    //console.dir(this._)
  }

  created(){
    //console.log(this.$router)
  }
}

export default DashboardPage

