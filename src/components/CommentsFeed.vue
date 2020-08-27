<template>
  <div>
    <CommentsFeedCard
      v-for="(comment, index) in comments"
      :key="comment.id"
      :comment="comment"
      :class="{ withMargin: index !== comments.length - 1 }"
    />
  </div>
</template>

<script>
import CommentsFeedCard from '@/components/CommentsFeedCard'
export default {
  name: 'CommentsFeed',
  components: {
    CommentsFeedCard,
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
    }
  },
}
</script>

<style scoped lang="scss">
.withMargin {
  margin-bottom: 12px;
}
</style>