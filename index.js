/** @jsx React.DOM */
'use strict';

var React = require('react'),
    Children = require('react/addons').Children,
    PropTypes = React.PropTypes;

/**
 * Provides a declarative way to specify `document.title` in a single-page app.
 * This component is only intended for client-side usage.
 *
 * Because it is just a React component, you can return it in `render` inside
 * your own components, and use their `props` or `state` to determine the title.
 *
 * `DocumentTitle` does not render to DOM itself, not even to a <noscript />.
 * In its `render`, it simply returns the only child that was passed to it.
 * Being a container itself, it allows title nesting and specificity.

 * For example, you may put it at the very top of view hierarchy to specify the
 * default title, and then you can give some pages their own `DocumentTitle`s
 * that depend on their `props` or `state`.
 *
 * Sample code (assuming you use something like react-router):
 *
 *     var App = React.createClass({
 *       render: function () {
 *
 *         // Use "My Web App" if no child overrides this
 *
 *         return (
 *           <DocumentTitle title='My Web App'>
*              <this.props.activeRouteHandler />
 *           </DocumentTitle>
 *         );
 *       }
 *     });
 *
 *     var HomePage = React.createClass({
 *       render: function () {
 *
 *         // Use "Home" when this component is mounted
 *
 *         return (
 *           <DocumentTitle title='Home'>
 *             <h1>Home, sweet home.</h1>
 *           </DocumentTitle>
 *         );
 *       }
 *     });
 *
 *     var NewArticlePage = React.createClass({
 *       mixins: [LinkStateMixin],
 *
 *       render: function () {
 *
 *         // Update using value from state when this component is mounted
 *
 *         return (
 *           <DocumentTitle title={this.state.title || 'Untitled'}>
 *             <div>
 *               <h1>New Article</h1>
 *               <input valueLink={this.linkState('title')} />
 *             </div>
 *           </DocumentTitle>
 *         );
 *       }
 *     });
 */
var DocumentTitle = React.createClass({
  propTypes: {
    title: PropTypes.string
  },

  statics: {
    mountedInstances: [],

    getActiveInstance: function () {
      var length = DocumentTitle.mountedInstances.length;
      if (length > 0) {
        return DocumentTitle.mountedInstances[length - 1];
      }
    },

    updateDocumentTitle: function () {
      if (typeof document === 'undefined') return;
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