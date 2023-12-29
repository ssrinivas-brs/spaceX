function previousBack() {
    window.history.forward();
  }
  setTimeout(previousBack, 0)
  window.onunload=function(){null}