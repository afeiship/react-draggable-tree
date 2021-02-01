import nxValues from '@jswork/next-values';
import noop from '@jswork/noop';
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
     * The item unique key.
     */
    rowKey: PropTypes.string,
    /**
     * The change handler.
     */
    onChange: PropTypes.func,
    /**
     * The handler when sortable initialize.
     */
    onInit: PropTypes.func,
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
    onChange: noop,
    onInit: noop
  };

  constructor(inProps) {
    super(inProps);
    this.cache = {};
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this.root);
    this.initSortable(dom, null, null);
    this.handleInitSortable();
  }

  componentWillUnmount() {
    this.cache = {};
  }

  shouldComponentUpdate(inProps) {
    const { items } = inProps;
    if (items !== this.props.items) {
      this.handleInitSortable();
    }
    return true;
  }

  handleInitSortable() {
    setTimeout(() => {
      const value = nxValues(this.cache);
      this.props.onInit({ target: { value } });
    }, 0);
  }

  initSortable(inDom, inParent, inOptions) {
    const { options, disabled, rowKey } = this.props;
    if (!inDom) return;
    const id = inParent ? inParent[rowKey] : null;
    this.cache[id] = new Sortablejs(inDom, {
      draggable: '.is-node',
      disabled,
      onAdd: this.handleAdd,
      onSort: this.handleSort.bind(null, inParent),
      onRemove: this.handleRemove.bind(null, inParent),
      onUpdate: this.handleUpdate.bind(null, inParent),
      ...options,
      ...inOptions
    });
  }

  template = ({ item, independent }, cb) => {
    const { template } = this.props;
    const sortable = (dom, options) => this.initSortable(dom, item, options);
    return template({ item, independent, sortable }, cb);
  };

  getItems(inParent) {
    const { items, itemsKey } = this.props;
    const getter = itemsGetter(itemsKey);
    return inParent ? getter(-1, inParent) : items;
  }

  handleAdd = (inEvent) => {
    // @fix: https://github.com/SortableJS/Sortable/issues/986
    var itemEl = inEvent.item; // dragged HTMLElement
    let origParent = inEvent.from;
    origParent.appendChild(itemEl);
  };

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
    this.handleChange();
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
    this.forceUpdate();
    const { items, onChange } = this.props;
    onChange({ target: { value: items } });
  }

  render() {
    const {
      className,
      options,
      rowKey,
      template,
      disabled,
      onInit,
      onChange,
      ...props
    } = this.props;

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
