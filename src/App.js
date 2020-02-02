import React, { useState, useCallback } from 'react'
import NewsList from './components/NewsList'
import Categories from './components/Categories'

function App() {
  const [category, setCategory] = useState('all')  // category 상태를 관리하는 useState 함수
  const onSelect = useCallback(category => setCategory(category), [])  // category 값을 업데이트하는 onSelect 함수. category는 c.name이다.

  return (
    <>
      <Categories category={category} onSelect={onSelect}/>
      <NewsList category={category}/>
    </>
  )
}

export default App
