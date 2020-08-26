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
body {
  margin: 0;
}
#app {
  min-height: 100vh;
  padding-top: 40px;
  background-color: $background;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
}
</style>
