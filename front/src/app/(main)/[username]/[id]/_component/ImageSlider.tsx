import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './imageSlider.module.css';
import { useEffect, useState } from 'react';

type Image = {
  imageId: number;
  link: string;
};

type User = {
  id: string;
  nickname: string;
  profile: string;
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

export default function ImageSlider({ target }: Props) {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      setImages(target.Images);
      console.log('Images loaded:', target.Images);
    };

    loadImages();

    const slickList = document.querySelector('.slick-list') as HTMLElement; //Slick 내부의 .slick-list를 수정하기 위한 코드
    if (slickList) {
      slickList.style.width = '100%';
    }
  }, [target]);

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
        {images.map((v) => (
          <div key={v.imageId} className={style.imageWrapper}>
            <img src={v.link} alt={`image-${v.imageId}`} />
          </div>
        ))}
      </Slider>
    </>
  );
}