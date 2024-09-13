import React, { useEffect, useState } from 'react';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogAction, AlertDialogCancel } from '@radix-ui/react-alert-dialog';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { User } from '@/model/User';
import style from './seeMore.module.css';

type Props = {
  writeUser: User
}

const items = [
  {
    label: "클립보드 복사",
    key: '0',
  },
  {
    label: "신고하기",
    key: '1',
  },
];

export default function SeeMore({ writeUser }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const loginItems = [
    {
      label: "클립보드 복사",
      key: '0',
    },
    {
      label: (
        <span
          style={{color: '#dc2626'}}
          onClick={() => setIsOpen(true)} // Open dialog on click
        >
          삭제하기
        </span>
      ),
      key: '1',
    },
  ];

  useEffect(() => {
    console.log(`값이다: ${isOpen}`)
  }, [isOpen])

  return (
    <>
      <Dropdown menu={{ items: writeUser.name ? loginItems : items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <MoreOutlined />
          </Space>
        </a>
      </Dropdown>

      {/* Alert Dialog */}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className={style['alert-dialog-content']}>
          <div>
            <h2>삭제하시겠습니까?</h2>
            <p>이 작업은 되돌릴 수 없습니다.<br/>게시글이 영구적으로 삭제됩니다.</p>
          </div>
          <div className={style['alert-dialog-footer']}>
            <AlertDialogCancel asChild>
              <button className={style['btn-cancel']} onClick={() => setIsOpen(false)}>취소</button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <button className={style['btn-delete']} onClick={() => {
                // 삭제 로직 처리
                setIsOpen(false);
              }}>삭제</button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* 오버레이 */}
      {isOpen && <div className={style['alert-dialog-overlay']} onClick={() => setIsOpen(false)} />}
    </>
  );
}
