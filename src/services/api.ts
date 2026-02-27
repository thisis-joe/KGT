// Safely access environment variables with a fallback
const getApiBaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_BASE_URL || '/api';
  }
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  senderEmail?: string;
  phone?: string;
  subject: string;
  message: string;
}

const getErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    if (data && typeof data.message === 'string' && data.message.trim().length > 0) {
      return data.message;
    }
  } catch {
    // no-op
  }

  try {
    const errorText = await response.text();
    if (errorText.trim().length > 0) {
      return errorText;
    }
  } catch {
    // no-op
  }

  return response.statusText;
};

export const api = {
  contact: {
    submit: async (data: ContactFormData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorMessage = await getErrorMessage(response);
          throw new Error(`Failed to submit contact form (${response.status}): ${errorMessage}`);
        }

        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
  },
  // Add other API services here as Phase 2 progresses
};
