// ── Variables globales ──
let toastTimer;

// ── Toast notifications ──
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  
  if (!toast || !toastMsg) return;
  
  toastMsg.textContent = msg;
  toast.classList.add('show');
  
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// ── Copiar enlace al portapapeles ──
function copyLink(relativePath) {
  // Construir URL absoluta basada en la ubicación actual
  const baseUrl = window.location.href.replace(/\/[^\/]*$/, '');
  const fullUrl = baseUrl + '/' + relativePath;
  
  navigator.clipboard.writeText(fullUrl).then(() => {
    showToast('Link copied to clipboard!');
  }).catch(() => {
    showToast('Error al copiar el enlace');
  });
}

// ── Descargar Brand Kit completo ──
function downloadAll() {
  showToast('Brand Kit download started…');
  
  const links = [
    { url: 'assets/04e314e22bd2fb2483aa007217252ea4.c7058145.png', name: 'standx-icon.png' },
    { url: 'assets/46dc582583038bb4922bfaa38e83cc53.c27c6512.png', name: 'standx-logo-dark.png' },
    { url: 'assets/14e9d9da6011084dc96155a3b6aa4631.46b78fed.png', name: 'standx-logo-light.png' },
    { url: 'assets/c3abfea85ab2c5ef252db2a419b7b2fc.943f4d96.png', name: 'stander-stand.png' },
    { url: 'assets/80cca16152f73e151fb11ef6e685461d.beab5512.png', name: 'stander-growing.png' },
    { url: 'assets/b37edda9020b167c0eeacea358181a8b.b5cddec7.png', name: 'stander-excited.png' },
    { url: 'assets/12ee067dfa655ddfb767f735bc49ba6d.e26725c7.png', name: 'stander-curious.png' },
    { url: 'assets/853b900b3676297fbc7f3c91b7ce9f35.4d5e7d57.png', name: 'stander-happy.png' },
    { url: 'assets/2bf229425bed4b7fb2c1f341e6b4dc2f.b919c990.png', name: 'stander-chill.png' },
    { url: 'assets/0d67390d81eb47de94e93d51d67a3f99.963a4324.png', name: 'stander-wave.png' },
  ];
  
  links.forEach((item, i) => {
    setTimeout(() => {
      fetch(item.url)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = item.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        })
        .catch(() => {
          // Fallback: intentar descarga directa
          const a = document.createElement('a');
          a.href = item.url;
          a.download = item.name;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
    }, i * 300);
  });
}
