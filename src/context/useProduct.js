import React, { createContext, useState } from 'react'
import api from '../pages/api/api'

export const ProductContext = createContext({})

export function ProductProvider ({ children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [products, setProducts] = useState([])


  function getProducts () {
    setLoading(true)
    api.get('/products')
      .then(async res => {
        await setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  function getProductById (id) {
    setLoading(true)
    api.get(`/products/${id}`)
      .then(async res => {
        await setProducts(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  async function createProduct(data) {
    setLoading(true)
    try {
      const response = await api.post('/products', data)
      if(response){
        getProducts()
        setSuccess('Produto criado com sucesso!')
      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  

  async function updateProduct (id, data) {
    setLoading(true)
    try {
      const update = await api.put(`/products/${id}`, data)
      getProducts()
      setLoading(false)
      setSuccess('Produto editado com sucesso!')
    } catch (error) {
      setLoading(false)
      setError('Encontramos problemas ao editar o produto!')
    }
  }

  async function removeProduct (id) {
    setLoading(true)
    try {
      const update = await api.delete(`/products/${id}`)
      getProducts()
      setLoading(false)
      setSuccess('Produto removido com sucesso!')
    } catch (error) {
      setLoading(false)
      setError('Encontramos problemas ao remover o produto!')
    }
  }

  const value = {
    loading,
    getProducts,
    products,
    success,
    setSuccess,
    error,
    setError,
    updateProduct,
    createProduct,
    removeProduct,
    getProductById
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}
