"use client"

import style from './notice.module.css'
import Link from 'next/link'
import { useState } from 'react';
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import 'dayjs/locale/ko';
// import {faker} from '@faker-js/faker';

export default function Notice(){
    // const[comment, setComment]=useState();
    // const[like, setLike]=useState();
    // const[user, setUser]=useState();


    return(
        <div className={style.noticeBox}>
            <div className={style.noticeLeft}>
                <div className={style.noticeUserImg}>
                    <img src="" alt="" /> 
                </div>
            </div>
            <div className={style.noticeRight}>
                <div className={style.noticeComment}>
                    <div className={style.txtTop}>
                        <div className={style.userName}>산호티비</div>
                        님이 댓글을 달았습니다.
                    </div>
                    <div className={style.txtBottom}>
                        <div className={style.txt}>댓글내용 어쩌구저쩌구 쫑알쫑알 짹쨱짹쨱
                        
                        </div>
                        <div className={style.noticeAgo}>n분 전</div>
                    </div>
                   
                </div>
                {/* <div className={style.noticeLike}>
                    <div className={style.txt}>
                        <div className={style.userName}>산호티비</div>
                        님이 좋아요를 눌렀습니다.
                    </div>
                    <div className={style.noticeAgo}>n분 전</div>
                </div> */}
                
            </div>
                
        </div>
       

    )
}