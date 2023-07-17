import * as userService from './users.service.js';

export async function getAll(req, res) {
  const users = await userService.getAll();
  res.json(users);
}

export async function getById(req, res) {
  const { id } = req.params;
  const userById = await userService.getById({ id });
  res.json(userById);
}

export async function patchId(req, res) {
  const { id } = req.params;
  const newProps = req.body;
  if (newProps.password) {
    res.startus(401);
    res.json('This property cant be updeted');
  }
  const updatedUser = await userService.patchId({ id, newProps });
  res.json(updatedUser);
}

export async function changePasswordRequest(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    res.json({ message: 'Empty email' });
    return;
  }

  try {
    await userService.changePasswordRequest({ email });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }
  res.status(200);
  res.json(`Email sent to ${email}`);
}

export async function changePassword(req, res) {
  const { token } = req.params;
  const { password, repeatedPassword } = req.body;

  if (!token || !password || !repeatedPassword) {
    res.status(405);
    res.json({ message: 'Authentication failed' });
    return;
  }

  if (password !== repeatedPassword) {
    res.status(405);
    res.json({ message: 'Authentication failed' });
    return;
  }

  let email;
  try {
    email = await userService.changePassword({ token });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  let updatedUser;
  try {
    updatedUser = await userService.updateByEmail({ email, password });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }
  res.json(updatedUser);
}
