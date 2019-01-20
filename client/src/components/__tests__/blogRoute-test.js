import React from 'react';
import { shallow } from 'enzyme'; 
import BlogRoute from '../../common/blogRoute';
import PostEditContainer from '../../containers/admin/postEdit';

describe('BlogRoute Component', () => {
  it('renders correctly', () => {
    const component = shallow(<BlogRoute component={PostEditContainer} exact path='/admin/post/:id/edit' tag="test" />);
    expect(component).toMatchSnapshot();
  })
});