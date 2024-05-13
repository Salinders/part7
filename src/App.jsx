
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { useField } from './hooks'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"
import { Table, Form, Button, Alert, FormLabel } from 'react-bootstrap'
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to="/anecdotes" style={padding}>anecdotes</Link>
      <Link to="/create" style={padding}>create new</Link>
      <Link to="/about" style={padding}>about</Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => (

  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <h3>has {anecdote.votes} votes</h3>
  </div>


)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote =>
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </td>
            <td>
              {anecdote.author}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div >
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const url = useField('text')


  const handleReset = () => {
    content.reset()
    author.reset()
    url.reset()

  }

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: url.value,
      votes: 0
    })
    navigate('/anecdotes')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control
            type="text"
            name="content"
            {...content}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            {...author}
          />
        </Form.Group><Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            {...url}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
      </form>
      <Button variant="primary" type="submit" onClick={handleReset}>reset</Button>



    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote ${anecdote.content} was created`)
    setTimeout(() => {
      setNotification('')
    }, 4000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  const match = useMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (
    <div class='container'>
      <h1>Software anecdotes</h1>
      <div>
        {(notification &&
          <Alert variant="success">
            {notification}
          </Alert>
        )}
        <Menu />
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />

        <Route path="anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />

      </Routes>
      <div>
        <br></br>
        <Footer />
      </div>
    </div>
  )
}

export default App
