export function determineFixedOrAbsolute(fixedRefElem, movingElem, wrapperElem, offsetTop = 0, offsetBottom = 0) {
  const RESULT = {
    ABSOLUTE_TOP: 'ABSOLUTE_TOP',
    ABSOLUTE_BOTTOM: 'ABSOLUTE_BOTTOM',
    FIXED: 'FIXED'
  }

  if (wrapperElem.offsetTop + wrapperElem.offsetHeight - window.scrollY < fixedRefElem.offsetTop + movingElem.offsetHeight + offsetBottom) {
    return RESULT.ABSOLUTE_BOTTOM
  } else if (wrapperElem.offsetTop - window.scrollY > fixedRefElem.offsetTop + offsetTop) {
    return RESULT.ABSOLUTE_TOP
  } else {
    return RESULT.FIXED
  }
}
