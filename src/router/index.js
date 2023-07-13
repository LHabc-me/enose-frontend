import {createRouter, createWebHashHistory} from 'vue-router'
import routes from '~pages'
import {setupLayouts} from 'virtual:generated-layouts'
import {useUser} from '@/store/modules/user'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes)
  ],
})

router.beforeEach((to, from) => {
  nProgress.start()

  if (to.meta.redirect) {
    return to.meta.redirect
  }

  const user = useUser()
  if (to.meta.requireLogin) {
    if (to.meta.allowGuest && user.type === 'guest') {
      return true
    }
    if (!user.isLogin) {
      return '/user/login'
    }
  }
})

router.afterEach((to, from) => {
  nProgress.done()
})
export default router
