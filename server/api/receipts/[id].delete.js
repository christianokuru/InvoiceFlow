export default defineEventHandler(async (event) => {
  // TODO: Implement delete receipt logic
  const id = getRouterParam(event, 'id')
  return { success: false, message: 'Delete receipt endpoint not implemented yet', id }
})