"use client"

import React, { useEffect, useState } from 'react';
import style from './seeMore.module.css';
import { MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { User } from '@/model/User';

type Props = {
  writeUser: User
}

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

const loginItems: MenuProps['items'] = [
  {
    label: "클립보드 복사",
    key: '0',
  },
  {
    label: "삭제하기",
    key: '1',
  },
];

export default function SeeMore({writeUser}: Props) {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session data:', JSON.stringify(session, null, 2));
  }, [session]);

  return (
    <>
      <Dropdown menu={ {items: writeUser.name === session?.user?.name ? loginItems : items}} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined className={style.icon}/>
          </Space>
        </a>
      </Dropdown>
    </>
  )
}