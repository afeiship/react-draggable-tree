# react-draggable-tree
> Draggable tree for react.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-draggable-tree
```

## properties
| Name      | Type   | Required | Default | Description                           |
| --------- | ------ | -------- | ------- | ------------------------------------- |
| className | string | false    | -       | The extended className for component. |
| value     | object | false    | null    | The changed value.                    |
| onChange  | func   | false    | noop    | The change handler.                   |


## usage
1. import css
  ```scss
  @import "~@jswork/react-draggable-tree/dist/style.css";

  // or use sass
  @import "~@jswork/react-draggable-tree/dist/style.scss";

  // customize your styles:
  $react-draggable-tree-options: ()
  ```
2. import js
  ```js
  import ReactDemokit from '@jswork/react-demokit';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ReactDraggableTree from '@jswork/react-draggable-tree';
  import './assets/style.scss';

  class App extends React.Component {
    render() {
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-draggable-tree">
          <ReactDraggableTree className="mb-5 has-text-white" />
          <button className="button is-primary is-fullwidth">Start~</button>
        </ReactDemokit>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-draggable-tree/


## license
Code released under [the MIT license](https://github.com/afeiship/react-draggable-tree/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-draggable-tree
[version-url]: https://npmjs.org/package/@jswork/react-draggable-tree

[license-image]: https://img.shields.io/npm/l/@jswork/react-draggable-tree
[license-url]: https://github.com/afeiship/react-draggable-tree/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-draggable-tree
[size-url]: https://github.com/afeiship/react-draggable-tree/blob/master/dist/react-draggable-tree.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-draggable-tree
[download-url]: https://www.npmjs.com/package/@jswork/react-draggable-tree
