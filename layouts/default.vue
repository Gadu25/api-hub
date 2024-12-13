<script setup lang='ts'>
</script>

<template>

    <div class="relative flex w-full px-6">
        <CommonDrawerSidebar />
        <main class="w-full ">
            <CommonNavbar />
            <slot />
        </main>
    </div>
</template>

<style scoped></style>