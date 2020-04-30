import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';

const SINGLE_BEER_QUERY = gql`
  query SINGLE_BEER_QUERY($id: ID!) {
    beer(where: { id: $id }) {
      id
      name
      description
      style
      price
      abv
      ibu
    }
  }
`;

const UPDATE_BEER_MUTATION = gql`
  mutation UPDATE_BEER_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $style: String
    $price: Int
    $abv: Float
    $ibu: Int
  ) {
    updateBeer(
      id: $id
      name: $name
      description: $description
      style: $style
      price: $price
      abv: $abv
      ibu: $ibu
    ) {
      id
      name
      description
      style
      price
      abv
      ibu
    }
  }
`;

class UpdateBeer extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'Number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  updateBeer = async (e, updateBeerMutation) => {
    e.preventDefault();
    console.log('Updating Item!!');
    console.log(this.state);
    const res = await updateBeerMutation({
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
        query={SINGLE_BEER_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.beer) return <p>No Item Found for ID {this.props.id}</p>;
          return (
            <Mutation mutation={UPDATE_BEER_MUTATION} variables={this.state}>
              {(updateBeer, { loading, error }) => (
                <Form onSubmit={e => this.updateBeer(e, updateBeer)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor='name'>
                      Beer Name
                      <input
                        type='text'
                        id='name'
                        name='name'
                        placeholder='Name'
                        required
                        defaultValue={data.beer.name}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor='style'>
                      Beer Style
                      <input
                        type='text'
                        id='style'
                        name='style'
                        placeholder='Style'
                        required
                        defaultValue={data.beer.style}
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
                        defaultValue={data.beer.description}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor='price'>
                      Price
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='Price'
                        required
                        defaultValue={data.beer.price}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor='abv'>
                      Abv
                      <input
                        type='number'
                        id='abv'
                        name='abv'
                        placeholder='Abv'
                        required
                        defaultValue={data.beer.abv}
                        onChange={this.handleChange}
                      />
                    </label>
                    <label htmlFor='ibu'>
                      Ibu
                      <input
                        type='number'
                        id='ibu'
                        name='ibu'
                        placeholder='Ibu'
                        required
                        defaultValue={data.beer.ibu}
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
export default UpdateBeer;
export { UPDATE_BEER_MUTATION };
