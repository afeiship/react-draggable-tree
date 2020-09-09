import '@feizheng/next-traverse';
import { cloneDeep } from 'lodash';

const toChildren = (v, type) => {
  return (v || []).map((i) => {
    i.type = type;
    return i;
  });
};

export default class {
  static to(inItems) {
    const items = cloneDeep(inItems);
    nx.traverse(
      items,
      (_, item) => {
        if (!item.depth) {
          toChildren([item], 'node');
        }

        item.children = [].concat(
          toChildren(item.nodeResponses, 'node'),
          toChildren(item.contentResponses, 'content')
        );

        delete item.nodeResponses;
        delete item.contentResponses;
      },
      {
        inject: true,
        itemsKey: (_, item) => {
          return item.nodeResponses || item.contentResponses;
        }
      }
    );
    return items;
  }

  static from(inItems) {
    const businessItems = cloneDeep(inItems);
    nx.traverse(businessItems, (_, item) => {
      if (item.type === 'node') {
        // item.businessNodeItems = item.children;
        item.businessContentUuids = [];
        item.businessNodeItems = [];
        (item.children || []).map((childrenItem) => {
          if (childrenItem.type === 'content') {
            item.businessContentUuids.push(childrenItem.uuid);
          } else {
            item.businessNodeItems.push(childrenItem);
          }
        });
      }
      Object.keys(item).map((key) => {
        if (
          key !== 'businessContentUuids' &&
          key !== 'businessNodeItems' &&
          key !== 'uuid'
        ) {
          delete item[key];
        }
      });
    });
    return { businessItems };
  }
}
