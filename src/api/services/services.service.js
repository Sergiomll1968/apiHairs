import * as servicesRepo from './services.repository.js';

export async function getAll() {
  const services = await servicesRepo.getAll();
  return services;
}

export async function create({ serviceData }) {
  const services = await servicesRepo.create({ serviceData });
  return services;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await servicesRepo.update({ id, propsToUpdate });
  return updatedProps;
}

export async function archive({ id }) {
  const serviceToArchive = await servicesRepo.archive({ id });
  return serviceToArchive;
}
