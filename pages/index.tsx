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

<nav className="navbar navbar-expand-lg navbar-light bg-dark py-3 mt-5">
        <div className="container">
          <a className="navbar-brand" href="#">
            {/* <h2 className="text-white  mb-2 " >Dog Gallary</h2> */}
            <h2 className="text-white" >Dog Gallary</h2>
          </a>

{/*         
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Projects</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Contact</a>
            </li>
            </ul>
            <button className="btn btn-primary ms-2">Join Us</button>

          </div> */}
        </div>
</nav>
{/* <div className="dog vh-100 d-flex align-items-center pt-5"  id="home"> */}
<div className="dog vh-100 d-flex pt-5"  id="home">
        <div className="container-fluid">
         <div className="row">
            <div className="col-4 ">
                    {/* <button className="fetchButton" onClick={hundleClick}>今日のわんこ</button> */}
             <div className="button  text-center">
                <button className="btn btn-primary" onClick={hundleClick}>今日のわんこ</button>

             </div>
 
            </div>
            <div className="col-8 dogImg">
              {/* <img src={catImgUrl} width="500" height="auto" className="catImg" /> */}
              <img src={catImgUrl} className="catImg" />
            </div>
        </div>

      {/* <!-- hero section -->
    <div className=""  id="home">
        <div className="container">

      </div>    </div>
        </div>*/}
        </div> 
      </div>
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
