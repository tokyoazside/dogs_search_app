import type { GetServerSideProps, NextPage } from 'next'

import { useState } from 'react'


// 型宣言
interface searchCatImg {
  message: string;
  status: string;
}

interface IndexPageProps {
  InitialCatImageUrl: string;

}

// 関数
const fetchButtonClick = async (): Promise<searchCatImg> => {
  const res =
    await fetch("https://dog.ceo/api/breeds/image/random")
  const result = await res.json()
  return result
}

// Home

const Home: NextPage<IndexPageProps> = ({ InitialCatImageUrl }) => {
  const [catImgUrl, setCatImgUrl] = useState(InitialCatImageUrl)

// ボタンをクリックしたら呼ばれます。
// fetchButtonClickでランダムなurlを取得して
// CatImgUrlにuseState経由で設定します
const hundleClick = async () => {
    const catImg = await fetchButtonClick()
    setCatImgUrl(catImg.message)

  }

  return (
    <div style={{
        display: "Flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh"
        
    }} >
      {/* <button className="fetchButton" onClick={hundleClick}>今日のわんこ</button> */}
      <button className="btn btn-primary" onClick={hundleClick}>今日のわんこ</button>
      <img src={catImgUrl} width="500" height="auto" className="catImg" />

    </div>
  )
}

//サーバーサイドレンダリング(SSR)
//起動時の設定
// fetchButtonClickでランダムなurlを取得して、InitialCatImageUrlに値をセット。homeに受け渡します。
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  const catImg = await fetchButtonClick()

  return {
    props: {
      InitialCatImageUrl: catImg.message
    }

  }
}   
export default Home
