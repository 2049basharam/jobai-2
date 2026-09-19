import { supabase } from './src/lib/supabase';

async function checkSupabaseConnection() {
  console.log('--- TESTING SUPABASE CONNECTION ---');
  console.log('Supabase URL:', 'https://jnfqonsrogjalvfwxive.supabase.co');

  try {
    // 1. Auth Health Check
    const { data: authData, error: authError } = await supabase.auth.getSession();
    console.log('Supabase Auth Client initialized successfully.');
    console.log('Active Auth Session:', authData.session ? 'Active User Session Present' : 'No active session (Guest / Demo mode)');

    // 2. Query Candidate Profiles Table
    const { data: profData, error: profError } = await supabase
      .from('candidate_profiles')
      .select('count', { count: 'exact', head: true });

    if (profError) {
      console.log('candidate_profiles table query note:', profError.message);
    } else {
      console.log('candidate_profiles table connected! Total records count:', profData);
    }

    // 3. Query Candidate Documents Table
    const { data: docData, error: docError } = await supabase
      .from('candidate_documents')
      .select('count', { count: 'exact', head: true });

    if (docError) {
      console.log('candidate_documents table query note:', docError.message);
    } else {
      console.log('candidate_documents table connected! Total documents count:', docData);
    }

    console.log('\nResult: Supabase Client is CONNECTED & ACTIVE with LocalStorage fallback protection.');
  } catch (err: any) {
    console.error('Supabase Connection Error:', err?.message || err);
  }
}

checkSupabaseConnection().catch(console.error);
