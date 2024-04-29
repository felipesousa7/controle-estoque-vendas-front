import React, { createContext, useState } from 'react'
import api from '../pages/api/api'

export const OrderContext = createContext({})

export function OrderProvider ({ children }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orders, setOrders] = useState([])


  function getOrders () {
    setLoading(true)
    api.get('/sales')
      .then(async res => {
        await setOrders(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  function getOrderById (id) {
    setLoading(true)
    api.get(`/sales/${id}`)
      .then(async res => {
        await setOrders(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  async function createOrder(data) {
    setLoading(true)
    try {
      const response = await api.post('/sales', data)
      if(response){
        getOrders()
        setSuccess('Produto criado com sucesso!')
      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
    }
  }
  

  async function updateOrder (id, data) {
    setLoading(true)
    try {
      const update = await api.put(`/sales/${id}`, data)
      getOrders()
      setLoading(false)
      setSuccess('Produto editado com sucesso!')
    } catch (error) {
      setLoading(false)
      setError('Encontramos problemas ao editar o produto!')
    }
  }

  async function removeOrder (id) {
    setLoading(true)
    try {
      const update = await api.delete(`/sales/${id}`)
      getOrders()
      setLoading(false)
      setSuccess('Produto removido com sucesso!')
    } catch (error) {
      setLoading(false)
      setError('Encontramos problemas ao remover o produto!')
    }
  }

  const value = {
    loading,
    getOrders,
    orders,
    success,
    setSuccess,
    error,
    setError,
    updateOrder,
    createOrder,
    removeOrder,
    getOrderById
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}
