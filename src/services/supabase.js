import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ============================================
// SUBMISSIONS API
// ============================================

/**
 * Submit a new form submission to Supabase
 * Works for: contact, donation, partnership, volunteer, consultation
 *
 * @param {Object} formData - The raw form data from the frontend
 * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
 */
export const submitForm = async (formData) => {
  try {
    // ============================================
    // STEP 1: Build the payload
    // ============================================
    const payload = {
      // Required fields
      type: formData.type,
      name: formData.name,
      email: formData.email,

      // Optional contact fields
      phone: formData.phone || null,
      country: formData.country || null,
      subject: formData.subject || null,

      // Donation-specific fields
      category: formData.category || null,
      currency: formData.currency || null,
      amount: formData.amount ? parseFloat(formData.amount) : null,

      // Partnership-specific
      organization: formData.organization || null,

      // Main message
      message: formData.message || null,

      // Extra fields
      metadata: formData.metadata || {},
    };

    // ============================================
    // STEP 2: Debug log (remove in production)
    // ============================================
    console.log('📤 Payload being sent to Supabase:', JSON.stringify(payload, null, 2));

    // ============================================
    // STEP 3: Insert into Supabase
    // ============================================
    // We do NOT call .select() — the public form doesn't need
    // to see the inserted row back. This is simpler, faster,
    // and doesn't require a SELECT policy for anon users.
    // ============================================
    const { error } = await supabase
      .from('submissions')
      .insert(payload);

    // ============================================
    // STEP 4: Handle errors
    // ============================================
    if (error) {
      console.error('❌ Supabase insert failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      throw error;
    }

    // ============================================
    // STEP 5: Success
    // ============================================
    console.log('✅ Submission saved successfully');
    return {
      success: true,
      message: 'Your submission was received successfully.',
    };

  } catch (error) {
    console.error('Supabase submission error:', error);
    return {
      success: false,
      message: error.message || 'Failed to submit form. Please try again.',
    };
  }
};

/**
 * Get all submissions (admin only)
 */
export const getSubmissions = async (filters = {}) => {
  try {
    let query = supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,message.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return { success: false, message: error.message, data: [] };
  }
};

/**
 * Update submission status (admin only)
 */
export const updateSubmissionStatus = async (id, status, adminNotes = null) => {
  try {
    const updates = { status };
    if (adminNotes !== null) updates.admin_notes = adminNotes;

    const { data, error } = await supabase
      .from('submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating submission:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Delete submission (admin only)
 */
export const deleteSubmission = async (id) => {
  try {
    const { error } = await supabase
      .from('submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting submission:', error);
    return { success: false, message: error.message };
  }
};

/**
 * Get submission statistics (admin only)
 */
export const getStats = async () => {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('type, status');

    if (error) throw error;

    const stats = {
      total: data.length,
      byType: {},
      byStatus: { New: 0, 'In Progress': 0, Resolved: 0, Archived: 0 },
    };

    data.forEach((item) => {
      stats.byType[item.type] = (stats.byType[item.type] || 0) + 1;
      stats.byStatus[item.status] = (stats.byStatus[item.status] || 0) + 1;
    });

    return { success: true, data: stats };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return { success: false, message: error.message, data: null };
  }
};