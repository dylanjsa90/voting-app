import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner.jsx';
import Vote from './Vote.jsx';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
      {this.props.winner ? 
        <Winner ref="winner" winner={this.props.winner} /> :
        <Vote {...this.props} />} 
    </div>
      
  }
});