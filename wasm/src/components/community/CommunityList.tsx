import { NavLink } from 'react-router-dom'
import classes from './CommunityList.module.css'
import { useState } from 'react'
import styled from 'styled-components'
function CommunityList({ posts, commentAmount }) {
  const [page, setPage] = useState(1)
  const reversePosts = posts.slice().reverse()
  const reverseCommentAmount = commentAmount.slice().reverse()
  const postLists = Math.ceil(posts.length / 10)
  const nowPosts = []
  for (let j = (page - 1) * 10; j < (page - 1) * 10 + 10; j++) {
    if (j < posts.length) nowPosts.push(reversePosts[j])
  }
  const newPosts = JSON.parse(JSON.stringify(nowPosts))

  const showedPosts = new Array(postLists).fill(0)
  console.log(newPosts)
  return (
    <div>
      <h1 style={{ marginRight: '60%' }}>목록</h1>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>작성자</th>
            <th>제목</th>
            <th>날짜</th>
            <th>댓글 수</th>
          </tr>
        </thead>
        <tbody>
          {newPosts.map((post, index) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.writer}</td>

              <td>
                <NavLink to={`${post.id}`}>{post.title}</NavLink>
              </td>
              <td>{post.date}</td>
              <td>{reverseCommentAmount[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showedPosts.map((item, index) => (
        <Button key={index + 1} onClick={() => setPage(index + 1)}>
          {index + 1}
        </Button>
      ))}
    </div>
  )
}

const Button = styled.button`
  overflow: hidden;
  position: relative;
  height: 38px;
  display: inline-block;
  zoom: 1;
  _display: block;
  text-align: center;
  -webkit-box-sizing: border-box;

  position &:hover {
    background: gray;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`

export default CommunityList
