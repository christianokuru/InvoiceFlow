export default defineEventHandler(async (event) => {
  // TODO: Implement update invoice logic
  const id = getRouterParam(event, 'id')
  return { success: false, message: 'Update invoice endpoint not implemented yet', id }
})