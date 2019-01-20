import React from 'react';
import { shallow } from 'enzyme'; 
import AdminLayout from '../../common/adminLayout';

describe('AdminLayout Component', () => {
  it('renders correctly', () => {
    const component = shallow(<AdminLayout />);
    expect(component).toMatchSnapshot();
  })
});