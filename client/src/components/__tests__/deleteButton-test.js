import React from 'react';
import { shallow } from 'enzyme'; 
import DeleteButton from '../deleteButton';

describe('Delete Button Component', () => {
  it('renders correctly', () => {
    const component = shallow(<DeleteButton id={1} />);
    expect(component).toMatchSnapshot();
  })
});