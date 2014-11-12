var { Page } = require('carpo');
var Articles = require('../components/articles/Articles');
var Brawndo = require('brawndo');

module.exports = Page('Articles', [Brawndo.FluxMixin], {
  getDefaultProps: params => Brawndo.StoreLoader('Articles'),
  render: cursor => Articles('Articles', cursor)
});