import TextField from "@mui/material/TextField";
import React from "react";
import PhoneInput from "react-phone-input-2";
import MaskedInput from "react-text-mask";
import { flagReValidators } from "../core/cards-utils";
import generateMask from "../core/generateMask";
import { getviaCepUrl } from "../components/getViaCepUrl";
import AppContext, { useAppContext } from "../core/AppContextCheckout";
import { useTranslation } from "../core/IntlContext/IntlContext";
import SelectedInput from "../core/SelectedInput";
import { TextInputMasked } from "../core/TextInput";
import { handleBrand } from "../components/handleBrand";
import CardBrand from "../core/CardBrand";

let documentType

const RenderInputsV4 = ({ inputs, formikprops, checkoutConfig }) => {
    return (
        <div style={{ width: "100%" }}>
            {inputs.map((input, index) => (
                <div key={`row-${index}`} className="flex-row xs-wrap">
                    <div key={`input-${input.name}`} className="flex-col" style={{ flex: 1, margin: 10, minWidth: 200 }}>
                        <InputsSwitch type={input.name} label={input.label} error={Boolean(formikprops.errors[input.name] && formikprops.touched[input.name])} required checkoutConfig={checkoutConfig} formikprops={formikprops} />
                        <span style={{ fontSize: '0.7rem', color: 'red' }}>
                            {formikprops.errors[input.name] && formikprops.touched[input.name] && formikprops.errors[input.name]}
                        </span>
                    </div>

                </div>
            ))}
        </div>
    )
}

const InputsSwitch = ({ type, formikprops, required, error, label, checkoutConfig = {} }) => {
    const t = useTranslation()
    let input
    const { language } = useAppContext(AppContext);
    // let documentType = language === "pt-BR" ? "CPF" : 'CNI'
    const getDocument = (lang) => {
        switch (lang) {
            case "pt-BR":
                return [
                    { value: "CPF", label: "CPF" },
                    { value: "CNPJ", label: "CNPJ" },
                ];

            case "fr":
                return [{ value: "CNI", label: "CNI" }];

            default:
                return "br";
        }
    };

    const getCountry = (lang) => {
        switch (lang) {
            case "pt-BR":
                return "br";

            case "fr":
                return "fr";

            default:
                return "br";
        }
    };

    function handleFocus(event) {
        let lastDigitIndex = 0;
        const { target } = event;
        const { value } = target;
        for (let i = value.length - 1; i >= 0; i--) {
            if (value[i].match(/\d/)) {
                lastDigitIndex = i + 1;
                break;
            }
        }
        setTimeout(() => {
            target.setSelectionRange(lastDigitIndex, lastDigitIndex);
        });
    }

    const handleMobileFocus = (value) => {
        if (value.length <= 12) {
            const el = document.getElementById('input-mobile_phone-1')
            if (document.getElementById('input-mobile_phone') !== document.activeElement) return
            return el.focus()

        } else {
            const el = document.getElementById('input-mobile_phone')
            if (document.getElementById('input-mobile_phone-1') !== document.activeElement) return
            return el.focus()
        }
    }

    const maskType = (type, brand) => {
        switch (type) {
            case "CNPJ":
                return generateMask("99.999.999/9999-99");

            case "CPF":
                return generateMask("999.999.999-99");

            case "CNI":
                return generateMask("99999999999999");

            case "CARD":
                return generateMask(
                    flagReValidators[brand || "default"].raw_mask
                );

            case "CVV":
                return generateMask(
                    flagReValidators[brand || "default"].raw_mask_cvv
                );

            default:
                return generateMask("99999999999999");
                break;
        }
    };

    function TextMaskCustom(props) {
        const { inputRef, ...other } = props;

        return (
            <MaskedInput
                {...other}
                ref={(ref) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={generateMask('999.999.999-99')}
                placeholderChar={'\u2000'}
            />
        );
    }

    // TextMaskCustom.propTypes = {
    //     inputRef: PropTypes.func.isRequired,
    // };

    switch (type) {
        case 'first_name':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.first_name}`}
                name={type} variant="outlined" />
            break;

        case 'last_name':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.last_name}`}
                name={type} variant="outlined" />

            break;

        case 'document_type':
            documentType = formikprops.values[type]
            input = <SelectedInput
                disabled={formikprops.values.disabled_input}
                value={formikprops.values[type]}
                name={type}
                defaultValue="CPF"
                onChange={e => {
                    formikprops.handleChange(e)
                    documentType = e.target.value
                    return
                }}
                arrayValues={getDocument(language)}
                label={label || t("^forms.document_type", "*")}
                onBlur={formikprops.handleBlur}
                errorMessage={
                    formikprops.touched[type] &&
                    formikprops.errors[type]
                }
            />

            break;

        case 'country_code':
            input = <SelectedInput
                name={type}
                value={formikprops.values["country_code"]}
                onChange={e => {
                    formikprops.handleChange(e)
                    return
                }}
                onBlur={formikprops.handleBlur}
                arrayValues={
                    [
                        { value: "FRA", label: "France" },
                        { value: "BRA", label: "Brasil" },
                        { value: "PER", label: "Perú" },
                        { value: "ARG", label: "Argentina" },
                        { value: "COL", label: "Colombia" },
                    ]
                }
                label={label || t("^forms.country")}
                errorMessage={
                    formikprops.touched[type] &&
                    formikprops.errors[type]
                }
            />

            break;

        case 'document_type_fr':
            documentType = formikprops.values[type]
            input = <SelectedInput
                disabled={formikprops.values.disabled_input}
                value={formikprops.values[type]}
                name={type}
                defaultValue="CNI"
                onChange={e => {
                    const value = e.target.value
                    formikprops.setFieldValue("document_type_fr", value)
                    documentType = value
                    return
                }}
                arrayValues={getDocument(language)}
                label={label || t("^forms.document_type", "*")}
                onBlur={formikprops.handleBlur}
                errorMessage={
                    formikprops.touched[type] &&
                    formikprops.errors[type]
                }
            />

            break;

        case 'document_number':
            input = <MaskedInput
                errorMessage={error}
                autoComplete="on"
                onBlur={formikprops.handleBlur}
                name={type}
                value={
                    formikprops.values[type]
                }
                onFocus={handleFocus}
                onChange={formikprops.handleChange}
                mask={() => {
                    return maskType(documentType);
                }}
                placeholderChar={"\u2000"}
                render={(ref, props) => (
                    <TextInputMasked
                        id="form-input-section"
                        inputPro
                        shrink={true}
                        type="tel"
                        labelProps={{ shrink: true }}
                        label={label || t(
                            "^forms.document_number",
                            "*"
                        )}
                        inputRef={ref}
                        {...props}
                    />
                )}
            />



            break;

        case 'email':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.email}`} type="email"
                name={type} variant="outlined" />

            break;
        case 'mobile_phone':

            //Gambiarra pra deixar a mascara "dinâmica"

            input = <div className="flex-row">
                <div style={{
                    width: formikprops.values.mobile_phone?.length > 12 ? '0px' : '100%',
                    overflow: formikprops.values.mobile_phone?.length > 12 && "hidden",
                    margin: "-5px",
                    padding: 5,
                    opacity: formikprops.values.mobile_phone?.length > 12 && 0
                }}
                >
                    <PhoneInput fullWidth
                        key={`input-${type}-1`}
                        InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                        masks={{ br: '(..) ....-.....' }}
                        inputStyle={{ borderColor: error && "#f44336" }}
                        error={error}
                        onBlur={formikprops.handleBlur}
                        style={{ width: formikprops.values.mobile_phone?.length > 12 && 0 }}
                        onChange={(value) => {
                            formikprops.setFieldValue(
                                type,
                                value
                            );
                            handleMobileFocus(value)
                        }}
                        inputProps={{ name: type, id: `input-${type}-1`, autoComplete: 'off' }}
                        value={formikprops.values[type]}
                        specialLabel={label || `${required && "*"}${t.forms.mobile_phone}`}
                        variant="outlined"
                        country={getCountry(language)} />
                </div>
                <div style={{
                    width: formikprops.values.mobile_phone?.length <= 12 ? '0px' : '100%',
                    overflow: formikprops.values.mobile_phone?.length <= 12 && "hidden",
                    margin: "-5px",
                    padding: 5,
                    opacity: formikprops.values.mobile_phone?.length <= 12 && 0
                }}
                >
                    <PhoneInput fullWidth
                        key={`input-${type}`}
                        InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                        masks={{ br: '(..) . ....-....' }}
                        inputStyle={{ borderColor: error && "#f44336" }}
                        error={error}
                        onBlur={formikprops.handleBlur}
                        onChange={(value) => {
                            formikprops.setFieldValue(
                                type,
                                value
                            );
                            handleMobileFocus(value)
                        }}
                        inputProps={{ name: type, id: `input-${type}`, autoComplete: 'off' }}
                        value={formikprops.values[type]}
                        specialLabel={label || `${required && "*"}${t.forms.mobile_phone}`}
                        variant="outlined"
                        country={getCountry(language)} />

                </div>
            </div>
            //Sorry not sorry
            break;

        case 'billing_address_postal_code':
            input = <MaskedInput
                errorMessage={error}
                disabled={formikprops.values.disabled_input}
                value={formikprops.values[type]}
                onFocus={handleFocus}
                onChange={(e) => {
                    const value = (
                        e.target.value.toString().match(/\d/g) || []
                    ).join("");
                    formikprops.setFieldValue(`${type}`, value);
                }}
                mask={() => generateMask("99999-999")}
                placeholderChar={"\u2000"}
                onBlur={e => {
                    const value = (
                        e.target.value.toString().match(/\d/g) || []
                    ).join("");
                    getviaCepUrl(value, formikprops, 'billing_address');

                }}
                autoComplete="postal-code"
                render={(ref, props) => (
                    <TextInputMasked
                        type="tel"
                        label={label || `${required && "*"}${t("^forms.postal_code")}`}
                        inputRef={ref}
                        {...props}
                    />
                )}
            />

            break;

        case 'billing_address_postal_code_fr':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                autoComplete="number"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t("^forms.postal_code")}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_street1':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t("^forms.street", "")}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_street2':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t("^forms.street", "", "ligne 2")}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_number':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                autoComplete="number"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.street_number}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_state':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.state}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_district':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.district}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_city':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.city}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_country':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.country}`}
                name={type} variant="outlined" />

            break;

        case 'billing_address_complement':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${t.forms.complement}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_postal_code':
            input = <MaskedInput
                errorMessage={error}
                disabled={formikprops.values.disabled_input}
                value={formikprops.values[type]}
                onFocus={handleFocus}
                onChange={(e) => {
                    const value = (
                        e.target.value.toString().match(/\d/g) || []
                    ).join("");
                    getviaCepUrl(value, formikprops, 'shipping_address');
                    formikprops.setFieldValue(`${type}`, value);
                }}
                mask={() => generateMask("99999-999")}
                placeholderChar={"\u2000"}

                autoComplete="postal-code"
                render={(ref, props) => (
                    <TextInputMasked
                        type="tel"
                        label={label || t("^forms.postal_code", "*")}
                        inputRef={ref}
                        {...props}
                    />
                )}
            />

            break;

        case 'shipping_address_postal_code_fr':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                label={label || t("^forms.postal_code", "*")}
                autoComplete="number"
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_street1':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t("^forms.street", "")}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_street2':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t("^forms.street", "", "ligne 2")}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_number':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                autoComplete="number"
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.street_number}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_state':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.state}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_district':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.district}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_city':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.city}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_country':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.country}`}
                name={type} variant="outlined" />

            break;

        case 'shipping_address_complement':
            input = <TextField fullWidth
                key={`input-${type}`}
                InputLabelProps={{ shrink: Boolean(formikprops.values[type]) }}
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${required && "*"}${t.forms.complement}`}
                name={type} variant="outlined" />

            break;

        case 'cvv':
            input = <MaskedInput
                errorMessage={error}
                autoComplete="cc-csc"
                onBlur={formikprops.handleBlur}
                name={type}
                value={
                    formikprops.values[type]
                }
                onFocus={handleFocus}
                onChange={formikprops.handleChange}
                mask={() => {
                    return maskType("CVV", formikprops.values.cc_brand);
                }}
                placeholderChar={"\u2000"}
                render={(ref, props) => (
                    <TextInputMasked
                        id="form-input-section"
                        type="tel"
                        pattern="\d*"
                        label={label || t.forms.cvv}
                        inputRef={ref}
                        {...props}
                    />
                )}
            />

            break;

        case 'cc_number':
            input = <MaskedInput
                name="cnumeric"
                type="text"
                // onFocus={handleFocus}
                onBlur={(e) => {
                    formikprops.handleBlur(e)
                    handleBrand(
                        formikprops.values[type],
                        formikprops
                    )
                }
                }
                errorMessage={error}
                value={formikprops.values[type]}
                onChange={(e) => {
                    const number = (
                        e.target.value.match(/\d/g) || []
                    ).join("");
                    formikprops.setFieldValue(`cc_number`, number);
                }}
                mask={() =>
                    maskType(
                        "CARD",
                        formikprops.values.brand
                    )
                }
                placeholderChar={"\u2000"}
                render={(ref, props) => (
                    <TextInputMasked
                        label={label || t.forms.card_number}
                        autoComplete="cc-number"
                        inputRef={ref}
                        pattern="\d*"
                        {...props}
                    />
                )}
            />

            break;

        case 'cc_expiry_date':
            input = <MaskedInput
                name="cnumeric"
                type="text"
                // onFocus={handleFocus}
                onBlur={(e) => {
                    formikprops.handleBlur(e)
                }
                }
                errorMessage={error}
                value={formikprops.values[type]}
                onChange={(e) => {
                    const number = (
                        e.target.value)
                    formikprops.setFieldValue(`cc_expiry_date`, number);
                }}
                placeholder="MM/YY"
                mask={() =>
                    generateMask('99/99')
                }
                placeholderChar={"\u2000"}
                render={(ref, props) => (
                    <TextInputMasked
                        label={label || t.forms.expiry_date}
                        autoComplete="cc-exp"
                        inputRef={ref}
                        {...props}
                    />
                )}
            />

            break;

        case 'cc_cardholder':
            input = <TextField fullWidth
                key={`input-${type}`}
                autoComplete="cc-name"
                error={error}
                onBlur={formikprops.handleBlur}
                onChange={formikprops.handleChange}
                value={formikprops.values[type]}
                label={label || `${t.forms.customer_name}`}
                name={type} variant="outlined" />
            break;

        case 'coupon':
            input = <TextField fullWidth variant="outlined" label="Código do cupom"></TextField>

            break;

        default:
            input = null
            break;
    }
    return input
}

export default RenderInputsV4