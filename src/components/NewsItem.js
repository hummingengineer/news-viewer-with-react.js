import React from 'react'
import styled from 'styled-components'

const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;  /* 오른쪽에 바깥 여백 영역 */
    img {
      display: block;
      width: 160px;
      height: 100px;
      object-fit: cover;  /* 내용이 종횡비를 유지하면서 정의된 너비와 높이를 가득 채울때까지 확대된다. 컨텐츠 화면 사이즈에 맞게 설정 */
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;  /* 줄 높이를 정하는 속성 */
      margin-top: 0.5rem;
      white-space: normal;  /* 공백을 여러개 넣어도 공백 1개만 표시, 글이 길어지면 텍스트가 자동 줄바꿈 됨(wrap) */
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

function NewsItem ({ article }) {
  const { title, description, url, urlToImage } = article

  return (
    <NewsItemBlock>
      {urlToImage && (
        <div className="thumbnail">
          <a href={url} target="_blank" rel="noopener noreferrer"> {/* rel 속성은 현재 문서와 링크된 문서 사이의 연관 관계(relationship)를 명시합니다. */}
            <img src={urlToImage} alt="thumbnail"/> {/* alt 속성은 그림이 렌더링되지 못할 때 나타날 문자열 */}
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer"> {/* noopener: 하이퍼링크를 따라 연결되는 어떠한 브라우징 컨텍스트(browsing context)도 오프너(opener)여서는 안 됨을 나타냄. noreferrer: 사용자가 하이퍼링크를 클릭할 때 브라우저가 HTTP 리퍼러 헤더(referer header)를 전송해서는 안 됨을 나타냄. */}
            {title}
          </a>
        </h2>
        <p>{description}</p>
      </div>
    </NewsItemBlock>
  )
}

export default NewsItem
