'use strict';

var React = require('react'),
    createSideEffect = require('react-side-effect');

var _serverTitle = null;

function getTitleFromPropsList(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

var DocumentTitle = createSideEffect(function handleChange(propsList) {
  var title = getTitleFromPropsList(propsList);

  if (typeof document !== 'undefined') {
    document.title = title || '';
  } else {
    _serverTitle = title || null;
  }
}, {
  displayName: 'DocumentTitle',

  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  statics: {
    peek: function () {
      return _serverTitle;
    },

    rewind: function () {
      var title = _serverTitle;
      this.dispose();
      return title;
    }
  }
});

module.exports = DocumentTitle;