import React from 'react'
import styled, { css } from 'styled-components' // 단순 변수의 형태가 아니라 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우에는 css를 불러와야 한다.

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

const Category = styled.div`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  /* styled-components에서는 조건부 스타일링을 간단하게 props로도 처리할 수 있다. */
  /* 다음 코드는 active 값이 true일 때, 특정 스타일을 부여해 준다. */
  ${props =>
    props.active && css`                /* 스타일 코드 여러 줄을 props에 따라 넣어 주어야 할 때는 CSS를 styled-components에서 불러와야 한다. CSS를 사용하지 않아도 작동은 하지만 이 경우 해당 내용이 그저 문자열로만 취급되고, Tagged 템플릿 리터럴이 아니기 때문에 함수를 받아 사용하지 못해 해당 부분에서는 props 값을 사용하지 못한다. */
      font-weight: 600;                 /* 만약 조건부 스타일링을 할 때 넣는 여러 줄의 코드에서 props를 참조하지 않는다면 굳이 CSS를 불러와서 사용하지 않아도 상관없지만, props를 참조한다면, 반드시 CSS로 감싸 주어서 Tagged 템플릿 리터럴을 사용해 주어야 한다. */
      border-bottom: 2px solid #22b8cf;
      color: #22b8cf;
      &:hover {
        color: #3bc9db;
      }
  `}

  & + & {
    margin-left: 1rem;
  }
`;

function Categories ({ onSelect, category }) {
  return (
    <CategoriesBlock>
      {categories.map(c => (  // 컴포넌트를 map으로 렌더링할 때는 반드시 () 소괄호로 감싸주어야 한다. {} 중괄호 아니다.
        <Category key={c.name} active={category === c.name} onClick={() => onSelect(c.name)}>{c.text}</Category>  // active는 마우스로 클릭한 상태. active는 props로 styled-component에게 전달된다.
      ))}
    </CategoriesBlock>
  )
}

export default Categories
