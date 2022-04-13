import './App.css';
import RenderInputs from './components/RenderInputs';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button } from '@mui/material';
import Loader from './components/Loader';


function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitButton, setSubmitButton] = useState({ active: false })
  const [inputs, setInputs] = useState([])
  const [renderForm, setRenderForm] = useState(false)

  const wait = async () => {
    return await setTimeout(() => setIsLoading(false), 3000)
  }

  var init = () => {
    setIsLoading(true)
    wait()
    setRenderForm(true)
  }

  const createInput = (elements) => {
    const formInputs = []
    if (!elements) return
    elements.map(element => {
      return formInputs.push({ name: element.name, label: element.label })
    })
    return setInputs([...inputs, ...formInputs])
  }

  const createSubmitButton = (props = {}) => {
    setSubmitButton({ active: true, label: props.label })
  }

  const createCardForm = () => {
    createInput([
      { name: 'cc_number' },
      { name: 'cc_expiry_date' },
      { name: 'cvv' },
      { name: 'cc_cardholder' }
    ])
  }

  const createCustomerForm = (props = {}) => {
    console.log(props)

    const formInputs = [
      { separator: "Dados pessoais" },
      { name: 'first_name' },
      { name: 'last_name' },
      { name: 'email' },
      { name: 'mobile_phone' }
    ]

    const documentInputs = [
      { name: 'document_type' },
      { name: 'document_number' }
    ]

    const billingInputs = [
      { separator: "Endereço de cobrança" },
      { name: 'billing_address_postal_code' },
      { name: 'billing_address_street1' },
      { name: 'billing_address_number' },
      { name: 'billing_address_state' },
      { name: 'billing_address_district' },
      { name: 'billing_address_city' },
      { name: 'billing_address_country' },
      { name: 'billing_address_complement' }
    ]

    const shippingInputs = [
      { separator: "Endereço de entrega" },
      { name: 'shipping_address_postal_code' },
      { name: 'shipping_address_street1' },
      { name: 'shipping_address_number' },
      { name: 'shipping_address_state' },
      { name: 'shipping_address_district' },
      { name: 'shipping_address_city' },
      { name: 'shipping_address_country' },
      { name: 'shipping_address_complement' }
    ]

    if (props.document) {
      formInputs.push(...documentInputs)
    }

    if (props.billing_address) {
      formInputs.push(...billingInputs)
    }
    if (props.shipping_address) {
      formInputs.push(...shippingInputs)
    }
    return setInputs([...inputs, ...formInputs])
  }


  const onSubmit = () => {
    const response = Math.floor(Math.random() * 10) % 2
    return response
      ? window.cyclopay.onSuccess()
      : window.cyclopay.onError()
  }

  window.cyclopay.createInput = (props) => createInput(props)
  window.cyclopay.createSubmitButton = (props) => createSubmitButton(props)
  window.cyclopay.createCustomerForm = (props) => createCustomerForm(props)
  window.cyclopay.createCardForm = (props) => createCardForm(props)
  window.cyclopay.init = (props) => init()

  if (isLoading) return <div className='App flex-row' style={{ justifyContent: 'center' }}>
    <Loader />
  </div>

  return (
    <div className="App">
      {(renderForm) &&
        <Formik
          initialValues={{ mobile_phone: "", document_type: "CPF" }}
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
                inputs={inputs}
              />
              {submitButton.active &&
                <div className="flex-col" style={{ flex: 1, margin: 10, minWidth: 200 }}>
                  <Button type="submit" variant='contained' style={{ width: '100%' }}>{submitButton.label || 'Concluir'}</Button>
                </div>
              }

            </form>
          )}
        </Formik>}
    </div >
  )
}

export default App;


window.cyclopay = {
  // renderForm: () => init(),
  onError: () => null,
  onSuccess: () => null,
}