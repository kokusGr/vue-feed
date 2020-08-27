<template>
  <div class="root">
    <div class="header">
      <img :src="comment.avatar" :alt="fullName" class="avatar" />
      <div class="header-text-container">
        <div class="username">{{ fullName }}</div>
        <div class="time">{{ comment.createdAt }}</div>
      </div>
    </div>
    <div class="body">{{ comment.text }}</div>
  </div>
</template>

<script>
export default {
  name: 'CommentsFeedCard',
  props: {
    comment: {
      required: true,
      type: Object,
      validator: function validateComment(comment) {
        return (
          typeof comment.text === 'string' &&
          typeof comment.createdAt === 'string' &&
          typeof comment.firstName === 'string' &&
          typeof comment.lastName === 'string' &&
          typeof comment.avatar === 'string'
        )
      },
    },
  },
  computed: {
    fullName: function getFullName() {
      return `${this.comment.firstName} ${this.comment.lastName}`
    },
  },
}
</script>

<style scoped lang="scss">
.root {
  background-color: $surface;
  padding: 28px;
  width: 600px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.header {
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
}
.avatar {
  height: 56px;
  width: 56px;
  border-radius: 100%;
}
.header-text-container {
  margin-left: 20px;
}
.username {
  color: $primary;
  font-size: 1.1rem;
  padding-bottom: 12px;
}
.time {
  font-size: 0.9rem;
  font-weight: 200;
}
.body {
  padding-top: 16px;
  font-size: 0.9rem;
  line-height: 1.55;
}
</style>