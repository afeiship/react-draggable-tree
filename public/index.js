import React from 'react';
import ReactDOM from 'react-dom';
import ReactDraggableTree from '../src/main';
import dataJson from './assets/index.json';
import './assets/style.scss';

class App extends React.Component {
  state = {
    items2: dataJson.data,
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
          <span className={'is-label'}>
            {item.name}
          </span>
        </li>
      );
    } else {
      return (
        <li key={item.uuid} className={'is-node'}>
          <span className="is-label">{item.name}</span>
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
            console.log(JSON.stringify(e.target.value, null, 2));
          }}
        />

        <hr />
        <h3>Sort with itemsKey children:</h3>
        <ReactDraggableTree
          template={this.template2}
          items={this.state.items2}
          itemsKey={(idx, item) => {
            return [].concat(
              item.nodeResponses || [],
              item.contentResponses || []
            );
          }}
          options={{ group: 'abced' }}
          onChange={(e) => {
            console.log(JSON.stringify(e.target.value, null, 2));
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
