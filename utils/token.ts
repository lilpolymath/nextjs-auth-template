import jwt from 'jsonwebtoken';

// Secret key used for signing and verifying tokens
const secretKey = 'your_secret_key';

export const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    // Verify the refresh token using the secret key
    const decodedToken = jwt.verify(refreshToken, secretKey) as {
      userId: string;
    };

    // Retrieve user data based on the decoded token (e.g., from a database)
    const userId = decodedToken.userId;
    const userData = getUserData(userId);

    if (userData) {
      // Return the user data associated with the refresh token
      return userData;
    } else {
      // Refresh token is valid, but user data not found (e.g., user deleted or session expired)
      return null;
    }
  } catch (error) {
    // Refresh token verification failed (invalid token or expired)
    return null;
  }
};

export const generateToken = (userData: any) => {
  // Generate an access token based on user data
  const accessToken = jwt.sign(userData, secretKey, { expiresIn: '1h' });

  // Return the generated access token
  return accessToken;
};

export const getUserData = (userId: string) => {
  // Retrieve user data from a database or any other data source
  // based on the provided userId
  // Return the user data if found, or null if not found
};
