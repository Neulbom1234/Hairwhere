import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './imageSlider.module.css';
import { useEffect, useState } from 'react';
import { Post } from '@/model/Post';

type Props = {
  post: Post;
};

export default function ImageSlider({ post }: Props) {
  // const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    // const loadImages = async () => {
    //   setImages(target.Images);
    //   console.log('Images loaded:', target.Images);
    // };

    // loadImages();

  const slickList = document.querySelector('.slick-list') as HTMLElement; //Slick 내부의 .slick-list를 수정하기 위한 코드
  if (slickList) {
    slickList.style.width = '100%';
  }
  }, [post]);

  const settings = {
    dots: true,
    infinite: post.photoImagePath.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <Slider {...settings} className={style.slider}>
        {post.photoImagePath.map((v) => (
          <div key={v} className={style.imageWrapper}>
            <img src={v} alt={`image - ${v}`}/>
          </div>
        ))}
      </Slider>
    </>
  );
}