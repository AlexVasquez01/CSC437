const toggleLabel = document.querySelector('.mode-toggle');

if (toggleLabel) {
  toggleLabel.onchange = (event) => {
    event.stopPropagation();
    const target = event.target;
    const isChecked = target.checked;
    const dmEvent = new CustomEvent('darkmode:toggle', {
      bubbles: true,
      detail: { on: isChecked }
    });

    toggleLabel.dispatchEvent(dmEvent);
  };
}

document.body.addEventListener('darkmode:toggle', (event) => {
  const isOn = event.detail && event.detail.on;
  if (isOn) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});