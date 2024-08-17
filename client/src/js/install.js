const butInstall = document.getElementById('buttonInstall');




let deferredPrompt;
// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);

});


// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        butInstall.classList.toggle('hidden', true);
        console.log(`User response to the install prompt: ${outcome}`);
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App was installed successfully');
    console.log('App Installed Event Details:', event);
    butInstall.classList.toggle('hidden', true);


});
