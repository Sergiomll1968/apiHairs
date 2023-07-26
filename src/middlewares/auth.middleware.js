import jwt from 'jsonwebtoken';
import * as usersService from '../api/users/users.service.js';

function unauthorized(res) {
  res.status(401);
  res.json('Unauthorized');
}

function middleware(req, res, next) {
  const publicRoutes = [
    '/login',
    '/register',
    '/users/changepasswordrequest',
    '/users/changepassword',
    '/bookings/day',
    '/services/all',
    '/awards/all',
    '/confirm',
  ];

  const requestUrl = req.url;
  if (!req.url) {
    unauthorized(res);
    console.log('No req.url!');
    return;
  } else {
    console.log(req.url);
  }

  const isPublicRoute = publicRoutes.some((publicRoute) => {
    const includePublicRoute = requestUrl.includes(publicRoute);
    return includePublicRoute;
  });

  if (isPublicRoute) {
    next();
    return;
  }

  const token = req.headers.authorization;

  if (!token) {
    unauthorized(res);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) {
      console.error('ERROR!', error.message);
      return unauthorized(res);
    }

    req.user = await usersService.getByUsername({ username: payload.username });
    return next();
  });
}

export default middleware;
