import React from 'react'
import styled from 'styled-components'

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

  /* 다음 코드는 active 값이 true일 때, 특정 스타일을 부여해 준다. */
  ${props =>
    props.active && css`
      font-weight: 600;
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
      {categories.map(c => {
        <Category key={c.name} active={category === c.name} onClick={() => onSelect(c.name)}>{c.text}</Category>  // active는 마우스로 클릭한 상태. active는 props로 styled-component에게 전달된다.
      })}
    </CategoriesBlock>
  )
}

export default Categories
