import { getAllReviews } from './api'
import './styles/style.css'
import { Pageable } from './types/pageable'
import { Review } from './types/review'

const fetch = async () => {
  const res = await getAllReviews(0)

  if (res.status === 200) {
    console.log(res)
  }

  return res.data
}

const mapReviews = (revs: Review[]) => {
  const elems = revs.map(review => {
    const el = document.createElement('div')
    el.classList.add('review-list-item')

    const img = document.createElement('img')

    img.src = review.imgUrl

    img.alt = review.imgUrl

    el.innerHTML = `Id: ${review.id} - Author: ${review.author} - Content: ${review.content} - Rating: ${review.rating} - ${review.dateCreated}`

    el.appendChild(img)

    return el
  })

  return elems
}

const renderButton = (label: string, isDisabled: boolean) => {
  const bt = document.createElement('button')
  bt.innerHTML = label
  bt.disabled = isDisabled

  return bt
}

function Main() {
  const elem = document.createElement('div')
  fetch().then(res => {
    mapReviews(res.content).forEach(item => elem.appendChild(item))
    elem.appendChild(renderButton('Voltar', res.first))
    elem.appendChild(renderButton('Proximo', res.last))
  })

  elem.classList.add('text-bold')
  elem.classList.add('container')

  return elem
}

document.body.appendChild(Main())
