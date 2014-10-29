/*jshint newcap: false */
/*global global, describe, it, afterEach, before, after */
'use strict';
var expect = require('expect.js'),
    React = require('react'),
    DocumentTitle = require('../');

describe('DocumentTitle (in a browser)', function () {
  afterEach(function () {
    React.unmountComponentAtNode(global.document.body);
    delete global.document.title;
  });
  before(function () {
    // Prepare the globals React expects in a browser
    global.window = require('global/window');
    global.document = require('global/document');
    global.window.document = document;
    global.window.location = {};
    global.window.navigator = {userAgent: 'Chrome'};
    console.debug = console.log;
  });
  after(function () {
    delete global.window;
    delete global.document;
    delete console.debug;
  });
  it('changes the document title on mount', function (done) {
    var title = 'hello world';
    var Component = React.createClass({
      componentDidMount: function () {
        expect(global.document.title).to.equal(title);
        done();
      },
      render: function () {
        return React.createElement(DocumentTitle, {title: title});
      }
    });
    React.render(React.createElement(Component), global.document.body);
  });
  it('supports nesting', function (done) {
    var called = false;
    var title = 'hello world';
    var Component1 = React.createClass({
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
    var Component2 = React.createClass({
      componentDidMount: function () {
        called = true;
      },
      render: function () {
        return React.createElement(DocumentTitle, {title: 'nope'},
          React.DOM.div(null, React.createElement(Component1))
        );
      }
    });
    React.render(React.createElement(Component2), global.document.body);
  });
});
