/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';

var expect = require('expect.js'),
    jsdom = require('mocha-jsdom'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    createReactClass = require('create-react-class'),
    DocumentTitle = require('../');

jsdom();

describe('DocumentTitle (in a browser)', function () {
  var container;
  beforeEach(function() {
    container = document.createElement('div');
  });
  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
    delete global.document.title;
  });
  before(function () {
    DocumentTitle.canUseDOM = true;
  });
  it('changes the document title on mount', function (done) {
    var title = 'hello world';
    var Component = createReactClass({
      componentDidMount: function () {
        expect(global.document.title).to.equal(title);
        done();
      },
      render: function () {
        return React.createElement(DocumentTitle, {title: title});
      }
    });
    ReactDOM.render(React.createElement(Component), container);
  });
  it('supports nesting', function (done) {
    var called = false;
    var title = 'hello world';
    var Component1 = createReactClass({
      componentDidMount: function () {
        setTimeout(function () {
          expect(called).to.be(true);
          expect(global.document.title).to.equal(title);
          done();
        });
      },
      render: function () {
        return React.createElement(DocumentTitle, {title: title});
      }
    });
    var Component2 = createReactClass({
      componentDidMount: function () {
        called = true;
      },
      render: function () {
        return React.createElement(DocumentTitle, {title: 'nope'},
          React.DOM.div(null, React.createElement(Component1))
        );
      }
    });
    ReactDOM.render(React.createElement(Component2), container);
  });
});
