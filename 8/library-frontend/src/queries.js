import { gql } from '@apollo/client'

// AUTHORS
export const ALL_AUTHORS = gql`
{
  allAuthors {
    name,
    born,
    bookCount,
    id
  }
}
`

export const FIND_AUTHOR = gql`
query findAuthor($name: String!) {
  findAuthor(name: $name) {
    name,
    born,
    bookCount,
    id
  }
}
`

export const ADD_AUTHOR = gql`
mutation addAuthor($name: String!, $born: Int!) {
  addAuthor(name: $name, born: $born) {
    name,
    born,
    bookCount
    id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name,
    born,
    bookCount,
    id
  }
}
`

// BOOKS
export const ALL_BOOKS = gql`
{
  allBooks {
    title,
    published,
    genres,
    author {
      name
    }
  }
}
`

export const FIND_BOOK = gql`
query findBook($title: String!) {
  findAuthor(title: $title) {
    title,
    author {
      name
    },
    genres,
    id
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addAuthor(title: $title, published: $published, author: $author, genres: $genres) {
    title,
    published,
    author {
      name
    },
    genres,
    id
  }
}
`

export const EDIT_BOOK = gql`
mutation editBook($title: String!, $published: Int, $author: String, $genres: [String]) {
  editAuthor(title: $title, published: $published, author: $author, genres: $genres) {
    title,
    published,
    author {
      name
    },
    genres,
    id
  }
}
`