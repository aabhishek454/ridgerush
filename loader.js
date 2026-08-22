(async function(){
  try {
    document.getElementById('loading-status').textContent = 'Loading game engine...';
    const parts = [];
    for (let i = 0; i < 31; i++) {
      const r = await fetch('./b64_' + i + '.txt');
      if (!r.ok) throw new Error('chunk '+i);
      parts.push(await r.text());
      const pct = Math.round(((i+1)/31)*90);
      document.getElementById('load-progress').style.width = pct + '%';
    }
    const bin = atob(parts.join(''));
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const code = new TextDecoder().decode(bytes);
    document.getElementById('load-progress').style.width = '100%';
    document.getElementById('loading-status').textContent = "Let's ride!";
    const s = document.createElement('script');
    s.textContent = code;
    document.body.appendChild(s);
  } catch (e) {
    document.getElementById('loading-status').textContent = 'Load error: ' + e.message;
    console.error(e);
  }
})();
