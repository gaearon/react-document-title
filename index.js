'use strict';

var React = require('react'),
    Children = require('react/addons').Children,
    PropTypes = React.PropTypes;

var DocumentTitle = React.createClass({
  displayName: 'DocumentTitle',

  propTypes: {
    title: PropTypes.string
  },

  statics: {
    mountedInstances: [],

    rewind: function () {
      var activeInstance = DocumentTitle.getActiveInstance();
      DocumentTitle.mountedInstances.splice(0);

      if (activeInstance) {
        return activeInstance.props.title;
      }
    },

    getActiveInstance: function () {
      var length = DocumentTitle.mountedInstances.length;
      if (length > 0) {
        return DocumentTitle.mountedInstances[length - 1];
      }
    },

    updateDocumentTitle: function () {
      if (typeof document === 'undefined') {
        return;
      }

      var activeInstance = DocumentTitle.getActiveInstance();
      if (activeInstance) {
        document.title = activeInstance.props.title;
      }
    }
  },

  getDefaultProps: function () {
    return {
      title: ''
    };
  },

  isActive: function () {
    return this === DocumentTitle.getActiveInstance();
  },

  componentWillMount: function () {
    DocumentTitle.mountedInstances.push(this);
    DocumentTitle.updateDocumentTitle();
  },

  componentDidUpdate: function (prevProps) {
    if (this.isActive() && prevProps.title !== this.props.title) {
      DocumentTitle.updateDocumentTitle();
    }
  },

  componentWillUnmount: function () {
    var index = DocumentTitle.mountedInstances.indexOf(this);
    DocumentTitle.mountedInstances.splice(index, 1);
    DocumentTitle.updateDocumentTitle();
  },

  render: function () {
    if (this.props.children) {
      return Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

module.exports = DocumentTitle;
