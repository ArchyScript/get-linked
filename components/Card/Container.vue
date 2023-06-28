<template>
  <div 
    :class="`bg-white  w-full 
      ${size == 'xs' && 'rounded p-2'}  
      ${size == 'sm' && 'rounded p-4'}  
      ${size == 'md' && 'rounded p-6'}  
      ${size == 'xl' && 'rounded-xl p-6'} 
      ${hasBoxShadow && 'box-shadow'}
      ${isRouted && 'cursor-pointer'}
      ${customClass}
    `"
      @click="gotoRoute"
    >
      <slot/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({ 
  customClass: {
    type: String,
    default: ""
  }, 
  size: {
    type: String,
    default: "sm"
  },
  hasBoxShadow: {
    type: Boolean,
    default: false
  },
  isRouted: {
    type: Boolean,
    default: false
  }, 
  routerLink: {
    type: String,
    default: '/dashboards'
  }
});

const gotoRoute = () => {
  if (props.isRouted) {
    useRouter().push(props.routerLink) 
  }
} 
</script>
