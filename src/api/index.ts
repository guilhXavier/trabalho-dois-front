import axios, { AxiosError, AxiosResponse } from 'axios'
import { Pageable, RequestBody } from '../types/pageable'
import { Review } from '../types/review'

const REQUEST_URL = 'http://localhost:8080'

const convertResenhaToReview = (resenha: Record<string, any>): Review => ({
  id: resenha.id,
  author: resenha.autor,
  content: resenha.conteudo,
  rating: resenha.nota,
  imgUrl: resenha.urlImagem,
  dateCreated: resenha.dataCriacao,
})

const convertPagedReviews = (obj: Record<string, any>): Pageable<Review> => ({
  first: obj.first,
  last: obj.last,
  content: obj.content.map(convertResenhaToReview),
})

const registerReview = (
  author: string,
  content: string,
  rating: number,
  imgUrl: string,
): Promise<AxiosResponse<string>> | AxiosResponse<string> =>
  axios
    .post(REQUEST_URL + '/resenha', {
      autor: author,
      conteudo: content,
      nota: rating,
      urlImagem: imgUrl,
    })
    .then((x: AxiosResponse<string>) => x)
    .catch((err: AxiosError) => err.response)

const getAllReviews = (
  pageNumber: number,
): Promise<AxiosResponse<Pageable<Review>>> | AxiosResponse<Pageable<Review>> =>
  axios
    .get(
      REQUEST_URL + `/resenha?pageNumber=${pageNumber}&pageSize=5&paged=true`,
    )
    .then((x: AxiosResponse<any>) => ({
      ...x,
      data: convertPagedReviews(x.data),
    }))
    .catch((err: AxiosError) => err.response)

export { registerReview, getAllReviews }
