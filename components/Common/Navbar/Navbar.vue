<template>
    <div class="flex-wrap flex justify-between px-3  py-6">
      <a href="#" class=" items-center ">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-gray-700"> {{ paramId.charAt(0).toUpperCase() + paramId.slice(1).toLowerCase() }}</span>
      </a>
      <span class="date-span">2021-12-24 14:23:25</span>
    </div>
</template>
<script setup lang="ts">

const route = useRoute();
const paramId = computed(() => {
  const urlSegments = route.fullPath.split('/');
  return urlSegments[urlSegments.length - 1];
});

</script>
<style scoped>
/* .date-span {
  margin-right: -17rem;
} */
</style>
