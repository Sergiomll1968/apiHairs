import servicesModel from './services.model.js';

export async function getAll() {
  const services = await servicesModel
    .find({ deleted: false })
    .lean();
  return services;
}
export async function create({ serviceData }) {
  const newService = await servicesModel
    .create(serviceData);
  return newService;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await servicesModel
    .findByIdAndUpdate({ _id: id }, propsToUpdate, { new: true });
  return updatedProps;
}

export async function archive({ id }) {
  const serviceToArchive = await servicesModel
    .findByIdAndUpdate(id, { deleted: true });
  return serviceToArchive;
}
