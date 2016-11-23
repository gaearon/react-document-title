'use strict';

var React = require('react'),
    withSideEffect = require('react-side-effect'),
    findLast = require('lodash.findlast');

function reducePropsToState(propsList) {
  var lastValid = findLast(propsList, 'title');
  if (lastValid) {
    return lastValid.title;
  }
}

function handleStateChangeOnClient(title) {
  var nextTitle = title || '';
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}

var DocumentTitle = React.createClass({
  displayName: 'DocumentTitle',

  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
