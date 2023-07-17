import * as servicesService from './services.service.js';

export async function getAll(req, res) {
  const services = await servicesService.getAll();
  res.json(services);
}

export async function create(req, res) {
  const serviceData = req.body;
  const services = await servicesService.create({ serviceData });
  res.json(services);
}

export async function update(req, res) {
  const { id } = req.params;
  const propsToUpdate = req.body;
  const updatedProps = await servicesService.update({ id, propsToUpdate });
  res.json(updatedProps);
}

export async function archive(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    res.json('Empty required params');
  }
  const serviceToArchive = await servicesService.archive({ id });
  res.json(serviceToArchive);
}
