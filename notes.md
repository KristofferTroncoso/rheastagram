im trying to do graphql version of my instagram app.

# client id
76v0bo990tr3fg150h00entlcb

# omg it worked. the graphql schema i was working on

```
type User @model {
    id: ID!
    username: String!
    name: String
    userPosts: [Post] @connection(name: "UserPosts")
    comments: [Comment] @connection(name: "Users")
}
type Post @model {
    id: ID!
    picUrl: String
    user: User @connection(name: "UserPosts")
    comments: [Comment] @connection(name: "PostComments")
}
type Comment @model {
    id: ID!
    content: String
    user: User @connection(name: "Users")
    post: Post @connection(name: "PostComments")
}
```

# what i want for the real one
```
type User @model {
    id: ID!
    username: String!
    name: String
    bio: String
    photoUrl: String
    userPosts: [Post] @connection(name: "UserPosts")
    comments: [Comment] @connection(name: "UserComments")
    likes: [Like] @connection(name: "UserLikes")
}

type Post @model {
    id: ID!
    picUrl: String
    user: User @connection(name: "UserPosts")
    comments: [Comment] @connection(name: "PostComments")
    likes: [Like] @connection(name: "PostLikes")
    timeCreated: String
}

type Comment @model {
    id: ID!
    content: String
    user: User @connection(name: "UserComments")
    post: Post @connection(name: "PostComments")
    timeCreated: String
}

type Like @model {
    id: ID!
    user: User @connection(name: "UserLikes")
    post: Post @connection(name: "PostLikes")
    timeCreated: String
}
```

## notes
Date.toISOString()
console.log(moment("2019-09-24T20:08:26.874Z").fromNow())

