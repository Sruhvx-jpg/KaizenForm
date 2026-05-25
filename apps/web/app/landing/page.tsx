import { cookies } from 'next/headers';
import LandingPageComponent from './landingPage';

export default async function LandingPage() {
  const cookieStore = await cookies();
  
  // Check for both accessToken and refreshToken
  const hasAccessToken = cookieStore.has('accessToken');
  console.log(hasAccessToken)
  const hasRefreshToken = cookieStore.has('refreshToken');
  const isAuthenticated = hasAccessToken && hasRefreshToken;

  

  return <LandingPageComponent isAuthenticated={isAuthenticated} />;
}
