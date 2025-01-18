import { Request, Response } from 'express';
import pool from '../config/database';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content } = req.body;
    await pool.execute(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [req.user.id, receiverId, content]
    );
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const [messages] = await pool.execute(
      'SELECT * FROM messages WHERE receiver_id = ? OR sender_id = ?',
      [req.user.id, req.user.id]
    );
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};