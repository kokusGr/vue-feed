<template>
  <div class="root">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CommentsFeedCardContainer',
}
</script>

<style scoped lang="scss">
.root {
  background-color: $surface;
  padding: 28px;
  width: 600px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>