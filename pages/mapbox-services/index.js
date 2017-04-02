import React from 'react';
import { browserHistory } from 'react-router';
import { config } from 'config';
import { prefixLink } from 'gatsby-helpers'

module.exports = React.createClass({
  componentDidMount: function() {
    window.location.href = window.location.href = prefixLink("/mapbox-services/2.0.1/getting-started/")
  },
  render () {
    return (<div></div>
    )
  }
});
