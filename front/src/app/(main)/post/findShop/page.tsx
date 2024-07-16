"use client"

import style from './findShop.module.css'
import Link from 'next/link'
import { useState, ChangeEventHandler, FormEvent, MouseEventHandler} from 'react';
import { useRouter } from 'next/navigation';

export default function findShop(shop: string){
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [findShopName, setFindShopName] = useState<string>('')
    const router = useRouter();

    const onChangeSearchQuery: ChangeEventHandler<HTMLInputElement> = (e) => { setSearchQuery(e.target.value) };
    
    const findShops = [
        {hairSalon: '블루클럽', hairAddress: '서울 구로구 가리봉동'},
        {hairSalon: '블루클럽', hairAddress: '서울 구로구 가리봉동'},
        {hairSalon: '블루클럽', hairAddress: '서울 구로구 가리봉동'},
        {hairSalon: '블루클럽', hairAddress: '서울 구로구 가리봉동'},
    ];


    const redirectToPage = () => {
        if (searchQuery.trim() !== '') {
            router.push(`/findShop?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const onChangeSearchValue: React.MouseEventHandler<HTMLDivElement> = (e) => {
        const salonName = (e.target as HTMLDivElement).querySelector('.salonName')?.textContent;
        if (salonName) {
          setFindShopName(salonName);
        }
    };
    return (
    <div>
        <div className={style.header}>
            <form>
                <div className={style.inputDiv}>
                <input id="searchQuery" className={style.input} type="text" placeholder="헤어명을 입력하세요"
                    value={searchQuery}
                    onChange={onChangeSearchQuery}
                />
                <button className={style.searchButton} onClick={redirectToPage}>
                    <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                        className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                    <g>
                        <path
                        d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                    </g>
                    </svg>
                </button>
                </div>
            </form>
        </div>
        {findShops.map((shop, index) => (
            
              <div className={style.body} key={index} onClick={onChangeSearchValue}>
                <Link href="/post" className={style.bodyLink}>
                    <div className={style.salonName}>{shop.hairSalon}</div>
                    <div className={style.salonAddress}>{shop.hairAddress}</div>
                    
                </Link>
                
              </div>

             
            
          ))}
          <p>{findShopName}</p>
    </div>
    )
}