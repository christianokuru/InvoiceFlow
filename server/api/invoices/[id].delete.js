export default defineEventHandler(async (event) => {
  // TODO: Implement delete invoice logic
  const id = getRouterParam(event, 'id')
  return { success: false, message: 'Delete invoice endpoint not implemented yet', id }
})