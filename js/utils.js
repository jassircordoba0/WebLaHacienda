// utils.js — Utilidades compartidas

/**
 * Muestra un toast de notificación no bloqueante.
 * @param {string} mensaje
 * @param {'success'|'error'} tipo
 */
export function showToast(mensaje, tipo = 'success') {
  let toast = document.getElementById('_toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = '_toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = mensaje;
  toast.className = `toast ${tipo}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}
