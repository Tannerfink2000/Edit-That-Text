const butInstall = document.getElementById('buttonInstall');

// Initially disable the install button
butInstall.disabled = true;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;

  // Log when 'beforeinstallprompt' event is fired
  console.log("'beforeinstallprompt' event fired", window.deferredPrompt);

  // Enable the install button only when 'beforeinstallprompt' event is fired
  butInstall.disabled = false;
});

butInstall.addEventListener('click', async () => {
  // Log when the install button is clicked
  console.log("Install button clicked", window.deferredPrompt);

  // Check if deferredPrompt is defined
  if (!window.deferredPrompt) {
    console.log("deferredPrompt is not defined at click");
    return;
  }

  butInstall.disabled = true;
  window.deferredPrompt.prompt();
  
  window.deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    window.deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (evt) => {
  console.log('App was successfully installed!', evt);
  window.deferredPrompt = null;
});
