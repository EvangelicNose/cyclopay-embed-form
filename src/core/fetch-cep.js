const getViaCEPURL = cep => `https://viacep.com.br/ws/${cep}/json`

/**
 * 
 * @param {string} cep 
 * @returns {Veripag.Responses.ViaCEP}
 */
const fetchCEP = cep =>
    /^\d{8}$/.exec(cep) &&
    fetch(getViaCEPURL(cep))
        .then(r => r.json())

export default fetchCEP