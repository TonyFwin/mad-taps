import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleBeerStyles = styled.div`
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

    .beer-style {
      margin: 0;
    }
    .attributes p {
      margin: 0;
      font-size: 1.25rem;
    }
  }
`;

const SINGLE_BEER_QUERY = gql`
  query SINGLE_BEER_QUERY($id: ID!) {
    beer(where: { id: $id }) {
      id
      name
      description
      price
      abv
      ibu
      style
      largeImage
    }
  }
`;

export default class SingleBeer extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <ErrorMessage error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.beer) return <p>No Beer found for {this.props.id}</p>;
          const beer = data.beer;
          return (
            <SingleBeerStyles>
              <Head>
                <title>Mad Taps | {beer.name}</title>
              </Head>
              <img src={beer.largeImage} alt={beer.name} />
              <div className='details'>
                <h2>{beer.name}</h2>
                <p className='beer-style'>{beer.style}</p>
                <div className='attributes'>
                  <p>
                    {beer.abv}% ABV | {beer.ibu} IBU
                  </p>
                </div>
                <p>{beer.description}</p>
              </div>
            </SingleBeerStyles>
          );
        }}
      </Query>
    );
  }
}
