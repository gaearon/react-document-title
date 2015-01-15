'use strict';

var React = require('react'),
    Children = require('react/addons').Children,
    PropTypes = React.PropTypes,
    BubbleMixin = require('./BubbleMixin');

var DocumentTitle = React.createClass({
  displayName: 'DocumentTitle',

  mixins: [BubbleMixin],

  statics: {
    rewind: function () {
      var activeInstance = this.getActiveInstance();
      this.clearMountedInstances();

      if (activeInstance) {
        return activeInstance.props.title;
      }
    }
  },

  propTypes: {
    title: PropTypes.string
  },

  getDefaultProps: function () {
    return {
      title: ''
    };
  },

  performSideEffect: function () {
    var title = this.props.title;
    if (typeof document !== 'undefined' && title !== document.title) {
      document.title = title;
    }
  }
});

module.exports = DocumentTitle;
