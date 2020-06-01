import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/login')
    },
    {
      path: '/main',
      name: 'Header',
      component: () => import('@/components/header'),
      children: [{
        path: '/main/admin/index',
        name: 'AdminIndex',
        component: () => import('@/components/admin')
      }, {
        path: '/main/admin/room',
        name: 'AdminRoom',
        component: () => import('@/components/admin/room')
      }, {
        path: '/main/cleaner/index',
        name: 'CleanerIndex',
        component: () => import('@/components/cleaner')
      }, {
        path: '/main/front/index',
        name: 'FrontIndex',
        component: () => import('@/components/front')
      }, {
        path: '/main/front/money',
        name: 'FrontMoney',
        component: () => import('@/components/front/money')
      }, {
        path: '/main/logistics/index',
        name: 'LogisticsIndex',
        component: () => import('@/components/logistics')
      }, {
        path: '/main/manager/index',
        name: 'ManagerIndex',
        component: () => import('@/components/manager')
      }, {
        path: '/main/manager/payment',
        name: 'ManagerPayment',
        component: () => import('@/components/manager/payment')
      }, {
        path: '/main/manager/income',
        name: 'ManagerIncome',
        component: () => import('@/components/manager/income')
      }, {
        path: '/main/manager/pay',
        name: 'ManagerPay',
        component: () => import('@/components/manager/pay')
      }, {
        path: '/main/manager/situation',
        name: 'ManagerSituation',
        component: () => import('@/components/manager/situation')
      }, {
        path: '/main/manager/live',
        name: 'ManagerLive',
        component: () => import('@/components/manager/live')
      }, {
        path: '/main/manager/demand',
        name: 'ManagerDemand',
        component: () => import('@/components/manager/payment')
      }, {
        path: '/main/manager/dayperiod',
        name: 'ManagerDayPeriod',
        component: () => import('@/components/manager/livePeriod')
      }, {
        path: '/main/manager/card',
        name: 'ManagerCard',
        component: () => import('@/components/manager/card')
      }, {
        path: '/main/customer/index',
        name: 'CustomerIndex',
        component: () => import('@/components/customer')
      }, {
        path: '/main/customer/situation',
        name: 'CustomerSituation',
        component: () => import('@/components/customer/situation')
      }, {
        path: '/main/customer/demand',
        name: 'CustomerAddDemand',
        component: () => import('@/components/customer/addDemand')
      }, {
        path: '/main/customer/look',
        name: 'CustomerLook',
        component: () => import('@/components/customer/lookForward')
      }, {
        path: '/main/waiter/index',
        name: 'WaiterIndex',
        component: () => import('@/components/waiter')
      }]
    },
  ]
})

export default router
