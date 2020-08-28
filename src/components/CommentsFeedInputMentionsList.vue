<template>
  <div class="mentions-list">
    <div
      v-for="(user, index) in users"
      ref="mentionListItems"
      :key="user.id"
      :class="['mentions-list-item', { 'mentions-list-item--last': index === users.length - 1, 'mentions-list-item--focused': index === focusedMentionIndex }]"
      @click="$emit('mention-clicked', user)"
    >
      <CommentsFeedAvatar class="mention-avatar" :url="user.avatar" :alt="user.fullName" />
      <span class="mention-username">{{ user.fullName }}</span>
    </div>
  </div>
</template>

<script>
import CommentsFeedAvatar from '@/components/CommentsFeedAvatar'

export default {
  name: 'CommentsFeedInputMentionsList',
  components: {
    CommentsFeedAvatar,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
    focusedMentionIndex: {
      type: Number,
      default: null,
    },
  },
  watch: {
    focusedMentionIndex: function watchFocusedMentionIndex(index) {
      if (index !== null) {
        this.$refs.mentionListItems[index].scrollIntoView({
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
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

  &--focused {
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