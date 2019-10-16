/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    name
    bio
    email
    photoUrl
    userPosts {
      items {
        id
        picUrl
        timeCreated
      }
      nextToken
    }
    comments {
      items {
        id
        content
        timeCreated
      }
      nextToken
    }
    likes {
      items {
        id
        timeCreated
      }
      nextToken
    }
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    username
    name
    bio
    email
    photoUrl
    userPosts {
      items {
        id
        picUrl
        timeCreated
      }
      nextToken
    }
    comments {
      items {
        id
        content
        timeCreated
      }
      nextToken
    }
    likes {
      items {
        id
        timeCreated
      }
      nextToken
    }
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    username
    name
    bio
    email
    photoUrl
    userPosts {
      items {
        id
        picUrl
        timeCreated
      }
      nextToken
    }
    comments {
      items {
        id
        content
        timeCreated
      }
      nextToken
    }
    likes {
      items {
        id
        timeCreated
      }
      nextToken
    }
  }
}
`;
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    picUrl
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      }
      nextToken
    }
    likes {
      items {
        id
        timeCreated
      }
      nextToken
    }
    timeCreated
  }
}
`;
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
    id
    picUrl
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      }
      nextToken
    }
    likes {
      items {
        id
        timeCreated
      }
      nextToken
    }
    timeCreated
  }
}
`;
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    id
    picUrl
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      }
      nextToken
    }
    likes {
      items {
        id
        timeCreated
      }
      nextToken
    }
    timeCreated
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    id
    content
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      comments {
        nextToken
      }
      likes {
        nextToken
      }
      timeCreated
    }
    timeCreated
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
    id
    content
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      comments {
        nextToken
      }
      likes {
        nextToken
      }
      timeCreated
    }
    timeCreated
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
    id
    content
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      comments {
        nextToken
      }
      likes {
        nextToken
      }
      timeCreated
    }
    timeCreated
  }
}
`;
export const createLike = `mutation CreateLike($input: CreateLikeInput!) {
  createLike(input: $input) {
    id
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      comments {
        nextToken
      }
      likes {
        nextToken
      }
      timeCreated
    }
    timeCreated
  }
}
`;
export const updateLike = `mutation UpdateLike($input: UpdateLikeInput!) {
  updateLike(input: $input) {
    id
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      comments {
        nextToken
      }
      likes {
        nextToken
      }
      timeCreated
    }
    timeCreated
  }
}
`;
export const deleteLike = `mutation DeleteLike($input: DeleteLikeInput!) {
  deleteLike(input: $input) {
    id
    user {
      id
      username
      name
      bio
      email
      photoUrl
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
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      comments {
        nextToken
      }
      likes {
        nextToken
      }
      timeCreated
    }
    timeCreated
  }
}
`;
