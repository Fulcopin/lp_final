import { Request, Response } from 'express';
import pool from '../config/database';

export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { minAge, maxAge, location } = req.query;
    const [users] = await pool.execute(
      'SELECT id, username, age, location FROM users WHERE age BETWEEN ? AND ? AND location LIKE ?',
      [minAge || 0, maxAge || 100, `%${location || ''}%`]
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const sendFriendRequest = async (req: Request, res: Response) => {
  try {
    const { friendId } = req.body;
    await pool.execute(
      'INSERT INTO friends (user_id, friend_id) VALUES (?, ?)',
      [req.user.id, friendId]
    );
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
