<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
 <h1 class="text-3xl font-bold text-slate-900 text-center headline py-5 uppercase" >{{ title }}</h1>
</template>

<style>
</style>