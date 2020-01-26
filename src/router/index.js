import Vue from 'vue'
import Router from 'vue-router'
import components from "./components"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: components.login
    },
    {
      path: '/main',
      name: 'Header',
      component: components.header,
      children: [{
        path: '/main/admin/index',
        name: 'AdminIndex',
        component: components.adminIndex
      }, {
        path: '/main/admin/room',
        name: 'AdminRoom',
        component: components.adminRoom
      }, {
        path: '/main/cleaner/index',
        name: 'CleanerIndex',
        component: components.cleanerIndex
      }, {
        path: '/main/front/index',
        name: 'FrontIndex',
        component: components.frontIndex
      }, {
        path: '/main/front/money',
        name: 'FrontMoney',
        component: components.frontMoney
      }, {
        path: '/main/logistics/index',
        name: 'LogisticsIndex',
        component: components.logisticsIndex
      }, {
        path: '/main/manager/index',
        name: 'ManagerIndex',
        component: components.managerIndex
      }, {
        path: '/main/manager/payment',
        name: 'ManagerPayment',
        component: components.managerPayment
      }, {
        path: '/main/manager/income',
        name: 'ManagerIncome',
        component: components.managerIncome
      }, {
        path: '/main/manager/pay',
        name: 'ManagerPay',
        component: components.managerPay
      }, {
        path: '/main/manager/situation',
        name: 'ManagerSituation',
        component: components.managerSituation
      }, {
        path: '/main/manager/live',
        name: 'ManagerLive',
        component: components.managerLive
      }, {
        path: '/main/manager/demand',
        name: 'ManagerDemand',
        component: components.managerDemand
      }, {
        path: '/main/customer/index',
        name: 'CustomerIndex',
        component: components.customerIndex
      }, {
        path: '/main/customer/demand',
        name: 'CustomerAddDemand',
        component: components.customerAddDemand
      }, {
        path: '/main/customer/look',
        name: 'CustomerLook',
        component: components.customerLook
      }, {
        path: '/main/waiter/index',
        name: 'WaiterIndex',
        component: components.waiterIndex
      }]
    },
  ]
})
