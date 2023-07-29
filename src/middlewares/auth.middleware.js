import jwt from 'jsonwebtoken';
import * as usersService from '../api/users/users.service.js';

function unauthorized(res) {
  res.status(401);
  res.json('Unauthorized');
}

function middleware(req, res, next) {
  // // Websites to allow
  // res.setHeader('Access-Control-Allow-Origin', '*');

  // // Request methods to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // // Request headers to allow
  // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token, XKey, Authorization');

  // // Request credentials
  // res.setHeader('Access-Control-Allow-Credentials', true);

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
