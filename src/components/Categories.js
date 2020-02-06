/* Categories에서 기존의 onSelect 함수를 호출하여 카테고리를 선택하고, 선택된 카테고리에 다른 스타일을 주는 기능을 NavLink로 대체 */

import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const categories = [
  { name: 'all', text: '전체보기' },  // name은 실제 카테고리 값을 가리키고, text 값은 렌더링할 때 사용할 한글 카테고리를 가리킨다.
  { name: 'business', text: '비즈니스' },
  { name: 'entertainment', text: '엔터테인먼트' },
  { name: 'health', text: '건강' },
  { name: 'science', text: '과학' },
  { name: 'sports', text: '스포츠' },
  { name: 'technology', text: '기술' }
]

const CategoriesBlock = styled.div`
  display: flex;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

// div, a, button, input 처럼 일반 HTML 요소가 아닌 특정 컴포넌트에 styled-components를 사용할 때는 styled(컴포넌트이름)`` 과 같은 형식을 사용한다.
// NavLink는 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트이다.
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  /* active는 마우스로 클릭한 상태 */
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #22b8cf;
    color: #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }

  & + & {
    margin-left: 1rem;
  }
`;

// NavLink로 만들어진 Category 컴포넌트에 to 값은 "/카테고리이름"으로 설정해주었다.
// 카테고리 중에서 전체보기의 경우는 예외적으로 "/all" 대신에 "/"로 설정
// to 값이 "/" 를 가리키고 있을 때는 exact 값을 true로 해 주어야 한다.
// 이 값을 설정하지 않으면, 다른 카테고리가 선택되었을 때도 "전체보기" 링크에 active 스타일이 적용되는 오류가 발생한다.

// exact 값을 true로 해주지 않으면, /business 경로로 들어가더라도 / 경로가 같이 나오게 된다. 이는 /business 경로가 / 규칙에도 일치하기 때문에 발생한 현상이다.
// exact를 사용하면, 매칭이 될 경우 하위 라우트 설정을 보지 않게 된다.
// /all로 가게 되면 to 조건식에 의해 "/" 경로로 가게 되고, exact 조건식에 의해 true가 되기 때문에 "/" 경로 하나만 보여주고 하위 라우트 설정을 보지 않게 된다.

// NavLink에서 링크가 활성화되었을 때의 스타일을 적용할 때는 activeStyle 값을, CSS 클래스를 적용할 때는 activeClassName 값을 props로 넣어주면 된다.
// react-router의 Link에 activeClassName 속성을 주면 Link가 활성화되었을 때 자동으로 activeClassName이 className으로 적용된다.
// activeClassName는 지정해준 attribute가 활성화 될 경우 적용될 스타일 클래스를 선언해준다.
// activeClassName는 렌더링 된 요소가 현재 URL과 일치할 때 클래스를 부여한다. 기본적으로 active 클래스를 부여한다. 기존 className 설정에 추가된다.
function Categories () {
  return (
    <CategoriesBlock>
      {categories.map(c => (  // 컴포넌트를 map으로 렌더링할 때는 반드시 () 소괄호로 감싸주어야 한다. {} 중괄호 아니다.
        <Category key={c.name} activeClassName="active" exact={c.name === 'all'} to={c.name === 'all' ? '/' : `/${c.name}`}>{c.text}</Category>  // 활성화 되었을 때 특정 클래스를 설정하고 싶다면 activeClassName 을 설정하시면 된다.
      ))}
    </CategoriesBlock>
  )
}

export default Categories
