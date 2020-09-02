import ReactTree from '@feizheng/react-tree';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sortablejs from 'sortablejs';
const CLASS_NAME = 'react-draggable-tree';

export default class ReactDraggableTree extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * Default value.
     */
    value: PropTypes.object,
    /**
     * The data source.
     */
    items: PropTypes.array,
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

  static defaultProps = {};

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this.root);
    this.initSortable(dom);
  }

  initSortable(dom) {
    const { options, disabled } = this.props;
    new Sortablejs(dom, {
      draggable: '.is-node',
      disabled,
      ...options
    });
  }

  template = ({ item, independent }, cb) => {
    const { template } = this.props;
    const sortable = (dom) => this.initSortable(dom);
    return template({ item, independent, sortable }, cb);
  };

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
