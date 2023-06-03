import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get the user email from the request query parameter or session/token
    const userEmail = req.query.email || 'example@example.com';

    // Retrieve user data from localStorage based on the email
    const userData = JSON.parse(localStorage.getItem(userEmail));

    // Check if user exists
    if (userData) {
      // Return user profile data
      return res.status(200).json(userData);
    } else {
      // Return error response if user does not exist
      return res.status(404).json({ error: 'User not found' });
    }
  } else {
    // Return error response for unsupported HTTP methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
