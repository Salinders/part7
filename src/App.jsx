import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = `https://restcountries.com/v3.1/name/${name}?fullText=true`
  useEffect(() => {
    if (name) {
      console.log('fetching country data')
      axios.get(baseUrl).then((res) => {
        setCountry(res)
        console.log(res.data[0])
      })
        .catch((error) => {
          console.error('Error fetching data')
          setCountry(null)
        })


    }

  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found ...
      </div>
    )
  }

  return (
    <div>
      <div>name:  {country.data[0].name.common} </div>

      <div>capital:  {country.data[0].capital} </div>
      <div>Population:  {country.data[0].population} </div>

      <img src={country.data[0].flags.png} height='100' alt={`flag of ${country.data.name}`} />

    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(nameInput)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App