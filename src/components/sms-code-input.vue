<script setup lang="ts">
  import { computed, ref } from 'vue'
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      default: ''
    },
    length: {
      type: Number,
      default: 4
    }
  })
  const isFocus = ref(false)
  const currentActiveIndex = computed(() => {
    const length = String(props.modelValue || '').length
    return Math.min(length + 1, props.length)
  })
  const emit = defineEmits(['update:modelValue'])

  function inputAction($event: Event) {
    const target = $event.target as HTMLInputElement
    const value = target.value.replace(/[^0-9]/g, '')
    target.value = value
    emit('update:modelValue', value)
  }

  function focusAction() {
    isFocus.value = true
  }

  function blurAction() {
    isFocus.value = false
  }
</script>

<template>
  <div class="sms-code-input">
    <span v-for="index in length" :key="index" :class="['code-span', { 'has-cursor': isFocus && currentActiveIndex == index }]">{{ String(modelValue || '').charAt(index - 1) }}</span>
    <input :value="modelValue" type="text" :maxlength="length" @input="inputAction" @focus="focusAction" @blur="blurAction">
  </div>
</template>

<style lang="less">

.sms-code-input{
  position: relative;
  display: flex;

  input{
    outline: none;
    opacity: 0;
    position: absolute;
    z-index: 1;
    inset: 0;
    padding: 0;
    margin: 0;
    border: none;
  }

  .code-span{
    width: 40px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ededed;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    & + .code-span{
      margin-left: 10px;
    }

    &.has-cursor{
      &:after{
        content: ' ';
        display: block;
        height: 16px;
        width: 1px;
        background: #666;
        animation: cursor-flush 0.8s step-end infinite;
      }
    }
  }

  @keyframes cursor-flush {
    0%{
      opacity: 0;
    }
    50%{
      opacity: 1;
    }
  }
}
</style>
