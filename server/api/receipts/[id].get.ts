export default defineEventHandler(async (event) => {
  // TODO: Implement get single receipt logic
  const id = getRouterParam(event, 'id')
  return { success: false, message: 'Get receipt endpoint not implemented yet', id }
})