import React from 'react';
import { shallow } from 'enzyme'; 
import LoadingSpinner from '../loadingSpinner';

describe('Loading spinner Component', () => {
  it('renders correctly', () => {
    const component = shallow(<LoadingSpinner classes={{sd: "sd"}}/>);
    expect(component).toMatchSnapshot();
  })
});