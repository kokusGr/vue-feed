<template>
  <div id="app">
    <CommentsFeed />
  </div>
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
  background-color: #e1ede6;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
