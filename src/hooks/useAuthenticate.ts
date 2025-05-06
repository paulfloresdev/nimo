export const useIsAuthenticated = () => {
    const token = localStorage.getItem('token')
    const tokenRefresh = localStorage.getItem('token_refresh')
    const isAuthenticated = !!token || !!tokenRefresh
    return { isAuthenticated }
}