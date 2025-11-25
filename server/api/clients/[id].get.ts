export default defineEventHandler(async (event) => {
  // TODO: Implement get single client logic
  const id = getRouterParam(event, 'id')
  return { success: false, message: 'Get client endpoint not implemented yet', id }
})