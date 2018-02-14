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

function DocumentTitle(props) {
    return props.children || null;
}

DocumentTitle.displayName = 'DocumentTitle';
DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired
};

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(DocumentTitle);
