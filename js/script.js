document.addEventListener('DOMContentLoaded', function () {
  var ribbon = document.querySelector('.corner-ribbon')
  if (!ribbon) return

  function isRibbonHidden() {
    var match = document.cookie.split('; ').find(function (c) {
      return c.startsWith('ribbon_hidden_at=')
    })
    if (!match) return false
    var ts = parseInt(match.split('=')[1], 10)
    return Date.now() - ts < 15 * 60 * 1000
  }

  if (isRibbonHidden()) {
    ribbon.style.display = 'none'
    return
  }

  ribbon.style.cursor = 'pointer'
  ribbon.addEventListener('click', function () {
    document.cookie = 'ribbon_hidden_at=' + Date.now() + '; path=/; domain=stackdb.org; max-age=3600'
    ribbon.style.display = 'none'
  })
})
