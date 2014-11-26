var Component = require('ui/component');
var View = require('./View');
var TitleBar = require('../components/TitleBar');

module.exports = Component('ViewLeft', {
  render() {
    var { children, title, ...props } = this.props;

    return title ? (
      <div {...this.componentProps()}>
        <TitleBar>{title}</TitleBar>
        <View {...props} top={0}>
          {children}
        </View>
      </div>
    ) : (
      <View {...props} {...this.componentProps()} top={0}>
        {children}
      </View>
    );
  }
});