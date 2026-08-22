(async function(){
  const parts = [];
  for (let i = 0; i < 23; i++) {
    const r = await fetch('./b64_' + i + '.txt');
    parts.push(await r.text());
  }
  const bin = atob(parts.join(''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const js = new TextDecoder().decode(bytes);
  const s = document.createElement('script');
  s.textContent = js;
  document.body.appendChild(s);
})();
