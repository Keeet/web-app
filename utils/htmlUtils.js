export function decodeHTML(str) {
  const textArea = document.createElement('textarea')
  textArea.innerHTML = str
  return textArea.value
}
