import React from 'react';
import { shallow } from 'enzyme'; 
import BlogLayout from '../../common/blogLayout';
import Footer from '../footer';

describe('BlogLayout Component', () => {
  it('renders correctly', () => {
    const component = shallow(
      <BlogLayout>
        <Footer />
      </BlogLayout>    
    );
    expect(component).toMatchSnapshot();
  })
});