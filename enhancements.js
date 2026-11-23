(() => {
  const fileInput=document.getElementById('file');
  const drop=document.querySelector('.drop');
  const cards=document.getElementById('cards');
  const preview=document.getElementById('mediaPreview');
  const video=document.getElementById('videoPreview');
  const audio=document.getElementById('audioPreview');
  const tools=document.getElementById('previewTools');
  const status=document.getElementById('uploadStatus');
  const captionInput=document.getElementById('captionText');
  const overlay=document.getElementById('captionOverlay');
  let objectUrl='';
  let selectedTemplate='';
  function setFile(file){
    if(!file)return;
    if(!file.type.startsWith('video/')&&!file.type.startsWith('audio/')){
      status.textContent='Please choose a video or audio file.';return;
    }
    if(objectUrl)URL.revokeObjectURL(objectUrl);
    objectUrl=URL.createObjectURL(file);
    const isVideo=file.type.startsWith('video/');
    video.style.display=isVideo?'block':'none';
    audio.style.display=isVideo?'none':'block';
    video.pause();audio.pause();video.removeAttribute('src');audio.removeAttribute('src');
    const player=isVideo?video:audio;player.src=objectUrl;player.load();
    preview.classList.add('show');tools.hidden=false;
    document.getElementById('fileInfo').textContent='Selected: '+file.name+' · '+(file.size/1024/1024).toFixed(1)+' MB';
    status.textContent='Preview ready — your file stays in this browser session. No upload performed.';
  }
  fileInput.addEventListener('change',e=>setFile(e.target.files[0]));
  ['dragenter','dragover'].forEach(type=>drop.addEventListener(type,e=>{e.preventDefault();drop.classList.add('dragging');}));
  ['dragleave','drop'].forEach(type=>drop.addEventListener(type,e=>{e.preventDefault();drop.classList.remove('dragging');}));
  drop.addEventListener('drop',e=>setFile(e.dataTransfer.files[0]));
  cards.addEventListener('click',e=>{
    const button=e.target.closest('.template-action');
    if(!button)return;
    selectedTemplate=button.dataset.template;
    cards.querySelectorAll('.card').forEach(card=>{
      const chosen=card.querySelector('.template-action')?.dataset.template===selectedTemplate;
      card.classList.toggle('selected',chosen);
      const action=card.querySelector('.template-action');
      if(action)action.textContent=chosen?'✓ Selected':'Use this style';
    });
    status.textContent='Style selected: '+selectedTemplate+'. Choose a local clip above to preview it.';
    document.getElementById('upload').scrollIntoView({behavior:'smooth',block:'center'});
  });
  captionInput.addEventListener('input',()=>{overlay.textContent=captionInput.value;});
  document.getElementById('captionToggle').addEventListener('click',e=>{
    const visible=overlay.style.display!=='block';
    overlay.style.display=visible?'block':'none';
    e.currentTarget.textContent=visible?'Hide caption':'Show caption';
    overlay.textContent=captionInput.value||'Your words\nin motion';
  });
  document.getElementById('clearFile').addEventListener('click',()=>{
    if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl='';
    video.pause();audio.pause();video.removeAttribute('src');audio.removeAttribute('src');
    preview.classList.remove('show');tools.hidden=true;fileInput.value='';
    document.getElementById('fileInfo').textContent='';overlay.textContent='';
    status.textContent='Local preview cleared.';
  });
  window.addEventListener('pagehide',()=>{if(objectUrl)URL.revokeObjectURL(objectUrl);});
  document.querySelectorAll('.card').forEach(card=>{
    const title=card.querySelector('.info b')?.textContent||'Creative style';
    const button=document.createElement('button');button.type='button';button.className='template-action';
    button.dataset.template=title;button.textContent='Use this style';card.querySelector('.info')?.append(button);
  });
})();