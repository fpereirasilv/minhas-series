import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'


const EditarSerie = ({ match }) => {
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])
  
  const [data, setData] = useState({})
  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => {
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  useEffect(() => {
    axios
      .get('/api/genres/')
      .then(res => {
        setGenres(res.data.data)
      })
  }, [])

  //custom header
  const masterheader = {
    height: '50vh',
    minheight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value
    })
  }

  const save = () => {
    axios
      .put('/api/series' + match.params.id, form)
      .then(res => {
        setSuccess(true)
      })
  }

  if (success){
    return <Redirect to='/series/' />
  }

  return(
    <div>
      <header style={masterheader}>
        <div className='h-100' style={{ background: 'rgba(0, 0, 0, 0.7)'}}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-3'>
                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}/>
              </div>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  <Badge color='success'>Assistido</Badge>
                  <Badge color='warning'>Para Asistir</Badge>
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
      </div>
      {
        mode === 'EDIT' &&
       
      <div className='container'>
        <h1>Editar Série</h1>        
        <pre>{JSON.stringify(form)}</pre>
        <form>
          <div className='form-group'>        
            <label htmlFor='name'>Nome</label>
            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='nome' placeholder='Nome da série'/>
          </div>
          <div className='form-group'>        
            <label htmlFor='comentarios'>Comentários</label>
            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Deixe seu comentátirio'/>
          </div>
          <div className='form-group'>
          <label htmlFor='genres'>Gêneros</label>  
          <select className='form-control' onChange={onChange('genre')}>
            { genres.map(genre => <option key={genre.id} value={genre.id} select={genre.id === form.genre}>{genre.name}</option>)}
          </select>
          </div>  
          <br/>
          <button type="button" onClick={save} className='btn btn-primary'>Salvar</button>
          <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar</button>
        </form>
      </div>
      }
    </div>
  )

}

export default EditarSerie;
