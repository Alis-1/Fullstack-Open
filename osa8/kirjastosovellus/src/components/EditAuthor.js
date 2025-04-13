import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const EditAuthor = () => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();
    await editAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setName('');
    setBorn('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Edit Author</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select author</option>
            {data.allAuthors.map(author => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born <input value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">Edit Author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
