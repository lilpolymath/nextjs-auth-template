import { generateToken, verifyRefreshToken } from '@/utils/token';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get the refresh token from the request body
    const { refreshToken } = req.body;

    // Verify the refresh token and retrieve associated user data
    const userData = verifyRefreshToken(refreshToken);

    if (userData) {
      // Generate a new access token
      const accessToken = generateToken(userData);

      // Return the new access token
      return res.status(200).json({ accessToken });
    } else {
      // Return error response if refresh token is invalid or expired
      return res
        .status(401)
        .json({ error: 'Invalid or expired refresh token' });
    }
  } else {
    // Return error response for unsupported HTTP methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
