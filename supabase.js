import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://nxxnhqtqvrkbdhltoijz.supabase.co'
const supabaseKey = 'sb_publishable_YKoXoU5eJNyO7bYBKWh73g_0RDK7bF0'

export const supabase = createClient(supabaseUrl, supabaseKey)
