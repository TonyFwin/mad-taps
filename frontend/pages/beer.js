import React from 'react';
import SingleBeer from '../components/SingleBeer';

const Beer = props => (
  <div>
    <SingleBeer id={props.query.id} />
  </div>
);

export default Beer;
