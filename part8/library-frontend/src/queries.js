import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author { name }
      published
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author { name, born },
      published,
      genres
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation modAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name,
      born
    }
  }
`
export const LOGIN = gql`
  mutation logIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
