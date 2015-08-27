React Document Title
====================

Provides a declarative way to specify `document.title` in a single-page app.  
This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect).

====================

## Installation

```
npm install --save react-document-title
```

Dependencies: React >= 0.13.0

## Features

* Does not emit DOM, not even a `<noscript>`;
* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, so you can define app-wide and page-specific titles;
* Works just as well with isomorphic apps.

## Example

Assuming you use something like [react-router](https://github.com/rackt/react-router):

```javascript
var App = React.createClass({
  render: function () {
    // Use "My Web App" if no child overrides this
    return (
      <DocumentTitle title='My Web App'>
        <this.props.activeRouteHandler />
      </DocumentTitle>
    );
  }
});

var HomePage = React.createClass({
  render: function () {
    // Use "Home" while this component is mounted
    return (
      <DocumentTitle title='Home'>
        <h1>Home, sweet home.</h1>
      </DocumentTitle>
    );
  }
});

var NewArticlePage = React.createClass({
  mixins: [LinkStateMixin],

  render: function () {
    // Update using value from state while this component is mounted
    return (
      <DocumentTitle title={this.state.title || 'Untitled'}>
        <div>
          <h1>New Article</h1>
          <input valueLink={this.linkState('title')} />
        </div>
      </DocumentTitle>
    );
  }
});
```

## Server Usage

If you use it on server, call `DocumentTitle.rewind()` **after rendering components to string** to retrieve the title given to the innermost `DocumentTitle`. You can then embed this title into HTML page template.

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server**, or you'll get a memory leak.

## But What About Meta Tags?

Looking for something more powerful? Check out [React Helmet](https://github.com/nfl/react-helmet)!
