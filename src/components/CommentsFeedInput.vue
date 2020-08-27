<template>
  <CommentsFeedCardContainer>
    <div class="input-container">
      <CommentsFeedAvatar :url="user.avatar" :alt="fullName" />
      <TextareaAutosize class="input" :max-height="200" />
      <button class="button" type="submit">Opublikuj</button>
    </div>
  </CommentsFeedCardContainer>
</template>

<script>
import CommentsFeedAvatar from '@/components/CommentsFeedAvatar'
import CommentsFeedCardContainer from '@/components/CommentsFeedCardContainer'

export default {
  name: 'CommentsFeedInput',
  components: {
    CommentsFeedAvatar,
    CommentsFeedCardContainer,
  },
  props: {
    user: {
      type: Object,
      required: true,
      validator: function validateUser(user) {
        return (
          typeof user.avatar === 'string' &&
          typeof user.firstName === 'string' &&
          typeof user.lastName === 'string'
        )
      },
    },
  },
  computed: {
    fullName: function getFullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },
  },
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.input {
  flex: 1;
  padding-right: 16px;
  padding-left: 22px;
  font-size: 1.1rem;
  line-height: 1.55;
  border: none;
}
.button {
  background: none;
  border: none;
  color: $primary;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 12px 0;
}
</style>
