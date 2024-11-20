"use client";

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import items from './menuItems';
import { useStore } from "@/store/store";

export default function HairCategoryMenu() {
  const { setGender, setHairLength, setHairColor, selectedKeys, setSelectedKeys } = useStore((state) => ({
    setGender: state.setGender,
    setHairLength: state.setHairLength,
    setHairColor: state.setHairColor,
    selectedKeys: state.selectedKeys,
    setSelectedKeys: state.setSelectedKeys,
  }));

  const onClick: MenuProps['onClick'] = (e) => {
    const newSelectedKeys = [...selectedKeys];

    // 성별 선택
    if (e.key === '1') {
      if (selectedKeys.includes(e.key)) {
        setGender('');
        newSelectedKeys.splice(newSelectedKeys.indexOf(e.key), 1);
      } else {
        setGender('남성');
        newSelectedKeys.push(e.key);
      }
    } else if (e.key === '2') {
      if (selectedKeys.includes(e.key)) {
        setGender('');
        newSelectedKeys.splice(newSelectedKeys.indexOf(e.key), 1);
      } else {
        setGender('여성');
        newSelectedKeys.push(e.key);
      }
    }

    // 기장 선택
    if (e.key === '3') {
      if (selectedKeys.includes(e.key)) {
        setHairLength('');
        newSelectedKeys.splice(newSelectedKeys.indexOf(e.key), 1);
      } else {
        setHairLength('롱');
        newSelectedKeys.push(e.key);
      }
    } else if (e.key === '4') {
      if (selectedKeys.includes(e.key)) {
        setHairLength('');
        newSelectedKeys.splice(newSelectedKeys.indexOf(e.key), 1);
      } else {
        setHairLength('미디움');
        newSelectedKeys.push(e.key);
      }
    } else if (e.key === '5') {
      if (selectedKeys.includes(e.key)) {
        setHairLength('');
        newSelectedKeys.splice(newSelectedKeys.indexOf(e.key), 1);
      } else {
        setHairLength('쇼트');
        newSelectedKeys.push(e.key);
      }
    }

    // 염색 선택
    const colorKeys: { [key: string]: string } = {
      '9': '골드브라운', '10': '그레이', '11': '다크브라운', '12': '레드바이올렛',
      '13': '레드브라운', '14': '레드오렌지', '15': '레드와인', '16': '매트브라운',
      '17': '머쉬룸블론드', '18': '밀크브라운', '19': '발레아쥬', '20': '보라색',
      '21': '브라운', '22': '브릿지', '23': '블랙', '24': '블론드', '25': '블루블랙',
      '26': '새치염색', '27': '솜브레', '28': '애쉬그레이', '29': '애쉬바이올렛',
      '30': '애쉬베이지', '31': '애쉬브라운', '32': '애쉬블론드', '33': '애쉬블루',
      '34': '애쉬카키', '35': '애쉬카키브라운', '36': '애쉬퍼플', '37': '애쉬핑크',
      '38': '오렌지브라운', '39': '옴브레', '40': '초코브라운', '41': '카키',
      '42': '카키브라운', '43': '탈색', '44': '투톤', '45': '핑크브라운'
    };

    if (colorKeys[e.key]) {
      if (selectedKeys.includes(e.key)) {
        setHairColor('');
        newSelectedKeys.splice(newSelectedKeys.indexOf(e.key), 1);
      } else {
        setHairColor(colorKeys[e.key]);
        newSelectedKeys.push(e.key);
      }
    }

    setSelectedKeys(newSelectedKeys);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      multiple={false}
      mode="inline"
      items={items}
      selectedKeys={selectedKeys}
    />
  );
}
