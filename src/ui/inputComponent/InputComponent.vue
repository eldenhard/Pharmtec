<template>
  <div class="wrapper">
      <div class="group">
        <input required="required" :type="typeInput" v-model="inputValue" @input="handleInput"  autocomplete="on" @click="specDate($event.target)"/>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>{{ labelValue }}</label>
      </div>
  </div>
  <!-- <div class="col-3 input-effect">
      <input class="effect-20" :type="typeInput" v-model="inputValue" @input="handleInput"  autocomplete="on">
      <label>{{ labelValue }}</label>
      <span class="focus-border"><i></i></span>
    </div> -->
</template>
  
<script>
import { ref, watch } from 'vue';

export default {
  props: {
    labelValue: String,
    typeInput: String,
    modelValue: String,
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    const handleInput = () => {
      emit('update:modelValue', inputValue.value);
    };
    let specDate = (ev) => {
      if(ev.type != 'date') return
      inputValue.value = `${new Date().getFullYear()}-${("0" + ((new Date()).getMonth())+1).slice(-2)}-${("0" + ((new Date()).getDate())).slice(-2)}`
    }
    watch(() => props.modelValue, (newValue) => {
      inputValue.value = newValue;
    });

    return {
      inputValue,
      handleInput,
      specDate
    };
  },
};
</script>

<style scoped>
@import './style/inputComponentStyle.scss';
</style>

