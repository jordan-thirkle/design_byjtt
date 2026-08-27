const briefForm = document.querySelector('#brief-form');
const briefResult = document.querySelector('#brief-result');
const formStatus = document.querySelector('#form-status');
const copyStatus = document.querySelector('#copy-status');
const fields = {
  product: document.querySelector('#product'),
  audience: document.querySelector('#audience'),
  job: document.querySelector('#job')
};

let currentBrief = null;

function clean(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function setFieldError(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message;
}

function validateBrief() {
  let firstInvalid = null;
  let valid = true;
  for (const field of Object.values(fields)) {
    const value = clean(field.value);
    const message = value ? '' : 'Add a short answer so the direction has something real to work from.';
    setFieldError(field, message);
    if (message && !firstInvalid) firstInvalid = field;
    if (message) valid = false;
  }
  if (firstInvalid) firstInvalid.focus();
  return valid;
}

function makeBuilderBrief(brief) {
  return `I am building ${brief.product} for ${brief.audience}. The most important thing users must be able to do is ${brief.job}. Start by making that job obvious, keep supporting detail close by, and explain missing or uncertain information instead of hiding it.`;
}

briefForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = '';
  copyStatus.textContent = '';
  if (!validateBrief()) {
    formStatus.textContent = 'A couple of answers are still needed.';
    return;
  }

  currentBrief = Object.fromEntries(Object.entries(fields).map(([key, field]) => [key, clean(field.value)]));
  document.querySelector('#result-product').textContent = currentBrief.product;
  document.querySelector('#result-audience').textContent = currentBrief.audience;
  document.querySelector('#result-job').textContent = currentBrief.job;
  briefResult.classList.remove('is-hidden');
  formStatus.textContent = 'Your starting point is ready below.';
  window.requestAnimationFrame(() => briefResult.focus());
});

for (const field of Object.values(fields)) {
  field.addEventListener('input', () => {
    if (field.value.trim()) setFieldError(field, '');
  });
}

document.querySelector('#copy-brief').addEventListener('click', async () => {
  if (!currentBrief) return;
  const text = makeBuilderBrief(currentBrief);
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.textContent = 'Copied. Paste it into the AI builder you use.';
  } catch {
    copyStatus.textContent = text;
  }
});

document.querySelector('#reset-brief').addEventListener('click', () => {
  briefForm.reset();
  for (const field of Object.values(fields)) setFieldError(field, '');
  currentBrief = null;
  briefResult.classList.add('is-hidden');
  formStatus.textContent = '';
  copyStatus.textContent = '';
  document.querySelector('#product').focus();
});

const checkForm = document.querySelector('#check-form');
const checkDescription = document.querySelector('#design-description');
const checkStatus = document.querySelector('#check-status');
const checkResult = document.querySelector('#check-result');

checkForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!clean(checkDescription.value)) {
    checkStatus.textContent = 'Describe the design in a few words first.';
    checkDescription.focus();
    return;
  }
  checkStatus.textContent = 'Your quick check is ready below.';
  checkResult.classList.remove('is-hidden');
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target && target.matches('section')) target.setAttribute('tabindex', '-1');
  });
});
