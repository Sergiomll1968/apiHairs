import awardsModel from './awards.model.js';

export async function getAll() {
  const awards = await awardsModel
    .find({ deleted: false })
    .lean();
  return awards;
}

export async function create({ awardData }) {
  const newAward = await awardsModel
    .create(awardData);
  return newAward;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await awardsModel
    .findByIdAndUpdate({ _id: id }, propsToUpdate, { new: true });
  return updatedProps;
}

export async function archive({ id }) {
  const awardToArchive = await awardsModel
    .findByIdAndUpdate(id, { deleted: true });
  return awardToArchive;
}
