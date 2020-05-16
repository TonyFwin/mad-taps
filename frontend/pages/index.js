import React from 'react';
import Beers from '../components/Beers';

const Home = props => (
  <div>
    <Beers page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
