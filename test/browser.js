/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';

var expect = require('expect.js');
var jsdom = require('mocha-jsdom');
var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
var DocumentTitle = require('../');

jsdom();

describe('DocumentTitle (in a browser)', function () {

  var container;
  beforeEach(function () {
    container = document.createElement('div');
    DocumentTitle.canUseDOM = true;
  });
  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
    delete global.document.title;
    DocumentTitle.canUseDOM = false;
    DocumentTitle.rewind();
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
