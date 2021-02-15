import ReactDemokit from '@jswork/react-demokit';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDraggableTree from '../src/main';
import './assets/style.scss';

import dataJson from './assets/index.json';
import leveledJson from './assets/level-grouped.json';
import stdJson from './assets/std.json';
import Helper from './helper';

class App extends React.Component {
  state = {
    items2: dataJson.data,
    stdItems: stdJson.data,
    leveledItems: leveledJson.data,
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
        <div key={item.uuid} className="is-node is-leaf">
          <span className={'is-label'}>{item.name}</span>
          <strong className="is-handle">≡</strong>
        </div>
      );
    } else {
      return (
        <details key={item.uuid} className={'is-node'} open>
          <summary>
            <span className="is-label">{item.name}</span>
            <strong className="is-handle">≡</strong>
          </summary>
          <ul className="is-nodes" ref={sortable}>
            {cb()}
          </ul>
        </details>
      );
    }
  };

  template3 = ({ item, independent, sortable }, cb) => {
    if (independent) {
      return (
        <div key={item.uuid} className="is-node is-leaf">
          <span className={'is-label'}>
            {item.name}-level: {item.level}
          </span>
          <strong className="is-handle">≡</strong>
        </div>
      );
    } else {
      return (
        <details key={item.uuid} className={'is-node'} open>
          <summary>
            <span className="is-label">{item.name}</span>
            <strong className="is-handle">≡</strong>
          </summary>
          <ul
            className="is-nodes"
            ref={(dom) => {
              return sortable(dom, { group: item.level });
            }}>
            {cb()}
          </ul>
        </details>
      );
    }
  };

  render() {
    const leveledItems = Helper.to(this.state.leveledItems);
    return (
      <ReactDemokit
        className="p-3 app-container"
        url="https://github.com/afeiship/react-draggable-tree">
        <h3>Sort only children:</h3>
        <ReactDraggableTree
          template={this.template}
          items={this.state.items}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
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
          options={{ group: 'abced', handle: '.is-handle' }}
          onChange={(e) => {
            console.log(e.target.value);
            // console.log(JSON.stringify(e.target.value, null, 2));
          }}
        />
        <hr />
        <h3>Sort with external options:</h3>
        <ReactDraggableTree
          template={this.template3}
          items={leveledItems}
          options={{ group: 'abcedfg', handle: '.is-handle' }}
          onChange={(e) => {
            console.log(e.target.value);
            // console.log(JSON.stringify(e.target.value, null, 2));
          }}
          onInit={(e) => {
            console.log(e.target.value);
          }}
        />
      </ReactDemokit>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
