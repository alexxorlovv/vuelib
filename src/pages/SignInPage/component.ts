import Vue from 'vue'
import AuthLayout from '@layouts/AuthLayout.vue'
import Component from 'vue-class-component'

@Component({
    components: {
      AuthLayout
    },
    props: {

    }
})

class SignInPage extends Vue {
  name: string = "SignInPage"
}

export default SignInPage

