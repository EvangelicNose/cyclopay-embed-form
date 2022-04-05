const hexToRGBA = (hex, opacity = 1) => {
    return 'rgba('
      + parseInt('0x'+hex.substring(1,3)) + ', '
      + parseInt('0x'+hex.substring(3,5)) + ', '
      + parseInt('0x'+hex.substring(5,7)) + ', '
      + `${opacity})`
  }

export default hexToRGBA