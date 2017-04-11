'use strict';

var React = require('react'),
    PropTypes = require('prop-types'),
    withSideEffect = require('react-side-effect');

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

function handleStateChangeOnClient(title) {
  var nextTitle = title || '';
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}

function DocumentTitle() {
  React.Component.call(this);
  this.displayName = 'DocumentTitle';
}

DocumentTitle.prototype = Object.assign(Object.create(React.Component.prototype), {
  constructor: DocumentTitle,
  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired
};

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
