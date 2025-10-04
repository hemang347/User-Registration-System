// helper
function showMessage(elemId, msg, isError=true) {
  const el = document.getElementById(elemId);
  el.innerText = msg;
  el.style.color = isError ? 'red' : 'green';
}

// Register form submit
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!name) return showMessage('regMsg', 'Name is required');
  if (!/^\S+@\S+\.\S+$/.test(email)) return showMessage('regMsg', 'Enter a valid email');
  if (password.length < 6) return showMessage('regMsg', 'Password must be at least 6 chars');

  const payload = { name, email, password };
  try {
    const res = await fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.status === 201) {
      showMessage('regMsg', 'Registered successfully', false);
      setTimeout(() => window.location.href = 'login.html', 1200);
    } else {
      // show server error (could be field-level map or message)
      showMessage('regMsg', data.message || JSON.stringify(data.errors || data));
    }
  } catch (err) {
    showMessage('regMsg', 'Network error');
  }
});

// Login form submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!/^\S+@\S+\.\S+$/.test(email)) return showMessage('loginMsg', 'Enter a valid email');
  if (!password) return showMessage('loginMsg', 'Enter password');

  try {
    const res = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    const data = await res.json();
    if (res.status === 200) {
      // store minimal user info in localStorage for dashboard
      localStorage.setItem('user', JSON.stringify({id: data.id, name: data.name, email: data.email}));
      window.location.href = 'dashboard.html';
    } else {
      showMessage('loginMsg', data.message || JSON.stringify(data.errors || data));
    }
  } catch (err) {
    showMessage('loginMsg', 'Network error');
  }
});
