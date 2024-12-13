<template>
    <div :class="{ 'active-color bg-blue-400 text-white rounded-md': isActive }">
      <nuxt-link class="w-full px-2 py-3 flex items-center gap-2" :to="to">
        <MdiIcon  class="text-white size-8" :icon="icon" />
        <span v-if="isDrawerOpen"  class="text-white">{{ text }}</span> 
      </nuxt-link>
    </div>
  </template>
<script setup lang="ts">

defineProps({
  text: String,
  to: String,
  icon: String || undefined,
  isActive: Boolean,
  isDrawerOpen: Boolean,
  menuItem:String
});


</script>

<style scoped>
.active-color {
  background-color: #4ea819;
}
</style>