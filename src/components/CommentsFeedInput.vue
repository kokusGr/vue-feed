<template>
  <div class="comments-feed-input-wrapper">
    <div v-if="usersForMention.length > 0" class="mentions-list">
      <div
        v-for="(user, index) in usersForMention"
        @click="selectMention(user.fullName)"
        :key="user.id"
        :class="['mentions-list-item', { 'mentions-list-item--last': index === usersForMention.length - 1 }]"
      >
        <CommentsFeedAvatar class="mention-avatar" :url="user.avatar" :alt="user.fullName" />
        <span class="mention-username">{{ user.fullName }}</span>
      </div>
    </div>
    <CommentsFeedCardContainer>
      <div class="input-container">
        <CommentsFeedAvatar :url="user.avatar" :alt="user.fullName" />
        <TextareaAutosize
          :value="value"
          :rows="1"
          placeholder="Add new comment…"
          @input="handleInput"
          @keydown.native="handleKeyDown"
          ref="commentInput"
          class="input"
          :max-height="200"
          :min-height="20"
        />
        <button @click="handleSubmit" :disabled="!value" class="button">Opublikuj</button>
      </div>
    </CommentsFeedCardContainer>
  </div>
</template>

<script>
import CommentsFeedAvatar from '@/components/CommentsFeedAvatar'
import CommentsFeedCardContainer from '@/components/CommentsFeedCardContainer'

const lastMentionRegex = /(^.*@)(.*$)/

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
          typeof user.avatar === 'string' && typeof user.fullName === 'string'
        )
      },
    },
    value: {
      type: String,
      required: true,
    },
    users: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showMention: false,
    }
  },
  computed: {
    mentionQuery: function getMentionQuery() {
      if (!this.showMention) {
        return ''
      }

      const parts = this.value.split('@')

      return parts.length > 1 ? parts.pop() : ''
    },
    usersForMention: function getUsersForMention() {
      if (!this.mentionQuery) {
        return []
      }

      return this.users.filter(user =>
        user.fullName.startsWith(this.mentionQuery),
      )
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { comment: this.value, author: this.user })
    },
    handleInput(value) {
      this.$emit('input', value)
    },
    handleKeyDown({ key }) {
      if (key === '@') {
        this.showMention = true
      }
    },
    selectMention(username) {
      const valueWithMention = this.value.replace(
        lastMentionRegex,
        `$1${username}`,
      )
      this.$emit('input', valueWithMention)
      this.showMention = false
      this.$refs.commentInput.$el.focus()
    },
  },
}
</script>

<style scoped lang="scss">
.comments-feed-input-wrapper {
  position: relative;
}
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
.mentions-list {
  position: absolute;
  top: -20px;
  left: 28px;
  right: 28px;
  padding: 20px 0;
  transform: translateY(-100%);
  max-height: 400px;
  overflow-y: scroll;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  background: $surface;
}
.mentions-list-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 28px;

  &:hover {
    background-color: rgba($primary, 0.4);
  }

  &--last {
    margin-bottom: 0;
  }
}
.mention-username {
  margin-left: 12px;
  font-size: 0.9rem;
}
.mention-avatar {
  height: 40px;
  width: 40px;
}
</style>
