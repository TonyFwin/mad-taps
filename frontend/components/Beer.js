import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import DeleteBeer from './DeleteBeer';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';
import Item from './styles/ItemStyles';
import formatMoney from '../lib/formatMoney';

export default class Beer extends Component {
  static propTypes = {
    beer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      ibu: PropTypes.number.isRequired,
      abv: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      largeImage: PropTypes.string.isRequired
    })
  };

  render() {
    const { beer } = this.props;
    return (
      <ItemStyles>
        {beer.image && <img src={beer.image} alt={beer.name} />}
        <Title>
          <Link
            href={{
              pathname: '/beer',
              query: { id: beer.id }
            }}
          >
            <a>{beer.name}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(beer.price)}</PriceTag>
        <p>{beer.description}</p>
        <div className='buttonList'>
          <Link
            href={{
              pathname: `/update`,
              query: { id: beer.id }
            }}
          >
            <a>Edit 📝</a>
          </Link>
          <button> Add to Card</button>
          <DeleteBeer id={beer.id}>Delete This Item</DeleteBeer>
        </div>
      </ItemStyles>
    );
  }
}
