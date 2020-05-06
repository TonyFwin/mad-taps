import React from 'react';
import UpdateBrewery from '../components/UpdateBrewery';

const updateBrewery = ({ query }) => {
  return (
    <div>
      <UpdateBrewery id={query.id} />
    </div>
  );
};

export default updateBrewery;
