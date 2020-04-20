import App, { Container } from 'next/app';
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <p>I'm on every page</p>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}

export default MyApp;
