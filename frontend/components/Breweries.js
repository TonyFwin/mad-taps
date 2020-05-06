import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Brewery from './Brewery';

const ALL_BREWERIES_QUERY = gql`
  query ALL_BREWERIES_QUERY {
    breweries {
      id
      name
      description
      location
      image
    }
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class BreweryList extends Component {
  render() {
    return (
      <Query query={ALL_BREWERIES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <List>
              {data.breweries.map(brewery => (
                <Brewery key={brewery.id} brewery={brewery} />
              ))}
            </List>
          );
        }}
      </Query>
    );
  }
}
