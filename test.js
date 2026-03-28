import { supabase } from './supabase.js'

async function loadStreams() {
  const { data, error } = await supabase
    .from('streams')
    .select('*')
    .eq('status', 'live')

  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById('live-streams')

  container.innerHTML = ''

  data.forEach(stream => {
    const card = `
      <div style="
        background:#111;
        padding:16px;
        border-radius:12px;
        margin-bottom:12px;
      ">
        <h3>${stream.title}</h3>
        <p>${stream.category || ''}</p>
        <span>👁 ${stream.viewer_count} izliyor</span>
      </div>
    `
    container.innerHTML += card
  })
}

loadStreams()
