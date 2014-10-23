/*jshint newcap: false */
/*global describe, it */
'use strict';
var expect = require('expect.js'),
    React = require('react'),
    DocumentTitle = require('../');

describe('DocumentTitle', function () {
  it('hides itself from the DOM', function () {
    var Component = React.createClass({
      render: function () {
        return DocumentTitle({title: 'irrelevant'},
          React.DOM.div(null, 'hello')
        );
      }
    });
    var markup = React.renderComponentToStaticMarkup(Component());
    expect(markup).to.equal('<div>hello</div>');
  });
  it('throws an error if it has multiple children', function (done) {
    var Component = React.createClass({
      render: function () {
        return DocumentTitle({title: 'irrelevant'},
          React.DOM.div(null, 'hello'),
          React.DOM.div(null, 'world')
        );
      }
    });
    expect(function () {
      React.renderComponentToStaticMarkup(Component());
    }).to.throwException(function (e) {
      expect(e.message).to.match(/^Invariant Violation:/);
      done();
    });
  });
  it('works with complex children', function () {
    var Component1 = React.createClass({
      render: function() {
        return React.DOM.p(null,
          React.DOM.span(null, 'c'),
          React.DOM.span(null, 'd')
        );
      }
    });
    var Component2 = React.createClass({
      render: function () {
        return DocumentTitle({title: 'irrelevant'},
          React.DOM.div(null,
            React.DOM.div(null, 'a'),
            React.DOM.div(null, 'b'),
            React.DOM.div(null, Component1())
          )
        );
      }
    });
    var markup = React.renderComponentToStaticMarkup(Component2());
    expect(markup).to.equal(
      '<div>' +
        '<div>a</div>' +
        '<div>b</div>' +
        '<div>' +
          '<p>' +
            '<span>c</span>' +
            '<span>d</span>' +
          '</p>' +
        '</div>' +
      '</div>'
    );
  });
});