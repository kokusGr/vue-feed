<template>
  <CommentsFeedCardContainer>
    <div class="input-container">
      <CommentsFeedAvatar :url="user.avatar" :alt="fullName" />
      <TextareaAutosize
        :value="value"
        :rows="1"
        placeholder="Add new comment…"
        @input="handleInput"
        class="input"
        :max-height="200"
        :min-height="20"
      />
      <button @click="handleSubmit" :disabled="!value" class="button">Opublikuj</button>
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
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    fullName: function getFullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { comment: this.value, author: this.user })
    },
    handleInput(value) {
      this.$emit('input', value)
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
  padding: 12px 8px;
  margin-right: 24px;
  margin-left: 30px;
  font-size: 1rem;
  line-height: 1.55;
  border-bottom: 1px solid $background;
}
.input::placeholder {
  color: $onSurfaceSecondary;
}
.button {
  color: $primary;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 12px 6px;
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
.button:disabled {
  color: $onSurfaceSecondary;
  cursor: not-allowed;
}
</style>
