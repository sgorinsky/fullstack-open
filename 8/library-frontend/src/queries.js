import { gql } from '@apollo-client'

export const ALL_AUTHOR = gql`
{
  allAuthor {
    name,
    born,
    id
  }
}
`

export const FIND_AUTHOR = gql`
query findAuthor($name: String!) {
  findAuthor(name: $name) {
    name,
    born,
    id
  }
}
`

export const ADD_AUTHOR = gql`
mutation addAuthor($name: String!, $born: Int!) {
  addAuthor(name: $name, born: $born) {
    name,
    born,
    id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, born: Int!) {
  editAuthor(name: $name, born: $born) {
    name,
    born,
    id
  }
}
`


/*
type Query {
  authorCount: Int!
    findAuthor(name: String!): Author!
allAuthors: [Author!]!

bookCount: Int!
findBook(title: String!): Book!
allBooks(author: String, genre: String): [Book!]!
  }

type Mutation {

  editAuthor(
    name: String!
      born: Int!
  ): Author
}
*/