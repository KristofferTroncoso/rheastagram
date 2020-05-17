/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      name
      bio
      email
      photoUrl
      timeCreated
      type
      userPosts {
        items {
          id
          picUrl
          type
          visibility
          timeCreated
          userId
        }
        nextToken
      }
      comments {
        items {
          id
          content
          timeCreated
          userId
          postId
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
          userId
          postId
        }
        nextToken
      }
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      name
      bio
      email
      photoUrl
      timeCreated
      type
      userPosts {
        items {
          id
          picUrl
          type
          visibility
          timeCreated
          userId
        }
        nextToken
      }
      comments {
        items {
          id
          content
          timeCreated
          userId
          postId
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
          userId
          postId
        }
        nextToken
      }
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      name
      bio
      email
      photoUrl
      timeCreated
      type
      userPosts {
        items {
          id
          picUrl
          type
          visibility
          timeCreated
          userId
        }
        nextToken
      }
      comments {
        items {
          id
          content
          timeCreated
          userId
          postId
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
          userId
          postId
        }
        nextToken
      }
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      picUrl
      type
      visibility
      timeCreated
      userId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      comments {
        items {
          id
          content
          timeCreated
          userId
          postId
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
          userId
          postId
        }
        nextToken
      }
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      picUrl
      type
      visibility
      timeCreated
      userId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      comments {
        items {
          id
          content
          timeCreated
          userId
          postId
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
          userId
          postId
        }
        nextToken
      }
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      picUrl
      type
      visibility
      timeCreated
      userId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      comments {
        items {
          id
          content
          timeCreated
          userId
          postId
        }
        nextToken
      }
      likes {
        items {
          id
          timeCreated
          userId
          postId
        }
        nextToken
      }
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      content
      timeCreated
      userId
      postId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      post {
        id
        picUrl
        type
        visibility
        timeCreated
        userId
        user {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      content
      timeCreated
      userId
      postId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      post {
        id
        picUrl
        type
        visibility
        timeCreated
        userId
        user {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      content
      timeCreated
      userId
      postId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      post {
        id
        picUrl
        type
        visibility
        timeCreated
        userId
        user {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      timeCreated
      userId
      postId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      post {
        id
        picUrl
        type
        visibility
        timeCreated
        userId
        user {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      timeCreated
      userId
      postId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      post {
        id
        picUrl
        type
        visibility
        timeCreated
        userId
        user {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      timeCreated
      userId
      postId
      user {
        id
        username
        name
        bio
        email
        photoUrl
        timeCreated
        type
        userPosts {
          nextToken
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
      post {
        id
        picUrl
        type
        visibility
        timeCreated
        userId
        user {
          id
          username
          name
          bio
          email
          photoUrl
          timeCreated
          type
        }
        comments {
          nextToken
        }
        likes {
          nextToken
        }
      }
    }
  }
`;
