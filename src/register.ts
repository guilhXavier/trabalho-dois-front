import { registerReview } from './api'
import './styles/style.css'

const renderForm = () => {
  const form = document.createElement('form')
  form.classList.add('form-register')

  const authorField = document.createElement('input')
  const contentField = document.createElement('textarea')
  const ratingField = document.createElement('input')
  const imgUrlField = document.createElement('input')

  const submitBt = document.createElement('button')

  authorField.id = 'author-field'
  authorField.placeholder = 'Autor'

  contentField.id = 'content-field'
  contentField.placeholder = 'Conteudo'

  ratingField.type = 'number'
  ratingField.placeholder = 'Nota'
  ratingField.max = '5'
  ratingField.min = '0'
  ratingField.id = 'rating-field'

  imgUrlField.id = 'imgurl-field'
  imgUrlField.placeholder = 'Url da imagem'

  submitBt.type = 'submit'
  submitBt.innerHTML = 'Submeter'
  submitBt.id = 'submit-register'
  submitBt.onclick = e => {
    e.preventDefault()
    submitRegister(
      authorField.value,
      contentField.value,
      ratingField.value,
      imgUrlField.value,
    ).then(x => (submitBt.innerHTML = x))
  }

  form.appendChild(authorField)
  form.appendChild(contentField)
  form.appendChild(ratingField)
  form.appendChild(imgUrlField)
  form.appendChild(submitBt)

  return form
}

const submitRegister = async (author, content, rating, imgUrl) => {
  const x = await registerReview(author, content, rating, imgUrl)

  if (x.status === 200) {
    console.log('here', 1)
    return 'Ok!'
  }
  console.log('here', 2)
  return 'Oops! :('
}

function Register() {
  const elem = document.createElement('div')

  elem.innerHTML = 'Cadastro'
  elem.classList.add('text-bold')
  elem.appendChild(renderForm())

  return elem
}

document.body.appendChild(Register())
