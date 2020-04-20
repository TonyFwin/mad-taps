import React from 'react';
import Nav from './Nav';

const Header = props => {
  return (
    <div>
      <div className='bar'>
        <a href='/'>Mad Taps</a>
        <Nav />
        <div className='sub-bar'>
          <p>Search</p>
        </div>
      </div>
      <div>Cart</div>
    </div>
  );
};

export default Header;
