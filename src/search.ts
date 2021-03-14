import { getReviewsById, getReviewsByKeyWord } from './api'
import './styles/style.css'

const renderReview = review => {
  const el = document.createElement('div')
  el.classList.add('review-list-item')

  const img = document.createElement('img')

  img.src = review.imgUrl

  img.alt = review.imgUrl

  el.innerHTML = `Id: ${review.id} - Author: ${review.author} - Content: ${review.content} - Rating: ${review.rating} - ${review.dateCreated}`

  el.appendChild(img)

  return el
}

const submitById = async (id: number) => {
  const res = await getReviewsById(id)

  if (res.status === 200) {
    console.log(res)
  }

  return res.data
}

const renderSearchById = () => {
  const form = document.createElement('form')
  form.classList.add('form-register')

  const idField = document.createElement('input')

  const submitBt = document.createElement('button')

  idField.id = 'id-field'
  idField.placeholder = 'Pesquisa por id'

  submitBt.type = 'submit'
  submitBt.innerHTML = 'Submeter'
  submitBt.id = 'submit-id'
  submitBt.onclick = e => {
    e.preventDefault()
    submitById(Number(idField.value)).then(x =>
      form.appendChild(renderReview(x)),
    )
  }

  form.appendChild(idField)
  form.appendChild(submitBt)

  return form
}

const submitByKeyword = async (keyword: string) => {
  const res = await getReviewsByKeyWord(keyword, 0)

  if (res.status === 200) {
    console.log(res)
  }

  return res.data
}

const renderButton = (label: string, isDisabled: boolean) => {
  const bt = document.createElement('button')
  bt.innerHTML = label
  bt.disabled = isDisabled

  return bt
}

const renderSearchByKeyword = () => {
  const form = document.createElement('form')
  form.innerHTML = 'Pesquisa por palavra chave'
  form.classList.add('form-register')

  const keywordField = document.createElement('input')

  const submitBt = document.createElement('button')

  keywordField.id = 'key-field'
  keywordField.placeholder = 'Pesquisa por palavra-chave'

  submitBt.type = 'submit'
  submitBt.innerHTML = 'Submeter'
  submitBt.id = 'submit-keyword'
  submitBt.onclick = e => {
    e.preventDefault()
    submitByKeyword(keywordField.value).then(res => {
      res.content.forEach(elem => form.appendChild(renderReview(elem)))
      form.appendChild(renderButton('Voltar', res.first))
      form.appendChild(renderButton('Proximo', res.last))
    })
  }

  form.appendChild(keywordField)
  form.appendChild(submitBt)

  return form
}

function Search() {
  const elem = document.createElement('div')

  elem.innerHTML = 'Pesquisa por id'
  elem.classList.add('text-bold')
  elem.classList.add('container')

  elem.appendChild(renderSearchById())
  elem.appendChild(renderSearchByKeyword())

  return elem
}

document.body.appendChild(Search())
