import { Suspense } from 'react'
import { Await, defer, useRouteLoaderData } from 'react-router-dom'
import CommunityList from '../../components/community/CommunityList'

function EventPage() {
  type Post = {
    id: number
    select: string
    title: string
    writer: string
    date: string
    contents: string
  }
  type Comment = {
    id: number
    commentId: number
    writer: string
    date: string
    contents: string
  }
  const { posts, comments } = useRouteLoaderData('event') as {
    posts: Post[]
    comments: Comment[]
  }
  const commentAmount = []
  for (let i = 0; i < posts.length; i++) {
    commentAmount.push(0)
    for (let j = 0; j < comments.length; j++) {
      if (comments[j].commentId === posts[i].id) {
        commentAmount[i]++
      }
    }
  }
  return (
    <Suspense>
      <Await resolve={posts}>
        {(loadData) => (
          <CommunityList posts={loadData} commentAmount={commentAmount} />
        )}
      </Await>
    </Suspense>
  )
}

export default EventPage

async function loadEvent() {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/event'
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

async function loadEventComment() {
  const response = await fetch(
    'https://shrub-terrific-beginner.glitch.me/event-comments'
  )
  if (!response.ok) {
  } else {
    const resData = await response.json()
    return resData
  }
}

export async function loader() {
  return defer({
    posts: await loadEvent(),
    comments: await loadEventComment(),
  })
}
