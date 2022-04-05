export class TranslationContextDecorator {

    withTranslationFunction(t) {
        /** @private */
        this.t = t
        return this
    }

    /**
     * 
     * @param {*} locale 
     */
    applyLocale(locale, fallbackLocale) {

        const t = this.t

        if (!t) {
            throw new Error(`ClientApplicationError: No translation function provided`)
        }

        for (const key in fallbackLocale) {
            if (typeof fallbackLocale[key] === 'object') {
                t[key.replace('^', "")] = locale[key] ?? fallbackLocale[key]
                let temp_t = locale[key] ?? fallbackLocale[key]
                if (Object.keys(temp_t).length < Object.keys(fallbackLocale[key]).length) for (const label in fallbackLocale[key]) {
                    if (!temp_t[label]) temp_t[label] = fallbackLocale[key][label]
                }

            }
        }
    }
}