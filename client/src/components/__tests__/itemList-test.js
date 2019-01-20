import React from 'react';
import { shallow } from 'enzyme'; 
import ItemList from '../itemList';

describe('IemList Component', () => {
  it('renders correctly', () => {
    const posts = [
      {
        id: 1,
        title: "title1"
      },
      {
        id: 2,
        title: "title2"
      }
    ]

    const firstPost = {
      id: 3,
      title: 'title3'
    }

    const secondPost = {
      id: 4,
      title: 'title4'
    }

    const component = shallow(<ItemList posts={posts} firstPost={firstPost} secondPost={secondPost} />);
    expect(component).toMatchSnapshot();
  })
});