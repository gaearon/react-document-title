'use strict';

var React = require('react'),
    Children = require('react/addons').Children,
    PropTypes = React.PropTypes;

var BubbleMixin = {
  statics: {
    clearMountedInstances: function () {
      this.mountedInstances = [];
    },

    getMountedInstances: function () {
      if (!this.mountedInstances) {
        this.mountedInstances = [];
      }

      return this.mountedInstances;
    },

    getActiveInstance: function () {
      var mountedInstances = this.getMountedInstances();
      if (mountedInstances.length > 0) {
        return mountedInstances[mountedInstances.length - 1];
      }
    },

    performSideEffectOnActiveInstance: function () {
      var activeInstance = this.getActiveInstance();
      if (activeInstance) {
        activeInstance.performSideEffect();
      }
    }
  },

  isActiveInstance: function () {
    return this === this.constructor.getActiveInstance();
  },

  componentWillMount: function () {
    var mountedInstances = this.constructor.getMountedInstances();
    mountedInstances.push(this);

    this.constructor.performSideEffectOnActiveInstance();
  },

  componentDidUpdate: function (prevProps) {
    if (this.isActiveInstance()) {
      this.constructor.performSideEffectOnActiveInstance();
    }
  },

  componentWillUnmount: function () {
    var mountedInstances = this.constructor.getMountedInstances(),
        index = mountedInstances.indexOf(this);

    mountedInstances.splice(index, 1);
    this.constructor.performSideEffectOnActiveInstance();
  },

  render: function () {
    if (this.props.children) {
      return Children.only(this.props.children);
    } else {
      return null;
    }
  }
};

module.exports = BubbleMixin;