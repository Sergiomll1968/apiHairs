import * as authService from './auth.service.js';
import * as usersRepository from '../users/users.repository.js';

function isValidEmail(mail) {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(mail)) {
    return true;
  }
  return false;
}

export async function register(req, res) {
  const {
    username, password, mail,
  } = req.body;

  let token;

  if (!username || !password || !mail) {
    const resobj = { ok: false, statusText: 'Empty required params' };
    res.json(resobj);
    return;
  }

  if (!isValidEmail(mail)) {
    const resobj = { ok: false, statusText: 'Invalid email' };
    res.json(resobj);
    return;
  }

  const userExists = await usersRepository.getByEmail({ mail });

  if (userExists) {
    const resobj = { ok: false, statusText: 'Email exists' };
    res.json(resobj);
    return;
  }

  try {
    token = await authService.register({
      username, password, mail, rol: 'client',
    });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json(token);
}

export async function login(req, res) {
  const { username, password } = req.body;
  let token;

  if (!username || !password) {
    res.status(400);
    res.json('Empty required params');
    return;
  }

  try {
    token = await authService.login({ username, password });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json({ token });
}

export async function confirm(req, res) {
  const { emailtoken } = req.params;
  await authService.confirm({ emailtoken });
  res.json('Usuario Confirmado HTML');
}
