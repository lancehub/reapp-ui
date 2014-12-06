var Component = require('ui/component');
var TweenState = require('react-tween-state');

module.exports = Component('Icon', {
  mixins: [TweenState.Mixin],

  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      style: {},
      svgProps: {}
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.animation === 'ROTATE') {
      this.setState({ step: 0 });
      this.rotate();
    }
    else {
      this.setState({ step: null });
    }
  },

  rotate() {
    this.tweenState('step', {
      endValue: this.state.step === 0 ? 1 : 0,
      duration: 500,
      onEnd: this.rotate
    });
  },

  render() {
    var {
      animation,
      size,
      type,
      color,
      stroke,
      shapeRendering,
      svgProps,
      ...props
    } = this.props;

    svgProps = Object.assign({
      style: Object.assign({
        width: size,
        height: size,
        shapeRendering: shapeRendering ? shapeRendering : 'initial',
        fill: 'currentColor'
      }, svgProps.style),
      viewBox: '0 0 64 64',
      fill: color
    }, svgProps);

    if (stroke) {
      Object.assign(svgProps, {
        stroke: color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });
    }

    Object.assign(props.style, {
      color: color,
      width: size,
      height: size,
      overflow: 'hidden'
    }, props.style);

    if (animation)
      props.style = this.getAnimationStyles(animation);

    return (
      <span {...props} {...this.componentProps()}>
        <svg {...svgProps}>
          <g dangerouslySetInnerHTML={{__html:
            '<use xlink:href="/assets/icons/svg/'+ type +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});