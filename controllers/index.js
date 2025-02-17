export const getExample = (request, h) => {
  return h.response({ message: 'Hello from the controller!' }).code(200);
};

export const postExample = (request, h) => {
  const payload = request.payload;
  return h.response({ message: 'Data received', data: payload }).code(201);
};
