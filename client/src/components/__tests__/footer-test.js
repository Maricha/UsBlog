import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import Footer from '../footer';

describe('Footer Component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Footer />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});