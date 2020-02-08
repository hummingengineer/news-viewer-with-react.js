// 컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우 더욱 간결하게 코드를 작성할 수 있도록 해 주는 커스텀 Hook
// 프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 이렇게 src 디렉터리에 lib 디렉터리를 만든 후 그 안에 작성한다.
// usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존 배열 deps를 파라미터로 받아 온다.
// usePromise를 사용하면 NewsList에서 대기 중 상태관리와 useEffect 설저을 직접 하지 않아도 되므로 코드가 훨씬 간결해진다.
// 요청 상태를 관리할 때 커스텀 Hook을 만들어서 사용하면 편리해진다.

import { useState, useEffect } from 'react'

export default function usePromise(promiseCreator, deps) {
  // 로딩중 / 완료 / 실패에 대한 상태 관리
  const [loading, setLoading] = useState(false)
  const [resolved, setResolved] = useState(null)
  const [error, setError] = useState(null)

  // useEffect 에 파라미터로 전달해주는 함수에서 async 를 사용하면 안되기 때문에, useEffect 내부에서 async 함수인 process 함수를 만들고 그것을 실행시킨다.
  useEffect(() => {
    const process = async () => {
      setLoading(true)
      try {
        const resolved = await promiseCreator()
        setResolved(resolved)
      } catch (e) { setError(e) }
      setLoading(false)
    }

    process()
  }, deps)  // deps 배열은 useEffect 의 두번째 파라미터로 전달된다. 여기로 [category] 값이 전달되어, category 값이 바뀔 때마다 뉴스를 새로 불러올 수 있게 된다. useEffect 한 번으로 컴포넌트가 맨 처음 렌더링될 때, 그리고 category 값이 바뀔 때 요청하도록 설정해줄 수 있다.

  return [loading, resolved, error]
}
