import React, { useState } from "react";
import { Tree, Tooltip, Input } from 'antd';
import './index.css';

const treeDate = [
  {
    title: '1',
    key: '1',
    children: [
      {
        title: '1-1',
        key: '1-1',
      },
      {
        title: '1-2',
        key: '1-2',
      },
      {
        title: '1-3',
        key: '1-3',
      },
    ]
  },
  {
    title: '2',
    key: '2',
    children: [
      {
        title: '2-1',
        key: '2-1',
      },
      {
        title: '2-2',
        key: '2-2',
      },
      {
        title: '2-3',
        key: '2-3',
      },
    ]
  },
]

const expandedKeys = treeDate.reduce((res, item) => {
  res.push(item.key);
  return res;
}, [])

export default function TreeEdit() {
  const [gDate, setGDate] = useState(treeDate);

  const onDrop = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // TODO 不允许跨级拖动
    const dragPos = info.dragNode.pos.split('-');
    if(dropPos.length !== dragPos.length) {
      console.warn('不允许跨级拖动');
      return ;
    }

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }

        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    const data = [...gDate]; // Find dragObject

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || []; // where to insert 示例添加到头部，可以是随意位置

        item.children.unshift(dragObj); // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar = [];
      let i;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    setGDate(data);
  };

  return (
    <Tree
      className="tree-edit"
      style={{width: 200}}
      draggable
      expandedKeys={['1', '2']}
      onCheck={expandedKeys}
      onDrop={onDrop}
    >
      {
        gDate.map((item) => {
          return (
            <Tree.TreeNode
              key={item.key}
              title={item.title}
            >
              {
                item.children ? item.children.map(sub => (
                  <Tree.TreeNode
                    key={sub.key}
                    title={sub.title}
                  />
                )) : null
              }
            </Tree.TreeNode>
          )
        })
      }
    </Tree>
  )
}