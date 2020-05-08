import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleBreweryStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
  }
`;

const SINGLE_BREWERY_QUERY = gql`
  query SINGLE_BREWERY_QUERY($id: ID!) {
    brewery(where: { id: $id }) {
      id
      name
      description
      location
      largeImage
    }
  }
`;

export default class SingleBeer extends Component {
  render() {
    return (
      <Query query={SINGLE_BREWERY_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.brewery) return <p>No Brewery found for {this.props.id}</p>;
          const brewery = data.brewery;
          return (
            <SingleBreweryStyles>
              <Head>
                <title>Mad Taps | {brewery.name}</title>
              </Head>
              <img src={brewery.largeImage} alt={brewery.name} />
              <div className='details'>
                <h2>{brewery.name}</h2>
                <p>{brewery.description}</p>
                <p>{brewery.location}</p>
              </div>
            </SingleBreweryStyles>
          );
        }}
      </Query>
    );
  }
}
