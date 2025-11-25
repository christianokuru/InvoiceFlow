export default defineEventHandler(async (event) => {
  // TODO: Implement get single invoice logic
  const id = getRouterParam(event, 'id')
  return { success: false, message: 'Get invoice endpoint not implemented yet', id }
})