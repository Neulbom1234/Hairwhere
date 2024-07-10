"use client"

import React from 'react';
import style from './seeMore.module.css';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: "클립보드 복사",
    key: '0',
  },
  {
    label: "신고하기",
    key: '1',
  },
];

export default function SeeMore() {

  return (
    <>
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined className={style.icon}/>
          </Space>
        </a>
      </Dropdown>
    </>
  )
}