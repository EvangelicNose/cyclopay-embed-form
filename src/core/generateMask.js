const generateMask = (mask) =>
	mask.split('').map((c) => (c === '9' ? /\d/ : c === ' ' ? '\u2002' : c === '?' ? /\d?/ : c))

export default generateMask
