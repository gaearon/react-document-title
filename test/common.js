/*jshint newcap: false */
/*global describe, it, before */
'use strict';
var expect = require('expect.js'),
    React = require('react'),
    DocumentTitle = require('../');

describe('DocumentTitle', function () {
  before(function () {
    DocumentTitle.canUseDOM = false;
  });

  after(function () {
    DocumentTitle.rewind();
  });

  it('has a displayName', function () {
    var el = React.createElement(DocumentTitle);
    expect(el.type.displayName).to.be.a('string');
    expect(el.type.displayName).not.to.be.empty();
    expect(el.type.displayName).to.equal('SideEffect(DocumentTitle)');
  });
  it('hides itself from the DOM', function () {
    var Component = React.createClass({
      render: function () {
        return React.createElement(DocumentTitle, {title: 'irrelevant'},
          React.createElement('div', null, 'hello')
        );
      }
    });
    var markup = React.renderToStaticMarkup(React.createElement(Component));
    expect(markup).to.equal('<div>hello</div>');
  });
  it('throws an error if it has multiple children', function (done) {
    var Component = React.createClass({
      render: function () {
        return React.createElement(DocumentTitle, {title: 'irrelevant'},
          React.createElement('div', null, 'hello'),
          React.createElement('div', null, 'world')
        );
      }
    });
    expect(function () {
      React.renderToStaticMarkup(React.createElement(Component));
    }).to.throwException(function (e) {
      expect(e.message).to.match(/^Invariant Violation:/);
      done();
    });
  });
  it('works with complex children', function () {
    var Component1 = React.createClass({
      render: function() {
        return React.createElement('p', null,
          React.createElement('span', null, 'c'),
          React.createElement('span', null, 'd')
        );
      }
    });
    var Component2 = React.createClass({
      render: function () {
        return React.createElement(DocumentTitle, {title: 'irrelevant'},
          React.createElement('div', null,
            React.createElement('div', null, 'a'),
            React.createElement('div', null, 'b'),
            React.createElement('div', null, React.createElement(Component1))
          )
        );
      }
    });
    var markup = React.renderToStaticMarkup(React.createElement(Component2));
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

describe('DocumentTitle.join', function () { // tested via DocumentTitle.rewind
  var origJoin = DocumentTitle.join;
  afterEach(function () {
    DocumentTitle.join = origJoin;
  });

  it('returns the last document title by default', function () {
    var title = 'cheese';
    React.renderToStaticMarkup(
      React.createElement(DocumentTitle, {title: 'a'},
        React.createElement(DocumentTitle, {title: 'b'}, React.createElement(DocumentTitle, {title: title}))
      )
    );
    expect(DocumentTitle.rewind()).to.equal('cheese');
  });

  it('can be overriden for custom behavior, using all the tokens', function () {
    var title = 'cheese';
    DocumentTitle.join = function (tokens) {
      return tokens.join(' | ');
    };
    React.renderToStaticMarkup(
      React.createElement(DocumentTitle, {title: 'a'},
        React.createElement(DocumentTitle, {title: 'b'}, React.createElement(DocumentTitle, {title: title}))
      )
    );
    expect(DocumentTitle.rewind()).to.equal('a | b | cheese');
  });
});
