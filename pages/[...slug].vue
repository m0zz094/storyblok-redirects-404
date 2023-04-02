<script setup>
const route = useRoute();
const version = route.query._storyblok ? "draft" : "published";

const story = await useAsyncStoryblok2(
  route.path == "/" ? "home" : route.path,
  {
    version: version,
  }
);
</script>

<template>
  <div>
    {{ story }}
  </div>
</template>
