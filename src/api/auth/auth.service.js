import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import nodemailer from 'nodemailer';
import * as usersRepository from '../users/users.repository.js';

function getToken({ username }) {
  const payload = {
    username,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
}

export async function register({
  username, password, mail, rol,
}) {
  let token;
  try {
    const hashedPassword = hashSync(password, 10);
    const dbUser = await usersRepository.create({
      username, password: hashedPassword, mail, rol,
    });
    if (!dbUser) {
      const myError = {
        status: 500,
        message: 'Some problem creating the user',
      };

      throw new Error(JSON.stringify(myError));
    }

    const emailToken = getToken({ username });
    if (!emailToken) {
      const myError = {
        status: 500,
        message: 'Some problem generating token',
      };

      throw new Error(JSON.stringify(myError));
    }
    token = emailToken;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const url = process.env.HOST + process.env.CONFIRM_ROUTE + emailToken;
    await transporter.sendMail({
      from: '"FullStack PartTime" <correothebridge01@gmail.com>',
      to: mail,
      subject: 'Confirma tu registro huevón',
      html: `<img src="https://static.vecteezy.com/system/resources/previews/000/599/237/large_2x/hair-and-face-salon-logo-vector-templates.jpg" width="250px">
      <h3>Bienvenido, estás a un paso de registrarte🚶</h3>
    <h2><a href="${url}">👉 Click aqui para confirmar tu registro 👈</a></h2>
    `,
    });
    console.log(`Usuario registrado con éxito. Valida tu usuario en el enlace recibido en ${mail}`, dbUser);
  } catch (error) {
    console.error('error', error);
  }
  return token;
}

export async function confirm({ emailtoken }) {
  try {
    const tokenConfirmedEmail = emailtoken;
    let username;
    jwt.verify(tokenConfirmedEmail, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        console.error(err.message);
      } else {
        username = payload.username;
      }
    });
    await usersRepository.confirm({ username });
  } catch (error) {
    console.error(error);
  }
}

export async function login({ username, password }) {
  const dbUser = await usersRepository.getByUsername({ username });
  if (!dbUser) {
    const myError = {
      status: 401,
      message: 'Wrong credentials',
    };
    throw new Error(JSON.stringify(myError));
  }

  const isSamePassword = compareSync(password, dbUser.password);
  if (!isSamePassword) {
    const myError = { ok: false, statusText: 'Wrong credentials password', status: 401 };
    throw new Error(JSON.stringify(myError));
  }

  if (!dbUser.confirmed) {
    const myError = {
      status: 401,
      message: 'User not confirmed',
    };

    throw new Error(JSON.stringify(myError));
  }

  const token = getToken({ username: dbUser.username });
  if (!token) {
    const myError = {
      status: 500,
      message: 'Some problem generating token',
    };

    throw new Error(JSON.stringify(myError));
  }

  return token;
}
