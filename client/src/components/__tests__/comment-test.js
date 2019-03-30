import React from 'react';
import renderer from 'react-test-renderer';
import Comment from '../comment';

describe('Comment Component', () => {
  it('renders correctly', () => {
    const comment = {
      authorName: "test",
      content: "conent"
    }
    const tree = renderer.create(
      <Comment comment={comment} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  })
});