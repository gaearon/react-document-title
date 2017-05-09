'use strict';

var React = require('react');
var PropTypes = require('prop-types');
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

function DocumentTitleBase() {}
DocumentTitleBase.prototype = Object.create(React.Component.prototype);

DocumentTitleBase.displayName = 'DocumentTitle';
DocumentTitleBase.propTypes = {
  title: PropTypes.string.isRequired
};

DocumentTitleBase.prototype.render = function() {
  if (this.props.children) {
    return React.Children.only(this.props.children);
  } else {
    return null;
  }
};

var DocumentTitle = module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitleBase);

DocumentTitle.join = function (tokens) {
  return tokens.pop();
};
