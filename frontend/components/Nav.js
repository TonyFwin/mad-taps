import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';

// TODO: Hide /sell link if user is not logged in as brewery user

const Nav = props => {
  return (
    <NavStyles>
      <Link href='/beers'>
        <a>Shop</a>
      </Link>
      <Link href='/sell'>
        <a>Sell</a>
      </Link>
      <Link href='/breweries'>
        <a>Breweries</a>
      </Link>
      <Link href='/signup'>
        <a>Signup</a>
      </Link>
      <Link href='/orders'>
        <a>Orders</a>
      </Link>
      <Link href='/me'>
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;
