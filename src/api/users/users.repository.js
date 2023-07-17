import userModel from './users.model.js';

export async function getAll() {
  const users = await userModel
    .find({
      deleted: false,
      confirmed: true,
    })
    .lean();

  return users;
}

export async function getById({ id }) {
  const user = await userModel
    .findById(id)
    .lean();

  return user;
}

export async function create({
  username, password, phone, mail, rol,
}) {
  const newUser = await userModel.create({
    username, password, phone, mail, rol,
  });
  return newUser;
}

export async function getByEmail({ mail }) {
  const user = await userModel
    .findOne({ mail });
  return user;
}

export async function patchId({ id, newProps }) {
  const query = { _id: id };
  const updatedUser = await userModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedUser;
}

export async function updateByEmail({ email, hashedPassword }) {
  const query = { mail: email };
  const newProps = { password: hashedPassword };
  const updatedUser = await userModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedUser;
}

export async function getByUsername({ username }) {
  const user = await userModel
    .findOne({ username })
    .lean();
  return user;
}

export async function confirm({ username }) {
  const userConfirmed = await userModel.updateOne(
    { username },
    {
      confirmed: true,
    },
  );
  return userConfirmed;
}
