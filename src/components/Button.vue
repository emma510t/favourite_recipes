<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
    <button class="font-bold uppercase block border-2 border-lime-700 border-solid rounded-lg text-lime-700 px-2 py-1 hover:bg-lime-700 hover:text-white focus:bg-lime-700 focus:text-white transition-colors">{{ text }}</button>
</template>