"use client"

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './imageSlider.module.css'

type Image = {
  imageId: number;
  link: string;
};

type User = {
  id: string;
  nickname: string;
};

type Target = {
  postId: number;
  User: User;
  content: string;
  createdAt: Date;
  Images: Image[];
};

type Props = {
  target: Target;
};

export default function ImageSlider({target}:Props) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <Slider {...settings} className={style.slider}>
        {target.Images.map((v) => (
          <div key={v.imageId} className={style.imageWrapper}>
            <img src={v.link} alt={`image-${v.imageId}`} />
          </div>
        ))}
      </Slider>
    </>
  )
}