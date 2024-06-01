import { App } from 'vue'
import SmsCodeInput from "./sms-code-input.vue";

export { SmsCodeInput }

export default {
  install: (app: App) => {
    app.component('sms-code-input', SmsCodeInput)
  }
}