import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get the email and password from the request body
    const { email, password } = req.body;

    // Check if user already exists in localStorage
    if (localStorage.getItem(email)) {
      // Return error response if user already exists
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user object
    const newUser = {
      email,
      password,
    };

    // Save the new user data in localStorage
    localStorage.setItem(email, JSON.stringify(newUser));

    // Set user session or generate a token for authentication

    // Return success response
    return res.status(201).json({ message: 'Signup successful' });
  } else {
    // Return error response for unsupported HTTP methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
