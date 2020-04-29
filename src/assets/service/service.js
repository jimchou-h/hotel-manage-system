import BaseService from './base-service.js'

const _ADMIN = "/admin"
const _CLEANER = "/cleaner"
const _FRONT = "/front"
const _LOGISTICS = "/logistics"
const _MANAGER = "/manager"
const _CUSTOMER = "/customer"
const _WAITER = "/waiter"

function post(url, request, type) {
  return BaseService.post(url, request, type).then(response => {
    return response
  })
}

// common
const login = (request) => post('/login', request, 'raw')
const logout = (request) => post('/logout', request, 'raw')
const setCard = (request) => post('/setcard', request, 'raw')
const checkCard = (request) => post('/checkcard', request, 'raw')

// admin
const getEmployeeList = (request) => post(_ADMIN + '/employee/list', request, 'raw')
const addEmployee = (request) => post(_ADMIN + '/employee/add', request, 'raw')
const editEmployee = (request) => post(_ADMIN + '/employee/edit', request, 'raw')
const delEmployee = (request) => post(_ADMIN + '/employee/del', request, 'raw')
const getRoomList = (request) => post(_ADMIN + '/room/list', request, 'raw')
const addRoom = (request) => post(_ADMIN + '/room/add', request, 'raw')
const editRoom = (request) => post(_ADMIN + '/room/edit', request, 'raw')
const delRoom = (request) => post(_ADMIN + '/room/del', request, 'raw')
const checkRoomRepeat = (request) => post(_ADMIN + '/room/check', request, 'raw')

// cleaner
const getCleanerList = (request) => post(_CLEANER + '/list', request, 'raw')
const setRoomClean = (request) => post(_CLEANER + '/set', request, 'raw')
const setRoomUnclean = (request) => post(_CLEANER + '/unset', request, 'raw')
const receiveTask = (request) => post(_CLEANER + '/receive', request, 'raw')

// front
const getFrontList = (request) => post(_FRONT + '/room/list', request, 'raw')
const bookFront = (request) => post(_FRONT + '/room/book', request, 'raw')
const unbookRoom = (request) => post(_FRONT + '/room/unbook', request, 'raw')
const liveFront = (request) => post(_FRONT + '/room/live', request, 'raw')
const leaveFront = (request) => post(_FRONT + '/room/leave', request, 'raw')
const saveRoomRecord = (request) => post(_FRONT + '/room/record', request, 'raw')
const getMoneyList = (request) => post(_FRONT + '/money/list', request, 'raw')
const setMoneyIsPay = (request) => post(_FRONT + '/money/pay', request, 'raw')

// logistics
const addPayment = (request) => post(_LOGISTICS + '/payment/add', request, 'raw')
const editPayment = (request) => post(_LOGISTICS + '/payment/edit', request, 'raw')
const setPaymentBuy = (request) => post(_LOGISTICS + '/payment/setbuy', request, 'raw')

// logistics && manager
const getPaymentList = (request) => post(_LOGISTICS + '/payment/list', request, 'raw')

// manager
const setPaymentAllow = (request) => post(_MANAGER + '/payment/allow', request, 'raw')
const setPaymentDisallow = (request) => post(_MANAGER + '/payment/disallow', request, 'raw')
const getReportOneData = (request) => post(_MANAGER + '/report/one', request, 'raw')
const getSituationList = (request) => post(_MANAGER + '/report/two', request, 'raw')
const getLiveCounts = (request) => post(_MANAGER + '/report/three', request, 'raw')
const getDayPeriod = (request) => post(_MANAGER + '/report/dayperiod', request, 'raw')
const getCardList = (request) => post(_MANAGER + '/report/cardlist', request, 'raw')
const getCustomerLiveDetail = (request) => post(_MANAGER + '/report/three/detail', request, 'raw')

// customer
const saveSituation = (request) => post(_CUSTOMER + '/situation', request, 'raw')
const handleDemand = (request) => post(_CUSTOMER + '/demand', request, 'raw')

// waiter
const getDemandList = (request) => post(_WAITER + '/demand/list', request, 'raw')
const setDemandFinish = (request) => post(_WAITER + '/demand/finish', request, 'raw')
const setDemandUnfinish = (request) => post(_WAITER + '/demand/unfinish', request, 'raw')

export default {
  login,
  logout,
  getEmployeeList,
  addEmployee,
  editEmployee,
  delEmployee,
  getRoomList,
  addRoom,
  editRoom,
  delRoom,
  getCleanerList,
  setRoomClean,
  setRoomUnclean,
  getFrontList,
  bookFront,
  unbookRoom,
  liveFront,
  leaveFront,
  saveRoomRecord,
  getMoneyList,
  setMoneyIsPay,
  getPaymentList,
  addPayment,
  editPayment,
  setPaymentBuy,
  setPaymentAllow,
  setPaymentDisallow,
  getReportOneData,
  saveSituation,
  getSituationList,
  handleDemand,
  getDemandList,
  setDemandFinish,
  setDemandUnfinish,
  checkRoomRepeat,
  getLiveCounts,
  getDayPeriod,
  setCard,
  checkCard,
  getCardList,
  getCustomerLiveDetail,
  receiveTask
}
