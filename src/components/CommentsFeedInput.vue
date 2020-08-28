<template>
  <div class="comments-feed-input-wrapper">
    <CommentsFeedInputMentionsList
      v-if="usersForMention.length > 0"
      :users="usersForMention"
      :focused-mention-index="focusedMentionIndex"
      @mention-clicked="selectMention"
    />
    <CommentsFeedCardContainer>
      <div class="input-container">
        <CommentsFeedAvatar :url="user.avatar" :alt="user.fullName" class="input-avatar" />
        <TextareaAutosize
          ref="commentInput"
          :value="value"
          :rows="1"
          placeholder="Add new comment…"
          class="input"
          :max-height="200"
          :min-height="20"
          @input.native="handleInput"
          @keydown.native="handleKeyDown"
        />
        <button :disabled="!value" class="button" @click="handleSubmit">Opublikuj</button>
      </div>
    </CommentsFeedCardContainer>
  </div>
</template>

<script>
import CommentsFeedAvatar from '@/components/CommentsFeedAvatar'
import CommentsFeedCardContainer from '@/components/CommentsFeedCardContainer'
import CommentsFeedInputMentionsList from '@/components/CommentsFeedInputMentionsList'

const lastMentionRegex = /(^.*@)(.*$)/

const getNextIndex = (list, currentIndex, step) => {
  if (list.length < 1) {
    return null
  }

  if (currentIndex === null) {
    return 0
  }

  const nextIndex = currentIndex + step

  if (nextIndex > list.length - 1) {
    return list.length - 1
  }

  if (nextIndex < 0) {
    return 0
  }

  return nextIndex
}

export default {
  name: 'CommentsFeedInput',
  components: {
    CommentsFeedAvatar,
    CommentsFeedCardContainer,
    CommentsFeedInputMentionsList,
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
      focusedMentionIndex: null,
    }
  },
  computed: {
    mentionQuery: function getMentionQuery() {
      if (!this.showMention) {
        return ''
      }

      const parts = this.value.split('@')
      return parts.length > 1 ? parts.pop().toLowerCase() : ''
    },
    usersForMention: function getUsersForMention() {
      if (!this.mentionQuery) {
        return []
      }

      return this.users.filter(user =>
        user.fullName.toLowerCase().startsWith(this.mentionQuery),
      )
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { comment: this.value, author: this.user })
    },
    handleNavigationKey(key) {
      switch (key) {
        case 'Enter': {
          const focusedMention = this.usersForMention[this.focusedMentionIndex]
          focusedMention && this.selectMention(focusedMention)
          break
        }
        case 'ArrowDown': {
          this.focusMention(1)
          break
        }
        case 'ArrowUp': {
          this.focusMention(-1)
          break
        }

        default:
          break
      }
    },
    handleInput(event) {
      const { value } = event.target
      const lastCharacter = value[value.length - 1]
      if (lastCharacter === '@') {
        this.showMention = true
      }
      this.$emit('input', value)
    },
    handleKeyDown({ key }) {
      if (
        ['ArrowUp', 'ArrowDown', 'Enter'].includes(key) &&
        this.usersForMention.length > 1
      ) {
        event.preventDefault()
        this.handleNavigationKey(key)
      }
    },
    selectMention(user) {
      const valueWithMention = this.value.replace(
        lastMentionRegex,
        `$1${user.fullName}`,
      )
      this.$emit('input', valueWithMention)
      this.showMention = false
      this.focusedMention = null
      this.$refs.commentInput.$el.focus()
    },
    focusMention(step) {
      if (this.usersForMention.length < 1) {
        return
      }

      this.focusedMentionIndex = getNextIndex(
        this.usersForMention,
        this.focusedMentionIndex,
        step,
      )
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

  @media (max-width: 560px) {
    flex-direction: column;
  }
}
.input {
  flex: 1;
  padding: 12px 8px;
  margin-right: 24px;
  margin-left: 30px;
  font-size: 1rem;
  line-height: 1.55;
  border-bottom: 1px solid $background;

  @media (max-width: 560px) {
    margin: 0;
    width: 100%;
  }
}
.input::placeholder {
  color: $onSurfaceSecondary;
}
.input-avatar {
  @media (max-width: 560px) {
    display: none;
  }
}
.button {
  color: $primary;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 12px 6px;
  overflow: hidden;
  position: relative;
  border-radius: 4px;

  @media (max-width: 560px) {
    margin-left: auto;
    margin-top: 14px;
  }
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
