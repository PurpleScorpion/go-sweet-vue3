<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>
 
<script setup>
import { computed } from 'vue'
 
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  }
})
 
const iconName = computed(() => `#c-svg-image-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `c-svg-image c-svg-image-${props.name}`
  }
  return 'c-svg-image'
})
</script>
 
<style>
.c-svg-image {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  cursor: default;
}
</style>