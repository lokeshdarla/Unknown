import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const navigation = useNavigate();

  const handleGoogleLogin = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid profile email',
      state: new URLSearchParams({
        redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      }).toString(),
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const urlAccessToken = url.searchParams.get('access_token');

    if (urlAccessToken) {
      localStorage.setItem('accessToken', urlAccessToken);
    }

    const accessToken = urlAccessToken || localStorage.getItem('accessToken');
    window.history.replaceState({}, '', `${window.location.origin}/auth`);

    const fetchUserProfile = async () => {
      if (accessToken) {
        try {
          await fetchUserProfileData(accessToken);
          navigation('/login');
        } catch (error) {
          navigation('/login');
        }
      }
    };

    fetchUserProfile();
  }, [navigation]);

  const fetchUserProfileData = async (accessToken) => {
    const profileResponse = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!profileResponse.ok) {
      throw new Error('Failed to fetch user profile');
      navigation('/user')
    }
    return await profileResponse.json();
  };

  return (
    <div>
      <button  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300" onClick={handleGoogleLogin}>Google Login</button>
    </div>
  );
};
