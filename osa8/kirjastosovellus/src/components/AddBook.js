import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState('');
  const [addBook] = useMutation(ADD_BOOK);

  const submit = async (event) => {
    event.preventDefault();
    await addBook({ variables: { title, author, published: parseInt(published), genres: genres.split(',') } });
    setTitle('');
    setAuthor('');
    setPublished('');
    setGenres('');
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={submit}>
        <div>
          Title <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          Author <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          Published <input value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          Genres <input value={genres} onChange={({ target }) => setGenres(target.value)} />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
