import { gql } from '@apollo/client'

// AUTHORS
export const ALL_AUTHORS = gql`
{
  allAuthors {
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
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name,
    born,
    id
  }
}
`

// BOOKS
export const ALL_BOOKS = gql`
{
  allBooks {
    title
    author,
    genre,
    id
  }
}
`

export const FIND_BOOK = gql`
query findBook($title: String!) {
  findAuthor(title: $title) {
    title,
    author,
    genre,
    id
  }
}
`