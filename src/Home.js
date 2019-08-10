import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState()
  useEffect(() => {
    axios
      .get('/api')
      .then(res => {
        setData(res.data.data)
      })    
  }, [])
  return (
    <div className='container'>
      <h1>Livro de Séries Assistidas e Para Assistir</h1>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}

export default Home