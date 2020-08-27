<template>
  <CommentsFeedCardContainer>
    <div class="input-container">
      <CommentsFeedAvatar :url="user.avatar" :alt="fullName" />
      <TextareaAutosize v-model="newComment" class="input" :max-height="200" />
      <button @click="handleSubmit" class="button">
        Opublikuj
      </button>
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
  data() {
    return {
      newComment: '',
    }
  },
  computed: {
    fullName: function getFullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { comment: this.newComment, author: this.user })
      this.newComment = ''
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
  padding: 12px 6px;
  outline: none;
  overflow: hidden;
  position: relative;
  border-radius: 4px;
}
.button:after {
  content: '';
  background: rgba($primary, 0.6);
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -40px;
  margin-top: -150%;
  opacity: 0;
  transition: all 0.5s ease-out;
}
.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}
</style>
