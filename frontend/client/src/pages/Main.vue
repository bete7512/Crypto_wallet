<template>
  <div class="flex w-full bg-green-50 h-screen ">
    <div class="bg-red-300 w-full">
      <div class="w-full">Navigator</div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'tippy.js/dist/tippy.css'
import tippy from 'tippy.js'

onMounted(() => {
  tippy('[data-tippy-content]')
})
// const emit = defineEmits(["close"]);
const activeClass = ref(
  'bg-gray-600 font-bold  text-lg bg-opacity-25 text-[#EF4104] border-[#EF4104]'
)
const inactiveClass = ref(
  'border-gray-900 text-lg font-bold   text-[#404147] hover:text-[#FBB919] border-[#9197B3] hover:border-[#FBB919]'
)
</script>
<style></style>
