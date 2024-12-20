<template>
  <div :class="{ 'active-color': isActive, 'text-white rounded-md': true }">
    <nuxt-link class="item w-full px-2 py-3 flex items-center gap-2" :class="{'scale-110': isActive, 'font-bold': isActive}" :to="to">
      <MdiIcon  size="40" :icon="icon" :class="{'active-color': isActive}"/>
      <span v-if="isDrawerOpen" :class="{ 'active-color': isActive }" class="text-md">
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
  color: #F39C12;

}

.text-white {
  color: #ffffff;

}

.text-orange {
  color: #F39C12;

}

.size-8 {
  font-size: 2rem;

}

.item {
  transition: all .3s;
}

.item:hover{
  color: #F39C12;
}
</style>
