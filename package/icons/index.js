const singleIconCDN = '//at.alicdn.com/t/font_3163697_1sdqb9mpdgd.css'
const colorsIconCDN = '//at.alicdn.com/t/font_3163694_j7qcxzmx2vd.js'

const el_single = document.createElement('link')
const el_colors = document.createElement('script')

el_single.rel = 'stylesheet'
el_single.href = singleIconCDN
el_colors.src = colorsIconCDN

const head = document.getElementsByTagName('head')[0]
head.appendChild(el_single)
head.appendChild(el_colors)