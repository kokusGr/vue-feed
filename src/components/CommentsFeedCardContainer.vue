<template>
  <div class="comments-feed-card-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CommentsFeedCardContainer',
}
</script>

<style scoped lang="scss">
.comments-feed-card-container {
  background-color: $surface;
  padding: 28px;
  width: 90vw;
  max-width: 800px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  flex: 0;
}
</style>