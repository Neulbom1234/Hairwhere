import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'gender',
    label: '성별',
    children: [
      { key: '1', label: '남성' },
      { key: '2', label: '여성' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'length',
    label: '기장',
    children: [
      { key: '3', label: '롱' },
      { key: '4', label: '미디움' },
      { key: '5', label: '쇼트' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'color',
    label: '염색',
    children: [
      { key: '9', label: '골드브라운' },
      { key: '10', label: '그레이' },
      { key: '11', label: '다크브라운' },
      { key: '12', label: '레드바이올렛' },
      { key: '13', label: '레드브라운' },
      { key: '14', label: '레드오렌지' },
      { key: '15', label: '레드와인' },
      { key: '16', label: '매트브라운' },
      { key: '17', label: '머쉬룸블론드' },
      { key: '18', label: '밀크브라운' },
      { key: '19', label: '발레아쥬' },
      { key: '20', label: '보라색' },
      { key: '21', label: '브라운' },
      { key: '22', label: '브릿지' },
      { key: '23', label: '블랙' },
      { key: '24', label: '블론드' },
      { key: '25', label: '블루블랙' },
      { key: '26', label: '새치염색' },
      { key: '27', label: '솜브레' },
      { key: '28', label: '애쉬그레이' },
      { key: '29', label: '애쉬바이올렛' },
      { key: '30', label: '애쉬베이지' },
      { key: '31', label: '애쉬브라운' },
      { key: '32', label: '애쉬블론드' },
      { key: '33', label: '애쉬블루' },
      { key: '34', label: '애쉬카키' },
      { key: '35', label: '애쉬카키브라운' },
      { key: '36', label: '애쉬퍼플' },
      { key: '37', label: '애쉬핑크' },
      { key: '38', label: '오렌지브라운' },
      { key: '39', label: '옴브레' },
      { key: '40', label: '초코브라운' },
      { key: '41', label: '카키' },
      { key: '42', label: '카키브라운' },
      { key: '43', label: '탈색' },
      { key: '44', label: '투톤' },
      { key: '45', label: '핑크브라운' },
    ],
  },
];

export default items;
