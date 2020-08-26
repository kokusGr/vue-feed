<template>
  <div class="root">
    <div class="header">
      <img :src="avatar" :alt="fullName" class="avatar" />
      <div class="header-text-container">
        <div class="username">{{ fullName }}</div>
        <div class="time">{{ createdAt }}</div>
      </div>
    </div>
    <div class="body">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'CommentsFeedCard',
  data() {
    return {
      avatar:
        'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
      firstName: 'George',
      lastName: 'Bluth',
      text:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
      createdAt: '2020-08-11 07:54:03',
    }
  },
  computed: {
    fullName: function getFullName() {
      return `${this.firstName} ${this.lastName}`
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