export default defineNuxtRouteMiddleware((to) => {
  const token = useState('token')
  const cookieToken = useCookie('token')

  // sync cookie → state (สำคัญ)
  if (!token.value && cookieToken.value) {
    token.value = cookieToken.value
  }

  // ยังไม่ login
  if (!token.value) {
    if (to.path === '/login' || to.path === '/register') return
    return navigateTo('/login')
  }

  // login แล้ว ห้ามกลับ login / register
  if (to.path === '/login' || to.path === '/register') {
    return navigateTo('/')
  }
})
