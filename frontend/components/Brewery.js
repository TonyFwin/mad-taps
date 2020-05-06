import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import Item from './styles/ItemStyles';

export default class Brewery extends Component {
  static propTypes = {
    brewery: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  };

  render() {
    const { brewery } = this.props;
    return (
      <ItemStyles>
        {brewery.image && <img src={brewery.image} alt={brewery.name} />}
        <Title>
          <Link
            href={{
              pathname: '/brewery',
              query: { id: brewery.id }
            }}
          >
            <a>{brewery.name}</a>
          </Link>
        </Title>

        <p>{brewery.description}</p>
        <div className='buttonList'>
          <Link
            href={{
              pathname: `/update`,
              query: { id: brewery.id }
            }}
          >
            <a>Edit 📝</a>
          </Link>
        </div>
      </ItemStyles>
    );
  }
}
