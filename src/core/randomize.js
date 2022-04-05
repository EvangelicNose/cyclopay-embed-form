import React from "react";
import { Button } from '@mui/material/Button';
import { Accordion } from '@mui/material/Accordion';
import { AccordionSummary } from '@mui/material/AccordionSummary';
import { AccordionDetails } from '@mui/material/AccordionDetails';



const rdmnumber = Math.floor(Math.random() * 100000)

function gerarCpf() {
    const num1 = aleatorio();
    const num2 = aleatorio();
    const num3 = aleatorio();
    const dig1 = dig(num1, num2, num3);
    const dig2 = dig(num1, num2, num3, dig1);
    return `${num1}${num2}${num3}${dig1}${dig2}`;
}

function dig(n1, n2, n3, n4) {

    const nums = n1.split("").concat(n2.split(""), n3.split(""));

    if (n4 !== undefined) {
        nums[9] = n4;
    }

    let x = 0;

    for (let i = (n4 !== undefined ? 11 : 10), j = 0; i >= 2; i--, j++) {
        x += parseInt(nums[j]) * i;
    }

    const y = x % 11;
    return y < 2 ? 0 : 11 - y;
}

function aleatorio() {
    const aleat = Math.floor(Math.random() * 999);
    return ("" + aleat).padStart(3, '0');
}

function randomizeCustomer(formikprops) {
    const values = {
        first_name: `Nome ${rdmnumber}`,
        last_name: `Sobrenome ${rdmnumber}`,
        mobile_phone: `5511111111111`,
        email: `email${rdmnumber}@email.com`,
        document_type: 'CPF',
        document_number: gerarCpf(),
        billing_address_postal_code: `01239040`,
        billing_address_street1: ``,
        billing_address_number: `300`,
        billing_address_state: ``,
        billing_address_district: ``,
        billing_address_city: ``,
        billing_address_country: ``,
        billing_address_complement: ``,
        shipping_address_postal_code: `01239040`,
        shipping_address_street1: ``,
        shipping_address_number: `300`,
        shipping_address_state: ``,
        shipping_address_district: ``,
        shipping_address_city: ``,
        shipping_address_country: ``,
        shipping_address_complement: ``,
    }

    return Object.keys(values).forEach(v => {
        formikprops.setFieldValue(v, values[v])
    })
}

function randomizeDocument(formikprops) {
    const values = {

        document_type: 'CPF',
        document_number: gerarCpf(),

    }

    return Object.keys(values).forEach(v => {
        formikprops.setFieldValue(v, values[v])
    })
}

function randomizeBilling(formikprops) {
    const values = {
        billing_address_postal_code: `01239040`,
        billing_address_street1: ``,
        billing_address_number: `300`,
        billing_address_state: ``,
        billing_address_district: ``,
        billing_address_city: ``,
        billing_address_country: ``,
        billing_address_complement: ``,
        shipping_address_postal_code: `01239040`,
        shipping_address_street1: ``,
        shipping_address_number: `300`,
        shipping_address_state: ``,
        shipping_address_district: ``,
        shipping_address_city: ``,
        shipping_address_country: ``,
        shipping_address_complement: ``,
    }

    formikprops.setValues(values)
}

export default function TestForm({ formStep, formikprops, checkoutConfig, value }) {
    (
        <div className="form-test">
            <Accordion>
                <AccordionSummary>
                    Testes
                </AccordionSummary>
                <hr />
                <AccordionDetails>
                    <div className="flex-col">
                        {formStep === 'customer' &&
                            <>
                                <div className="flex-col">
                                    Assinante:
                                    <Button variant="outlined" onClick={() => randomizeCustomer(formikprops)}>
                                        Randomizar Assinante
                                    </Button>

                                </div>
                                <hr style={{ width: '100%' }} />
                            </>
                        }

                        {checkoutConfig.plan.coupon_enabled &&
                            <>
                                <div className="flex-col">
                                    Cupom:
                                    <Button variant="outlined">
                                        Testar cupom válido
                                    </Button>
                                    <Button variant="outlined">
                                        Testar cupom não encontrado
                                    </Button>
                                    <Button variant="outlined">
                                        Testar cupom expirado
                                    </Button>

                                </div>
                                <hr style={{ width: '100%' }} />
                            </>
                        }

                        {formStep !== 'customer' && value === 0 &&
                            <>
                                <div className="flex-col">
                                    Cartão de crédito:
                                    <Button variant="outlined">
                                        Testar cartão de crédito válido
                                    </Button>
                                    <Button variant="outlined">
                                        Testar cartão de crédito com limite excedido
                                    </Button>
                                    <Button variant="outlined">
                                        Testar cartão de crédito com suspeita de fraude
                                    </Button>

                                </div>
                                <hr style={{ width: '100%' }} />
                            </>
                        }

                        {formStep !== 'customer' && value === 1 &&
                            <>
                                <div className="flex-col">
                                    Boleto:
                                    <Button variant="outlined" onClick={() => randomizeDocument(formikprops)}>
                                        Randomizar documento
                                    </Button>
                                    <Button variant="outlined" onClick={() => randomizeBilling(formikprops)}>
                                        Preencher endereços
                                    </Button>

                                </div>
                                <hr style={{ width: '100%' }} />
                            </>
                        }

                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )

    return null
}

