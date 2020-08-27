<template>
  <img :src="url" :alt="alt" class="avatar" />
</template>

<script>
export default {
  name: 'CommentsFeedAvatar',
  props: {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.avatar {
  height: 56px;
  width: 56px;
  border-radius: 100%;
}
</style>