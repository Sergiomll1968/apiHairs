import * as awardsRepo from './awards.repository.js';

export async function getAll() {
  const awards = await awardsRepo.getAll();
  return awards;
}

export async function create({ awardData }) {
  const awards = await awardsRepo.create({ awardData });
  return awards;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await awardsRepo.update({ id, propsToUpdate });
  return updatedProps;
}

export async function archive({ id }) {
  const awardToArchive = await awardsRepo.archive({ id });
  return awardToArchive;
}
