import React from 'react';
import UpdateBeer from '../components/UpdateBeer';

const Sell = ({ query }) => {
  return (
    <div>
      <UpdateBeer id={query.id} />
    </div>
  );
};

export default Sell;
