<template>
  <div :class="{ 'active-color': isActive, 'text-white rounded-md': true }">
    <nuxt-link class="w-full px-2 py-3 flex items-center gap-2" :to="to">
      <MdiIcon :class="{ 'text-orange': isActive, 'text-white': !isActive }" size="40" :icon="icon" />
      <span v-if="isDrawerOpen" :class="{ 'active-color': isActive, 'text-white': !isActive }" class="text-xl">
        {{ text }}
      </span>
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
  menuItem: String,
});
</script>

<style scoped>
.active-color {
  color: #e67e22;

}

.text-white {
  color: #ffffff;

}

.text-orange {
  color: #e67e22;

}

.size-8 {
  font-size: 2rem;

}
</style>
