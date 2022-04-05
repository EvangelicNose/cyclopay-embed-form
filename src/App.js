import './App.css';
import RenderInputs from './components/RenderInputs';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Loader from './components/Loader';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [submitButton, setSubmitButton] = useState({ active: false })
  const [inputs, setInputs] = useState([])
  const [renderForm, setRenderForm] = useState(false)

  var init = () => {
    setRenderForm(true)
  }

  const createInput = (elements) => {
    const formInputs = []
    if (!elements) return
    elements.map(element => {
      formInputs.push({ name: element.name, label: element.label })
    })
    return setInputs(formInputs)
  }

  const createSubmitButton = ({ label }) => {
    setSubmitButton({ active: true, label })
  }


  const onSubmit = () => {
    const response = Math.floor(Math.random() * 10) % 2
    return response
      ? window.cyclopay.onSuccess()
      : window.cyclopay.onError()
  }

  window.cyclopay.createInput = (props) => createInput(props)
  window.cyclopay.createSubmitButton = (props) => createSubmitButton(props)
  window.cyclopay.init = (props) => init()

  const wait = async () => {
    createInput()
    createSubmitButton({ label: 'Debitar' })
    return await setTimeout(() => setIsLoading(false), 3000)
  }

  useEffect(() => {
    wait()
  }, [])

  if (isLoading) return <div className='App flex-row' style={{ justifyContent: 'center' }}>
    <Loader />
  </div>

  return (
    <div className="App">
      {(renderForm) &&
        <Formik
          initialValues={{}}
          onSubmit={form => onSubmit(form)}
        >
          {({
            ...formikprops
          }) => (
            <form onSubmit={(event) => {
              event.preventDefault();
              onSubmit()
            }}>
              <RenderInputs
                formikprops={formikprops}
                checkoutConfig={null}
                inputs={inputs} />
              {submitButton.active && <div className="flex-col" style={{ flex: 1, margin: 10, minWidth: 200 }}>
                <Button type="submit" variant='contained' style={{ width: '100%' }}>{submitButton.label}</Button>
              </div>}

            </form>
          )}
        </Formik>}
    </div >
  )
  return
}

export default App;


window.cyclopay = {
  // renderForm: () => init(),
  onError: () => null,
  onSuccess: () => null,
}