<template>
  <main id="app">
    <CommentsFeed />
  </main>
</template>

<script>
import CommentsFeed from '@/components/CommentsFeed'
export default {
  name: 'App',
  components: {
    CommentsFeed,
  },
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body,
textarea,
button {
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  background: none;
}
textarea,
button {
  font-family: inherit;
}
#app {
  min-height: 100vh;
  padding: 40px 0;
  background-color: $background;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
}
</style>
