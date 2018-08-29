import Vue from 'vue'
import Component from 'vue-class-component'
import AuthLayout from '@layouts/AuthLayout.vue'

@Component({
    components: {
      AuthLayout
    },
    props: {

    }
})

class SignUpPage extends Vue {
  name: string = "SignUpPage"
}

export default SignUpPage

