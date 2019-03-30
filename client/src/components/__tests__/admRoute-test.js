import React from 'react';
import { shallow } from 'enzyme'; 
import AdminRoute from '../../common/adminRoute';
import PostEditContainer from '../../containers/admin/postEdit';

describe('AdminRoute Component', () => {
  it('renders correctly', () => {
    const component = shallow(<AdminRoute component={PostEditContainer} exact path='/admin/post/:id/edit' guard />);
    expect(component).toMatchSnapshot();
  })
});