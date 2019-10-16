/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreatePost = `subscription OnCreatePost {
  onCreatePost {
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
export const onUpdatePost = `subscription OnUpdatePost {
  onUpdatePost {
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
export const onDeletePost = `subscription OnDeletePost {
  onDeletePost {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
export const onCreateLike = `subscription OnCreateLike {
  onCreateLike {
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
export const onUpdateLike = `subscription OnUpdateLike {
  onUpdateLike {
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
export const onDeleteLike = `subscription OnDeleteLike {
  onDeleteLike {
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
