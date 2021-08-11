import React, { memo, useEffect, useState, useCallback } from 'react'
import { useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Row, Column } from '../components/index'
import Api from '../api/api'
import { createMarkup } from '../utils'
import './style.css'
import Actions from './components/Actions'

function Post() {
  const { id, subject } = useParams()
  const [post, setPost] = useState({})
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const renderImg = ({ image, description }) => <img src={image.url} alt={description} width="75%" />

  const handleNews = useCallback((data) => {
    setNews(data[0]?.value)
    setPost(data[1]?.value)
    setLoading(false)
  }, [])


  useEffect(() => {
    setLoading(true)

    Promise.allSettled([
      Api.getNews(subject),
      Api.getNewsById(subject, id)
    ])
      .then(handleNews)

  }, [id, subject, handleNews])

  const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />

  const openPost = (id) => {
    history.push(`/${subject}/${id}`)
  }

  const renderPost = (post, index) => {
    const { title, image, description, id } = post

    return (
      <Column span={12} key={`post-${index}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url ? renderImg({ image, description }) : renderDescription(description)}
        </article>
      </Column>
    )
  }

  if (loading) return <div>Carregando</div>

  if (!post?.id) return null

  const { title, image, description, body, datePublished } = post


  return (
    <div>
      <Actions post={post} subject={subject}/>
      <Link to="/">Back</Link>
      <Row gutter={[16, 16]}>
        <Column span={24} md={16}>
          <p>{datePublished}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image && renderImg({ image, description })}
          <p className="text" dangerouslySetInnerHTML={createMarkup(description)} />
          <hr />
          <p className="text" dangerouslySetInnerHTML={createMarkup(body)} />
        </Column>
        <Column span={24} md={8}>
          <Row gutter={[16, 16]}>
            {news?.value?.map(renderPost)}
          </Row>
        </Column>
      </Row>
    </div>
  )
}

export default memo(Post)
