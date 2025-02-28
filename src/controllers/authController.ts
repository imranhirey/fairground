import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const getHome = (req: Request, res: Response) => {
     //@ts-ignore
  res.render('home', { user: req.session?.user });
};

export const getLogin = (req: Request, res: Response) => {
  res.render('login');
};

export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    //@ts-ignore
    req.session.user = { _id: user._id.toString(), username: user.username };
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
};

export const getRegister = (req: Request, res: Response) => {
  res.render('register');
};
 

// for quick prototyping only -> this should be in separate file for speartion of concerns
export const getDocs = (req: Request, res: Response) => {
    res.render('/docs');
  };
  



export const postRegister = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.render('register', { error: 'Username already exists. Please choose a different username.' });
      }
  
      // Create a new user
      const user = new User({ username, password });
      await user.save();
      res.redirect('/login');
    } catch (error) {
        //@ts-ignore
      if (error.code === 11000) { // MongoDB duplicate key error code
        return res.render('register', { error: 'Username already exists. Please choose a different username.' });
      }
      console.error('Registration error:', error);
      res.status(500).render('register', { error: 'An error occurred during registration. Please try again.' });
    }
  };

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};