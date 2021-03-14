import './styles/style.css'

function Register() {
  const elem = document.createElement('div')

  elem.innerHTML = 'Hello world! register'
  elem.classList.add('text-bold')

  return elem
}

document.body.appendChild(Register())
