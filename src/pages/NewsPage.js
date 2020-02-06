/* 리액트 라우터를 적용할 때 만들어야 할 페이지 */

import React from 'react'
import Categories from '../components/Categories'
import NewsList from '../components/NewsList'

// URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는 match라는 객체 안의 params 값을 참조한다.
// match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어있다.
function NewsPage ({ match }) {
  const category = match.params.category || 'all'  // 카테고리가 선택되지 않았으면 기본값 all로 사용

  return (
    <>
      <Categories/>  {/* 현재 선택된 category 값을 URL 파라미터를 통해 사용할 것이므로 Categories 컴포넌트에서 현재 선택된 카테고리 값을 알려 줄 필요도 없고, onSelect 함수를 따로 전달해 줄 필요도 없다. */}
      <NewsList category={category}/>
    </>
  )
}

export default NewsPage
