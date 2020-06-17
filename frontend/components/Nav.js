import React from 'react';
import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

// TODO: Hide /sell link if user is not logged in as brewery user

const Nav = props => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <Link href='/beers'>
            <a>Shop</a>
          </Link>
          <Link href='/breweries'>
            <a>Breweries</a>
          </Link>
          {me && (
            <>
              <Link href='/sell'>
                <a>Sell</a>
              </Link>
              <Link href='/orders'>
                <a>Orders</a>
              </Link>
              <Link href='/me'>
                <a>Account</a>
              </Link>
            </>
          )}
          {!me && (
            <Link href='/signup'>
              <a>Sign in</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};

export default Nav;
