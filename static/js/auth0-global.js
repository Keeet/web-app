function hideForm() {
  document.getElementById('form').classList.add('hidden')
  return new Promise(function (resolve) {
    window.setTimeout(resolve, 400);
  });
}

function showForm() {
  document.getElementById('form').classList.remove('hidden')
}

function showLoading() {
  document.getElementById('loading').classList.remove('hidden')
  hideForm()
}

function hideLoading() {
  document.getElementById('loading').classList.add('hidden')
  window.setTimeout(function () {
    showForm()
  }, 400);
}

var errorTimeout = null

function showError(message) {
  showMessage(message, true)
}

function showMessage(message, error = false) {
  if (error) {
    document.getElementById('message').classList.add('error');
  } else {
    document.getElementById('message').classList.remove('error');
  }
  document.getElementById('message').classList.add('active');
  document.getElementById('message-text').innerHTML = message;
  if (errorTimeout) {
    clearTimeout(errorTimeout)
  }
  errorTimeout = setTimeout(function () {
    hideMessage()
  }, 10000)
}

function hideMessage() {
  document.getElementById('message').classList.remove('active');
}
