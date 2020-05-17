/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
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
