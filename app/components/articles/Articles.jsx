var { Component } = require('carpo');
var { ActiveRouteHandler } = require('react-router');
var List = require('ui/components/List');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ViewLoaderMixin = require('ViewLoaderMixin');

require('./Articles.styl');

module.exports = Component('Articles', [ViewLoaderMixin],
  function render(props) {
    var { data, views } = props;

    makeViews(views, data.get('articles'));

    return (
      <div id="ArticlesPage">
        <ViewLeft id="articlesLeftView">
          <DottedViewList
            views={views && views.toJS()}
            onViewLeave={this.handleViewLeave}
            onViewEnter={this.handleViewEnter}
            onTouchStart={this.handleTouchStart} />
        </ViewLeft>

        <ViewMain>
        </ViewMain>
      </div>
    );
  }
);

// {ActiveRouteHandler && (
//   <div className="drawer-parent">
//     <ActiveRouteHandler {...this.props} />
//   </div>
// )}

var hasSetContents;

function makeViews(views, data) {
  if (hasSetContents || !views || !data) return;

  views.forEach(view => {
    view.update('content', content => contentForViews(data));
  });

  hasSetContents = true;
}

function contentForViews(articles) {
  return (
    <List dontWrap={true} liStyle={{ padding: 0 }}>
      {articles && articles.map(article =>
        ArticleItem(`AI-${article.get('id')}`, article)).toArray()}
    </List>
  );
}