import noop from '@feizheng/noop';
import ReactTree from '@feizheng/react-tree';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sortablejs from 'sortablejs';
const CLASS_NAME = 'react-draggable-tree';

const itemsGetter = (itemsKey) => {
  return typeof itemsKey === 'function'
    ? itemsKey
    : function (_, item) {
        return item[itemsKey];
      };
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
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * The uniq row key.
     */
    // rowKey: PropTypes.any.isRequired,
    /**
     * Item template.
     */
    template: PropTypes.func.isRequired,
    /**
     * Child item key.
     */
    itemsKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * The core sortable component options (@sortable: https://github.com/SortableJS/Sortable).
     */
    options: PropTypes.object
  };

  static defaultProps = {
    itemsKey: 'children',
    onChange: noop
  };

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this.root);
    this.initSortable(dom, null);
  }

  initSortable(dom, parent) {
    const { options, disabled } = this.props;
    if (!dom) return;
    new Sortablejs(dom, {
      draggable: '.is-node',
      disabled,
      onSort: this.handleSort.bind(null, parent),
      onRemove: this.handleRemove.bind(null, parent),
      onUpdate: this.handleUpdate.bind(null, parent),
      ...options
    });
  }

  template = ({ item, independent }, cb) => {
    const { template } = this.props;
    const sortable = (dom) => this.initSortable(dom, item);
    return template({ item, independent, sortable }, cb);
  };

  getItems(inParent) {
    const { items, itemsKey } = this.props;
    const getter = itemsGetter(itemsKey);
    return inParent ? getter(-1, inParent) : items;
  }

  handleSort = (inParent, inEvent) => {
    if (this.moved) {
      const { newIndex } = inEvent;
      const currentItems = this.getItems(inParent);
      currentItems.splice(newIndex, 0, this.moved);
      this.moved = null;
      this.handleChange();
    }
  };

  handleRemove = (inParent, inEvent) => {
    const { oldIndex } = inEvent;
    const currentItems = this.getItems(inParent);
    this.moved = currentItems[oldIndex];
    currentItems.splice(oldIndex, 1);
  };

  handleUpdate = (inParent, inEvent) => {
    const { oldIndex, newIndex } = inEvent;
    const currentItems = this.getItems(inParent);
    const oldItem = currentItems[oldIndex];
    //up
    if (newIndex < oldIndex) {
      currentItems.splice(oldIndex, 1);
      currentItems.splice(newIndex, 0, oldItem);
    } else {
      //down:
      currentItems.splice(newIndex + 1, 0, oldItem);
      currentItems.splice(oldIndex, 1);
    }
    this.handleChange();
  };

  handleChange() {
    const { items, onChange } = this.props;
    onChange({ target: { value: items } });
  }

  render() {
    const { className, options, template, disabled, ...props } = this.props;
    return (
      <ReactTree
        ref={(root) => (this.root = root)}
        data-component={CLASS_NAME}
        disabled={disabled}
        className={classNames(CLASS_NAME, className)}
        template={this.template}
        {...props}
      />
    );
  }
}
