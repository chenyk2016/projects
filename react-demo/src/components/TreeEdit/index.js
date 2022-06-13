import React from "react";
import { Tree, Tooltip, Input } from 'antd';
import './index.css';

export default function TreeEdit() {
  return (
    <Tree
      style={{width: 200}}
      draggable
      expandedKeys={['1', '2']}
      onCheck={(checkedKeys, e) => {
        // const { bool, checkedNodes, node, event, halfCheckedKeys } = e;
        console.log('onCheck', checkedKeys, e );
      }}
      onDrop={
        (params) => {
          console.log('onDrop', params);
        }
      }
    >
      <Tree.TreeNode
        key="1"
        autoExpandParent
        expanded
        title={
          <div>
            <span>地段</span>
            <Tooltip
              trigger="click"
              placement="bottomRight"
              title={
                <div>
                  <div>二级目录</div>
                  <div>删除</div>
                </div>
              }
            >
              <span>...</span>
            </Tooltip>
          </div>
        }
      >
        <Tree.TreeNode
          key="1-1"
          autoExpandParent
          title={
            <div>
              <Input style={{width:100}} size="small" inline value={"楼盘地图"} />
              <span>...</span>
            </div>
          }
        />
        <Tree.TreeNode
          key="1-2"
          title={
            <div>1-2</div>
          }
        />
      </Tree.TreeNode>
      <Tree.TreeNode
        key="2"
        title={
          <div>2</div>
        }
      >
        <Tree.TreeNode
          key="2-1"
          title={
            <div>2-1</div>
          }
        />
        <Tree.TreeNode
          key="2-2"
          title={
            <div>2-2</div>
          }
        />
      </Tree.TreeNode>
    </Tree>
  )
}