// Form validation and interactivity for register form
(function(){
  const form = document.getElementById('registerForm');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const pwdEl = document.getElementById('password');
  const toggle = document.getElementById('togglePwd');
  const msg = document.getElementById('formMessage');
  const strengthBar = document.querySelector('.strength>span');

  function setError(field, text){
    const node = form.querySelector(`.error[data-for="${field}"]`);
    if(node) node.textContent = text || '';
  }

  function validateEmail(v){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function passwordScore(p){
    if(!p) return 0;
    let score = 0;
    if(p.length >= 6) score += 1;
    if(/[A-Z]/.test(p)) score += 1;
    if(/[0-9]/.test(p)) score += 1;
    if(/[^A-Za-z0-9]/.test(p)) score += 1;
    return score; // 0..4
  }

  function updateStrength(pw){
    const s = passwordScore(pw);
    const pct = (s / 4) * 100;
    strengthBar.style.width = pct + '%';
    // change color based on score
    if(s <= 1) strengthBar.style.background = '#ff6b6b';
    else if(s === 2) strengthBar.style.background = '#ffb86b';
    else if(s === 3) strengthBar.style.background = '#6bd26b';
    else strengthBar.style.background = '#28a745';
  }

  toggle.addEventListener('click', function(){
    const type = pwdEl.type === 'password' ? 'text' : 'password';
    pwdEl.type = type;
    toggle.textContent = type === 'text' ? 'Hide' : 'Show';
  });

  pwdEl.addEventListener('input', function(){
    updateStrength(pwdEl.value);
    setError('password','');
  });

  emailEl.addEventListener('input', function(){ setError('email',''); msg.textContent = '' });
  nameEl.addEventListener('input', function(){ setError('name',''); msg.textContent = '' });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    let ok = true;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const pwd = pwdEl.value;

    if(!name){ setError('name','Nama harus diisi'); ok = false; }
    else setError('name','');

    if(!email){ setError('email','Email harus diisi'); ok = false; }
    else if(!validateEmail(email)){ setError('email','Format email tidak valid'); ok = false; }
    else setError('email','');

    if(!pwd){ setError('password','Password harus diisi'); ok = false; }
    else if(pwd.length < 6){ setError('password','Password minimal 6 karakter'); ok = false; }
    else setError('password','');

    if(!ok){ msg.textContent = 'Periksa kembali input yang diberi tanda.'; msg.style.color = '#d9534f'; return; }

    // Simulate success (since no backend). Clear form and show message.
    msg.textContent = 'Pendaftaran berhasil. Terima kasih.';
    msg.style.color = '#28a745';
    form.reset();
    updateStrength('');
    toggle.textContent = 'Show';
  });

  // initial strength reset
  updateStrength('');
})();
