/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        post {
          id
          picUrl
          type
          visibility
          timeCreated
          userId
        }
      }
      nextToken
    }
  }
`;
export const getLike = /* GraphQL */ `
  query GetLike($id: ID!) {
    getLike(id: $id) {
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
export const listLikes = /* GraphQL */ `
  query ListLikes(
    $filter: ModelLikeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        }
        post {
          id
          picUrl
          type
          visibility
          timeCreated
          userId
        }
      }
      nextToken
    }
  }
`;
export const listUsersByType = /* GraphQL */ `
  query ListUsersByType(
    $type: String
    $timeCreated: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsersByType(
      type: $type
      timeCreated: $timeCreated
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPostsByType = /* GraphQL */ `
  query ListPostsByType(
    $type: String
    $timeCreated: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsByType(
      type: $type
      timeCreated: $timeCreated
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listPostsByVisibility = /* GraphQL */ `
  query ListPostsByVisibility(
    $visibility: String
    $timeCreated: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsByVisibility(
      visibility: $visibility
      timeCreated: $timeCreated
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
