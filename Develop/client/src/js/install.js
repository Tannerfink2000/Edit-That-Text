const butInstall = document.getElementById('buttonInstall');

// Event handler for 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  butInstall.style.display = 'block';
});

// Click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Hide our user interface that shows our Install button
  butInstall.style.display = 'none';
  // Show the prompt
  window.deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  window.deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    window.deferredPrompt = null;
  });
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (evt) => {
  console.log('App was successfully installed!', evt);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});
