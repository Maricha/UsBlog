import React from 'react';
import { shallow } from 'enzyme'; 
import Navbar from '../navbar';

describe('navbar Component', () => {
  it('renders correctly', () => {
    const component = shallow(<Navbar
        classes={{sd: "sd"}}    
        title="title"
        toolbar
        mainUrl="/"
        contact
        adminLogout
    />);
    expect(component).toMatchSnapshot();
  })
});