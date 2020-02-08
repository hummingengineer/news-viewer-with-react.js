import React from 'react'
import styled from 'styled-components'
import NewsItem from './NewsItem'
import axios from 'axios'
import usePromise from '../lib/usePromise'

const NewsListBlock = styled.div`
  box-sizing: border-box;  /* 박스의 크기를 어떤 것을 기준으로 계산할지를 정하는 속성. border-box 테두리를 기준으로 크기를 정한다. */
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {  // /* 미디어 타입이 스크린이고, 화면의 최대 너비를 768px로 지정. 그러므로 화면의 너비 768px 이하 일때가 적용이 된다. 그 조건이 맞으면 {...}  안의 스타일이 적용된다. */
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`
    return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${process.env.REACT_APP_NEWS_KEY}`)
  }, [category])  // category 값이 바뀔 때마다 뉴스를 새로 불러와야 하기 때문에 useEffect의 의존 배열에 category를 넣어 주어야 한다. useEffect 한 번으로 컴포넌트가 맨 처음 렌더링될 때, 그리고 category 값이 바뀔 때 요청하도록 설정해줄 수 있다.

  if (loading) return <NewsListBlock>대기중...</NewsListBlock>  // 대기중일 때
  if (!response) return null                                   // 아직 response 값이 설정되지 않았을 때
                                                               // 이 작업을 하지 않으면 아직 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생한다. 그래서 애플리케이션이 제대로 나타나지 않고 흰 페이지만 보이게 된다.
  if (error) return <NewsListBlock>에러 발생!</NewsListBlock>   // 에러가 발생했을 때

  // response 값이 유효할 때
  const { articles } = response.data
  return (
    <NewsListBlock>
      {articles.map(article => (                         // 컴포넌트를 반환할 때는 {} 중괄호가 아닌 () 소괄호를 사용함에 유의하자.
        <NewsItem key={article.url} article={article}/>  // 리액트에서 key는 컴포넌트 배열을 렌더링했을 때 어떤 원소에 변동이 있었는지 알아내기 위해 사용. key가 있다면 이 값을 사용하여 어떤 변화가 일어났는지 더욱 빠르게 알아 낼 수 있다.
      ))}
    </NewsListBlock>
  )
}

export default NewsList
