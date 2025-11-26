// TODO: Implement UI store
export const useUIStore = defineStore('ui', () => {
  // UI state management will be implemented here
  return {
    // Placeholder implementation
    sidebarOpen: true,
    theme: 'light',
    notifications: [],
    loading: false,
    toggleSidebar: () => {},
    setTheme: () => {},
    showNotification: () => {},
    hideNotification: () => {}
  }
})