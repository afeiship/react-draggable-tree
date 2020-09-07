# react-draggable-tree
> Draggable tree for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @feizheng/react-draggable-tree
```

## update
```shell
npm update @feizheng/react-draggable-tree
```

## properties
| Name      | Type   | Required | Default    | Description                                                                              |
| --------- | ------ | -------- | ---------- | ---------------------------------------------------------------------------------------- |
| className | string | false    | -          | The extended className for component.                                                    |
| items     | array  | false    | -          | The data source.                                                                         |
| onChange  | func   | false    | noop       | The change handler.                                                                      |
| template  | func   | true     | -          | Item template.                                                                           |
| itemsKey  | union  | false    | 'children' | Child item key.                                                                          |
| options   | object | false    | -          | The core sortable component options (@sortable: https://github.com/SortableJS/Sortable). |


## usage
1. import css
  ```scss
  @import "~@feizheng/react-draggable-tree/dist/style.scss";

  // customize your styles:
  $react-draggable-tree-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactDraggableTree from '@feizheng/react-draggable-tree';
  import dataJson from './assets/index.json';
  import stdJson from './assets/std.json';
  import './assets/style.scss';

  class App extends React.Component {
    state = {
      items2: dataJson.data,
      stdItems: stdJson.data,
      items: [
        {
          icon: 'm1-icon',
          label: 'Menu1',
          value: 'm1',
          children: [
            {
              icon: 'm1-1-icon',
              label: 'Menu1-1',
              value: 'm1-1',
              children: [
                {
                  icon: 'm1-1-1-icon',
                  label: 'Menu-1-1',
                  value: 'm1-1-1'
                },
                {
                  icon: 'm1-1-2-icon',
                  label: 'Menu-1-2',
                  value: 'm1-1-2'
                }
              ]
            }
          ]
        },
        {
          icon: 'm2-icon',
          label: 'Menu2',
          value: 'm2',
          children: []
        },
        {
          icon: 'mxx-icon',
          label: '-',
          value: '-',
          children: []
        },
        {
          disabled: false,
          icon: 'm3-icon',
          label: 'Menu3',
          value: 'm3',
          children: []
        }
      ]
    };

    template = ({ item, independent, sortable }, cb) => {
      // 这里的逻辑，直接决定了 children 下面可不可以继续加入元素。
      if (!item.children) {
        return (
          <li key={item.value} className="is-node is-leaf">
            <label className={'is-label'}>{item.label}</label>
          </li>
        );
      } else {
        return (
          <li key={item.value} className={'is-node'}>
            <label className="is-label">{item.label}</label>
            <ul className="is-nodes nested-sortable" ref={sortable}>
              {cb()}
            </ul>
          </li>
        );
      }
    };

    template2 = ({ item, independent, sortable }, cb) => {
      if (independent) {
        return (
          <li key={item.uuid} className="is-node is-leaf">
            <span className={'is-label'}>{item.name}</span>
            <strong className="is-handle">≡</strong>
          </li>
        );
      } else {
        return (
          <li key={item.uuid} className={'is-node'}>
            <span className="is-label">{item.name}</span>
            <strong className="is-handle">≡</strong>
            <ul className="is-nodes nested-sortable" ref={sortable}>
              {cb()}
            </ul>
          </li>
        );
      }
    };

    render() {
      return (
        <div className="app-container">
          <h3>Sort only children:</h3>
          <ReactDraggableTree template={this.template} items={this.state.items} />
          <h3>Sort only children - disabled:</h3>
          <ReactDraggableTree
            template={this.template}
            items={this.state.items}
            disabled
          />

          <hr />
          <h3>Sort with grouped:</h3>
          <ReactDraggableTree
            template={this.template}
            items={this.state.items}
            options={{ group: 'abcd' }}
            onChange={(e) => {
              // console.log(JSON.stringify(e.target.value, null, 2));
            }}
          />

          <hr />
          <h3>Sort with itemsKey children:</h3>
          <ReactDraggableTree
            template={this.template2}
            items={this.state.stdItems}
            options={{ group: 'abced', handle:'.is-handle' }}
            onChange={(e) => {
              // console.log(JSON.stringify(e.target.value, null, 2));
            }}
          />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-draggable-tree/


## license
Code released under [the MIT license](https://github.com/afeiship/react-draggable-tree/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@feizheng/react-draggable-tree
[version-url]: https://npmjs.org/package/@feizheng/react-draggable-tree

[license-image]: https://img.shields.io/npm/l/@feizheng/react-draggable-tree
[license-url]: https://github.com/afeiship/react-draggable-tree/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@feizheng/react-draggable-tree
[size-url]: https://github.com/afeiship/react-draggable-tree/blob/master/dist/react-draggable-tree.min.js

[download-image]: https://img.shields.io/npm/dm/@feizheng/react-draggable-tree
[download-url]: https://www.npmjs.com/package/@feizheng/react-draggable-tree
