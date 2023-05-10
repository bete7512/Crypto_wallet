<template>
    <div class="lg:hidden flex justify-between items-center px-10 bg-[#6DB0B0] py-5">
        <div class="text-lg text-black font-bold">
            Santim
        </div>
        <button @click="nav">
            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" fill="currentColor" class="bi bi-list"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
        </button>
    </div>
    <Dropped  v-on:cancel="nav"></Dropped>
</template>
<script setup>
import Dropped from './Mobile.vue';
import {ref} from 'vue'
const isNav = ref(false)
function nav() {
    isNav.value = !isNav.value
}
</script>
<style lang="">
    
</style>