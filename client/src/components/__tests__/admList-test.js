import React from 'react';
import { shallow } from 'enzyme'; 
import AdmItemList from '../admItemList';

describe('AdmList Component', () => {
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

    const component = shallow(<AdmItemList posts={posts} subscribeToMore={()=>{}}/>);
    expect(component).toMatchSnapshot();
  })
});