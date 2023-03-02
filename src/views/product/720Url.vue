<template>
    <div>
        <iframe :src="url" frameborder="0" :width="cliWidth" :height="cliHeight"></iframe>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const cliWidth = ref(document.documentElement.clientWidth);
const cliHeight = ref(document.documentElement.clientHeight)
onMounted(() => {
    // 窗口大小发生改变时,调用一次
    window.onresize = () => {
        cliWidth.value = document.documentElement.clientWidth;
        cliHeight.value = document.documentElement.clientHeight
    };
});

const url = ref()
url.value = sessionStorage.getItem('lookUrl')
</script>