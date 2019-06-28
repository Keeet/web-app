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

export function scrollIntoView(elem) {
  const scrollOffset = offsetTop(elem) - (window.innerHeight / 2) + (elem.offsetHeight / 2)
  window.scrollTo({ top: scrollOffset, left: 0, behavior: 'smooth' })
}

export function scrollToTopId(ids) {
  const sorted = ids
    .map(id => ({ id, offset: offsetTop(document.getElementById(id)) }))
    .sort((a, b) => a.offset > b.offset ? 1 : -1)
  scrollIntoView(document.getElementById(sorted[0].id))
}

export function offsetTop(elem) {
  Element.prototype.documentOffsetTop = function () {
    return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0)
  }
  return elem.documentOffsetTop()
}

export function offsetLeft(elem) {
  Element.prototype.documentOffsetLeft = function () {
    return this.offsetLeft + (this.offsetParent ? this.offsetParent.documentOffsetLeft() : 0)
  }
  return elem.documentOffsetLeft()
}
