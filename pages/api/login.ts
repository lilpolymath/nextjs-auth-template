// Login route with fake authentication:

type Data = {
  email: string;
  message: string;
};

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Retrieve user data from localStorage based on the email
    const userData = JSON.parse(localStorage.getItem(email as string));

    // Check if user exists and password matches
    if (userData && userData.password === password) {
      // Set user session or generate a token for authentication

      // Return success response
      return res.status(200).json({ message: 'Login successful' });
    } else {
      // Return error response
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } else {
    // Return error response for unsupported HTTP methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
