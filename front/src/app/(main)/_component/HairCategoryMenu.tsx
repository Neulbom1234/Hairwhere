"use client"

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import items from './menuItems';

interface HairCategoryMenuProps {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  hairLength: string;
  setHairLength: React.Dispatch<React.SetStateAction<string>>;
  hairColor: string;
  setHairColor: React.Dispatch<React.SetStateAction<string>>;
}

const HairCategoryMenu: React.FC<HairCategoryMenuProps> = ({ 
  gender, 
  setGender, 
  hairLength, 
  setHairLength, 
  hairColor, 
  setHairColor 
}) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);

    const newSelectedKeys = [...selectedKeys];

    // 성별 선택
    if (e.key === '1') {
      setGender('남성');
      newSelectedKeys[0] = e.key;
    } else if (e.key === '2') {
      setGender('여성');
      newSelectedKeys[0] = e.key;
    }

    // 기장 선택
    if (e.key === '3') {
      setHairLength('롱');
      newSelectedKeys[1] = e.key;
    } else if (e.key === '4') {
      setHairLength('미디움');
      newSelectedKeys[1] = e.key;
    } else if (e.key === '5') {
      setHairLength('쇼트');
      newSelectedKeys[1] = e.key;
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
      setHairColor(colorKeys[e.key]);
      newSelectedKeys[2] = e.key;
    }

    setSelectedKeys(newSelectedKeys);
  };

  useEffect(() => {
    console.log(`성별: ${gender}, 기장: ${hairLength}, 색깔: ${hairColor}`);
  }, [gender, hairLength, hairColor])

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        multiple={false}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
      />
    </>
  );
};

export default HairCategoryMenu;
