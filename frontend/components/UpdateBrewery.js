import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SINGLE_BREWERY_QUERY = gql`
  query SINGLE_BREWERY_QUERY($id: ID!) {
    brewery(where: { id: $id }) {
      id
      name
      description
      location
    }
  }
`;

const UPDATE_BREWERY_MUTATION = gql`
  mutation UPDATE_BREWERY_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $location: String
  ) {
    updateBrewery(
      id: $id
      name: $name
      description: $description
      location: $location
    ) {
      id
      name
      description
      location
    }
  }
`;

class UpdateBrewery extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  updateBrewery = async (e, updateBreweryMutation) => {
    e.preventDefault();
    console.log('Updating Item!!');
    console.log(this.state);
    const res = await updateBreweryMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    console.log('Updated!!');
  };

  render() {
    return (
      <Query
        query={SINGLE_BREWERY_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.brewery) return <p>No Item Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_BREWERY_MUTATION} variables={this.state}>
              {(updateBrewery, { loading, error }) => (
                <Form onSubmit={e => this.updateBrewery(e, updateBrewery)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor='name'>
                      Brewery Name
                      <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Name'
                        required
                        defaultValue={data.brewery.name}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor='location'>
                      Location
                      <input
                        type='text'
                        id='location'
                        name='location'
                        placeholder='Location'
                        required
                        defaultValue={data.brewery.location}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor='description'>
                      Description
                      <textarea
                        id='description'
                        name='description'
                        placeholder='Description'
                        required
                        defaultValue={data.brewery.description}
                        onChange={this.handleChange}
                      />
                    </label>
                  </fieldset>
                  <button type='submit'>Sav{loading ? 'ing' : 'e'}</button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export default UpdateBrewery;
export { UPDATE_BREWERY_MUTATION };
