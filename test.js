import { supabase } from './supabase.js'

async function testConnection() {
  const { data, error } = await supabase
    .from('streams')
    .select('*')

  if (error) {
    console.error('Supabase hata:', error)
    return
  }

  console.log('Streams verisi:', data)
}

testConnection()
