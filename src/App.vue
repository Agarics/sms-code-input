<script setup>
import { ref } from 'vue'
import SmsCodeInput from './components/sms-code-input.vue';
const code = ref('')
</script>

<template>
  <SmsCodeInput v-model="code" />
</template>