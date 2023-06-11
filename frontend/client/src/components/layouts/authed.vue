<template>
    <div >
       <Auth_nav  >
            <slot></slot>
       </Auth_nav>
    </div>
</template>
<script setup>
// import { useNProgress } from '@vueuse/integrations/useNProgress'
// const { isLoading } = useNProgress()

// function toggle() {
//   isLoading.value = !isLoading.value
// }
import Auth_nav from './nav/Auth_nav.vue';

</script>
<style>
    
</style>