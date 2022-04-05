/**
 * LTIF - Locale Token Interpolation Function
 * @param {import("../locale/locale").LocaleToken} key
 * @param  {...string} args
 */
export const ltif = (key = "", ...args) => 
	key.replace(/\$(\$|\d+)/g, (_, m) => (m === "$" ? m : args[+m] || ""))