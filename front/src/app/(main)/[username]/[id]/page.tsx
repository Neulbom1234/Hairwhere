import Header from './_component/Header'
import style from './postPage.module.css'
import {faker} from '@faker-js/faker';
import ImageSlider from './_component/ImageSlider';

export default function Home() {
  const target = {
    postId: 1,
    User: {
      id: 'elonmusk',
      nickname: 'Elon Musk',
    },
    content: '클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ',
    createdAt: new Date(),
    Images: [] as any[],
  }

  target.Images.push(
    {imageId: 1, link: faker.image.urlLoremFlickr()},
    {imageId: 2, link: faker.image.urlLoremFlickr()},
    {imageId: 3, link: faker.image.urlLoremFlickr()},
  )

    return (
      <div className={style.main}>
        <Header/>
        <div className={style.imageWrapper}>
          <ImageSlider target={target}/>
        </div>
      </div>
    )
  }