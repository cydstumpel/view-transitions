const spans = document.querySelectorAll('.page-header span')
const startAngle = 30 * Math.PI / 180
const angle = 180 * Math.PI / 180 - startAngle * 2
const multiplier = 7



spans.forEach((span, index) => {
  // --i: calc((var(--sibling-index) - 1) / (var(--sibling-count) - 1));
  const i = index / (spans.length - 1)
  console.log(span.innerText, i)

  // --sin-calc: calc((sin(var(--start-angle) + var(--angle) * var(--i)) * -1 - .5) * var(--multiplier));
  const sinCalc = (Math.sin(startAngle + angle * i) * -1 - 0.5) * multiplier
  // console.log(span.innerText, sinCalc)
  // --cos-calc: calc((cos(var(--start-angle) + var(--angle) * var(--i)) * -1) * var(--multiplier));
  const cosCalc = (Math.cos(startAngle + angle * i) * -1) * multiplier
  // console.log(span.innerText, cosCalc)
})
