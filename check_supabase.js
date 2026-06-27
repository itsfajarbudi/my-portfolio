const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://pommiyqbrpuboehojryu.supabase.co';
const supabaseKey = 'sb_publishable_g9SRDW_5cJ2-aVeItpMtKw_huzMtgaV';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('now_focus').select('*');
  console.log('Error:', error);
  console.log('Data length:', data ? data.length : null);
  console.log('Data:', JSON.stringify(data, null, 2));
}
check();
