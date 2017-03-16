'use strict';

var React = require('react');
var withSideEffect = require('react-side-effect');

function reducePropsToState(propsList) {
  return DocumentTitle.join(propsList.map(function (e) { return e.title; }));
}

function handleStateChangeOnClient(title) {
  var nextTitle = title || '';
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}

var DocumentTitleBase = React.createClass({
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

var DocumentTitle = module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitleBase);

DocumentTitle.join = function (tokens) {
  return tokens.pop();
};
