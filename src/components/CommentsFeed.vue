<template>
  <div class="comments-feed">
    <CommentsFeedCard
      v-for="(comment, index) in comments"
      :key="comment.id"
      :comment="comment"
      :class="{ 'with-margin': index !== comments.length - 1 }"
    />
    <div class="spacer"></div>
    <CommentsFeedInput v-model="newComment" :user="currentUser" @submit="addNewComment" />
  </div>
</template>

<script>
import CommentsFeedCard from '@/components/CommentsFeedCard'
import CommentsFeedInput from '@/components/CommentsFeedInput'

import Api from '@/api'

const getNextId = collection => {
  return collection[collection.length - 1].id + 1
}

export default {
  name: 'CommentsFeed',
  components: {
    CommentsFeedCard,
    CommentsFeedInput,
  },
  data() {
    return {
      comments: [],
      currentUser: {
        id: 3,
        email: 'emma.wong@reqres.in',
        firstName: 'Emma',
        lastName: 'Wong',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg',
      },
      newComment: '',
    }
  },
  async created() {
    const comments = await Api.getComments()
    this.comments = comments
  },
  methods: {
    addNewComment({ comment, author }) {
      const newComment = {
        text: comment,
        firstName: author.firstName,
        lastName: author.lastName,
        avatar: author.avatar,
        createdAt: Date.now().toString(),
        id: getNextId(this.comments),
      }

      this.comments.push(newComment)
    },
  },
}
</script>

<style scoped lang="scss">
.comments-feed {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.with-margin {
  margin-bottom: 12px;
}
.spacer {
  flex: 1 1 20px;
}
</style>
