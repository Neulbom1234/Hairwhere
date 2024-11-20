"use client"

import React from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import items from './menuItems';

export default function HairCategoryMenu() {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <>
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      multiple={true}
      mode="inline"
      items={items}
    />
    </>
  )
}