const deserializeComment = rawComment => ({
  id: rawComment.id,
  text: rawComment.text,
  createdAt: rawComment.created_at,
  email: rawComment.email,
  firstName: rawComment.first_name,
  lastName: rawComment.last_name,
  avatar: rawComment.avatar,
})

const serializeComment = comment => ({
  id: comment.id,
  text: comment.text,
  created_at: comment.createdAt,
  email: comment.email,
  first_name: comment.firstName,
  last_name: comment.lastName,
  avatar: comment.avatar,
})

const getComments = async () => {
  const response = await fetch(
    'https://my-json-server.typicode.com/zaszczyk/demo/comments',
  )
  const rawComments = await response.json()

  return rawComments.map(deserializeComment)
}

const addComment = async newComment => {
  const response = await fetch(
    'https://my-json-server.typicode.com/zaszczyk/demo/comments',
    {
      method: 'POST',
      body: JSON.stringify(serializeComment(newComment)),
    },
  )

  return response
}

const deserializeUser = rawUser => ({
  id: rawUser.id,
  email: rawUser.email,
  firstName: rawUser.first_name,
  lastName: rawUser.last_name,
  avatar: rawUser.avatar,
})

const getUsers = async () => {
  const response = await fetch(
    'https://my-json-server.typicode.com/zaszczyk/demo/users',
  )
  const rawUsers = await response.json()

  return rawUsers.map(deserializeUser)
}

export default {
  getUsers,
  getComments,
  addComment,
}
