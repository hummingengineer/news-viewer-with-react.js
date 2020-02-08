// 컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우 더욱 간결하게 코드를 작성할 수 있도록 해 주는 커스텀 Hook
// 프로젝트의 다양한 곳에서 사용될 수 있는 유틸 함수들은 보통 이렇게 src 디렉터리에 lib 디렉터리를 만든 후 그 안에 작성한다.
// usePromise Hook은 Promise의 대기 중, 완료 결과, 실패 결과에 대한 상태를 관리하며, usePromise의 의존 배열 deps를 파라미터로 받아 온다.

import { useState, useEffect } from 'react'

export default function usePromise(promiseCreator, deps) {
  // 대기 중/완료/실패에 대한 상태 관리
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
  }, deps)  // deps 배열은 useEffect 의 두번째 파라미터로 전달되며, 기본값은 비어있는 배열. 비어있는 배열을 전달하면 컴포넌트가 가장 처음 렌더링 될 때만 실행 되는 것을 이용하여 가장 처음 렌더링 될 때만 실행되도록 함.

  return [loading, resolved, error]
}
