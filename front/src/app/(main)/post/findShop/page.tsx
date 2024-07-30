"use client";

import style from './findShop.module.css';
import { useState, ChangeEventHandler, MouseEventHandler, useEffect } from 'react';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  place_name: string;
  road_address_name: string;
  address_name: string;
  category_name: string;
}

export default function FindShop() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [findShops, setFindShops] = useState<{ hairSalon: string, hairSalonAddress: string, placeCategory: string }[]>([]);
  const [findShopName, setFindShopName] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const checkScriptLoaded = () => {
      if (window.kakao && window.kakao.maps) {
        console.log('Kakao Maps script and services library loaded successfully');
        console.log(window.kakao.maps);
      } else {
        setTimeout(checkScriptLoaded, 100);
      }
    };
    checkScriptLoaded();
  }, []);

  const onChangeSearchQuery: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClick = () => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오 지도 API 스크립트가 아직 로드되지 않았습니다.");
      return;
    }

    if (searchQuery.trim() !== '') {
      const ps = new window.kakao.maps.services.Places();
      ps.keywordSearch(searchQuery, (data: Place[], status: string, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const shops = data.map((place: Place) => ({
            hairSalon: place.place_name,
            hairSalonAddress: place.road_address_name || place.address_name,
            placeCategory: place.category_name,
          }));
          setFindShops(shops);
          console.log(shops);
        } else {
          alert('검색 결과가 없습니다.');
        }
      });
    }
  };

  const onChangeSearchValue: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLDivElement;
    const salonNameElement = target.classList.contains(style.salonName)
      ? target
      : target.closest(`.${style.body}`)?.querySelector(`.${style.salonName}`);
    const salonAddressElement = target.classList.contains(style.salonAddress)
      ? target
      : target.closest(`.${style.body}`)?.querySelector(`.${style.salonAddress}`);
    const salonName = salonNameElement?.textContent;
    const salonAddress = salonAddressElement?.textContent;

    router.push(`/post?sn=${salonName}&sa=${salonAddress}`);
  };

  return (
    <div>
      <div className={style.header}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={style.inputDiv}>
            <input
              id="searchQuery"
              className={style.input}
              type="text"
              placeholder="미용실을 입력하세요"
              value={searchQuery}
              onChange={onChangeSearchQuery}
            />
            <button className={style.searchButton} type="button" onClick={onClick}>
              <svg
                width={26}
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
              >
                <g>
                  <path
                    d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </form>
      </div>
      {findShops.map((shop, index) => (
        <div className={style.body} key={index} onClick={onChangeSearchValue}>
            <div className={style.salonName}>{shop.hairSalon}</div>
            <div className={style.salonAddress}>{shop.hairSalonAddress}</div>
            <div className={style.placeCategory}>{shop.placeCategory}</div>
        </div>
      ))}
      <p>{findShopName}</p>
    </div>
  );
}
