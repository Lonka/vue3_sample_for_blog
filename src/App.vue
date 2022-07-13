<script setup lang="ts">
import { http } from '~/utils/http/axios'

http.request({ url: '/test', method: 'get', params: { id: 3 } }).then((res) => {
  console.log(res)
})

http.request({ url: '/test', method: 'post', data: { name: 'new name' } }).then((res) => {
  console.log(res)
})

http.request({ url: '/test/6', method: 'put', data: { name: 'edit name' } }).then((res) => {
  console.log(res)
})

http.request({ url: '/test/1', method: 'delete' }).then((res) => {
  console.log(res)
})

// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Vue3 Sample for blog',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
