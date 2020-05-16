import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Beer from './Beer';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_BEERS_QUERY = gql`
  query ALL_BEERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    beers(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      name
      price
      ibu
      abv
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const BeerList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Beers extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_BEERS_QUERY}
          variables={{
            skip: this.props.page * perPage - perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <BeerList>
                {data.beers.map(beer => (
                  <Beer key={beer.id} beer={beer} />
                ))}
              </BeerList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export { ALL_BEERS_QUERY };
