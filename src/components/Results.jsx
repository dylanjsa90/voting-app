import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createCLass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>Hello From results!</div>
  }
});