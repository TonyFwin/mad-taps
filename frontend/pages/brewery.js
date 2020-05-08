import React from 'react';
import SingleBrewery from '../components/SingleBrewery';

const Brewery = props => (
  <div>
    <SingleBrewery id={props.query.id} />
  </div>
);

export default Brewery;
