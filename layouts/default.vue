<script setup lang='ts'>
</script>

<template>

    <div class='relative flex md:gap-2 lg:gap-5 max-h-screen'>
        <CommonDrawerSidebar />
        <main class="w-full  ">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.bg {
    background-color: #f1f2f6;
}
</style>