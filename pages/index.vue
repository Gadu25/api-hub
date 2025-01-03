<template>
</template>

<script setup>
    const router = useRouter();
    const redirectToWeather = async () => {
        router.push('/weather')
    }

    onMounted(redirectToWeather);
</script>

<style lang="scss" scoped>
</style>