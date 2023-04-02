<template>
  <div>
    Error:
    {{ error }}
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>
