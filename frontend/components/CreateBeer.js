import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import formatMoney from '../lib/formatMoney';

const CREATE_BEER_MUTATION = gql`
  mutation CREATE_BEER_MUTATION(
    $name: String!
    $description: String!
    $style: String!
    $price: Int!
    $abv: Float!
    $ibu: Int!
    $image: String
    $largeImage: String
  ) {
    createBeer(
      name: $name
      description: $description
      style: $style
      price: $price
      abv: $abv
      ibu: $ibu
      image: $image
      largeImage: $largeImage
    ) {
      id
      name
    }
  }
`;

export default class CreateBeer extends Component {
  state = {
    name: '',
    style: '',
    description: '',
    ibu: 0,
    abv: 0,
    image: '',
    largeImage: '',
    price: 0
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'Number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async e => {
    console.log('uploading file');
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'madtaps');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dvgb0d5po/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_BEER_MUTATION} variables={this.state}>
        {(createBeer, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const res = await createBeer();
              Router.push({
                pathname: '/beer/',
                query: {
                  id: res.data.createBeer.id
                }
              });
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='file'>
                Image
                <input
                  type='file'
                  id='file'
                  name='file'
                  placeholder='Upload an image'
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img
                    width='200'
                    src={this.state.image}
                    alt='Upload Preview'
                  />
                )}
              </label>
              <label htmlFor='name'>
                Beer Name
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Name'
                  required
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='style'>
                Beer Style
                <input
                  type='text'
                  id='style'
                  name='style'
                  placeholder='Style'
                  required
                  value={this.state.style}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='description'>
                Description
                <textarea
                  id='description'
                  name='description'
                  placeholder='Description'
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='price'>
                Price
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Price'
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='abv'>
                Abv
                <input
                  type='number'
                  id='abv'
                  name='abv'
                  placeholder='Abv'
                  required
                  value={this.state.abv}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor='ibu'>
                Ibu
                <input
                  type='number'
                  id='ibu'
                  name='ibu'
                  placeholder='Ibu'
                  required
                  value={this.state.ibu}
                  onChange={this.handleChange}
                />
              </label>
            </fieldset>
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Mutation>
    );
  }
}

export { CREATE_BEER_MUTATION };
