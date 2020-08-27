<template>
  <div class="comments-feed">
    <CommentsFeedCard
      v-for="(comment, index) in comments"
      :key="comment.id"
      :comment="comment"
      :class="{ 'with-margin': index !== comments.length - 1 }"
    />
    <div class="spacer"></div>
    <CommentsFeedInput :user="currentUser" @submit="addNewComment" />
  </div>
</template>

<script>
import CommentsFeedCard from '@/components/CommentsFeedCard'
import CommentsFeedInput from '@/components/CommentsFeedInput'

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
      comments: [
        {
          id: 1,
          text:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
          createdAt: '2020-08-11 07:54:03',
          email: 'george.bluth@reqres.in',
          firstName: 'George',
          lastName: 'Bluth',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
        },
        {
          id: 2,
          text:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
          createdAt: '2020-08-10 09:31:12',
          email: 'janet.weaver@reqres.in',
          firstName: 'Janet',
          lastName: 'Weaver',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
        },
      ],
      currentUser: {
        id: 3,
        email: 'emma.wong@reqres.in',
        firstName: 'Emma',
        lastName: 'Wong',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg',
      },
    }
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
