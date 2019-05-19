import AOS from 'aos'

export default ({ app }) => {
  // eslint-disable-next-line new-cap
  app.AOS = new AOS.init({
    disable: 'phone'
  })
}
