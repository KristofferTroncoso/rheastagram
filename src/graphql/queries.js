/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
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
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      post {
        id
        picUrl
        timeCreated
      }
      timeCreated
    }
    nextToken
  }
}
`;
export const getLike = `query GetLike($id: ID!) {
  getLike(id: $id) {
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
export const listLikes = `query ListLikes(
  $filter: ModelLikeFilterInput
  $limit: Int
  $nextToken: String
) {
  listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        username
        name
        bio
        email
        photoUrl
      }
      post {
        id
        picUrl
        timeCreated
      }
      timeCreated
    }
    nextToken
  }
}
`;
