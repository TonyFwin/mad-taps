import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_BEERS_QUERY } from './Beers';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteBeer(id: $id) {
      id
    }
  }
`;

export default class DeleteBeer extends Component {
  update = (cache, payload) => {
    // manually update cache on client to match the server
    // read the cache for items we want
    const data = cache.readQuery({ query: ALL_BEERS_QUERY });
    // filter the deleted item out of the page
    data.beers = data.beers.filter(
      beer => beer.id !== payload.data.deleteBeer.id
    );
    // put the beers back
    cache.writeQuery({ query: ALL_BEERS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteBeer, { error }) => (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this?')) {
                deleteBeer();
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}
