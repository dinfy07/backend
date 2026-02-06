<script setup>

  const props = defineProps({
    title: String,
    description: String,
  })
</script>

<template>
  <header>
    <h1>{{ props.title }}</h1>
    <h2>{{ props.description }}</h2>
  </header>
</template>

<style scoped lang="sass">
  @use "../assets/styles/header"
</style>
