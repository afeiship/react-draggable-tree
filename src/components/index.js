import noop from '@jswork/noop';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactTree from '@jswork/react-tree';
import dragula from 'dragula';

const CLASS_NAME = 'react-draggable-tree';
const DEFAULT_TEMPLATE = ({ item }, cb) => {
  return (
    <div key={item.value} data-value={item.value} className={'is-node'}>
      <label className="is-label">{item.label}</label>
      <div className="is-nodes">{cb()}</div>
    </div>
  );
};

export default class ReactDraggableTree extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * The data source.
     */
    items: PropTypes.array,
    /**
     * Item template.
     */
    template: PropTypes.func,
    /**
     * Child item key.
     */
    itemsKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  };

  static defaultProps = {
    template: DEFAULT_TEMPLATE,
    itemsKey: 'children'
  };

  componentDidMount() {
    const nodes = nx
      .slice(this.root.querySelectorAll('.is-nodes'))
      .concat(this.root.querySelector('.react-tree'));

    this.drake = dragula(nodes, {
      accepts: (el, target) => {
        return !el.contains(target);
      }
    });

    this.drake.on('drop', (el, target, source, sibling) => {
      const src = nx.get(el, 'dataset.value');
      const dst = nx.get(sibling, 'dataset.value');
      console.log(src, dst);
      console.log('el, target, source, sibling:', el, target, source, sibling);
    });
  }

  render() {
    const { className, ...props } = this.props;
    return (
      <div
        ref={(root) => (this.root = root)}
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}>
        <ReactTree {...props} />
      </div>
    );
  }
}
