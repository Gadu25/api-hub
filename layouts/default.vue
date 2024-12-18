<script setup lang='ts'>
</script>

<template>

    <div class="relative flex w-full px-6">
        <CommonDrawerSidebar />
        <main class="w-full">
            <CommonNavbar />
            <div class="content-wrapper">
                <slot />
            </div>
        </main>
    </div>
</template>

<style scoped>
.content-wrapper {
    height: calc(100vh - 164px);
    overflow-y: auto;
    border-radius: 20px;
}
</style>