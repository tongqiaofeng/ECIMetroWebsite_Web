<template>
  <div>
    <router-view :key="route.fullPath"></router-view>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>
