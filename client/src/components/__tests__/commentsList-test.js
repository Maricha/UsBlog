import React from 'react';
import { shallow } from 'enzyme'; 
import CommentsList from '../commentsList';

describe('CommentList Component', () => {
  it('renders correctly', () => {
    const component = shallow(<CommentsList id={1} classes={{test: "sds"}}/>);
    expect(component).toMatchSnapshot();
  })
});