import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Examples from './views/Examples.vue'
import Test from './views/Test.vue'

Vue.use(Router)

const scrollBehavior = function(to, from, savedPosition) {
  // if (savedPosition) {
  //   return savedPosition
  // } else {
    return { x: 0, y: 0 }
  //}
}

import myList from './components/List.vue'
const example_list = myList.data().list
const ex_path = './views/examples/'

const ex_route_path = (function(){
  return example_list.map(l=>{
    return {
      path: l.path,
      component: ()=> import(`${ex_path}Ex-${l.path}.vue`)
    }
  })
}())
//redirect
ex_route_path.unshift({
  path: '',
  name: 'eptExample',
  beforeEnter: (to, from, next) => {
    if(to.name==='eptExample') next({path:'/examples/quick-start'})
  },
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/basic',
      name: 'basic',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Basic.vue')
    },
    {
      path:'/fixed',
      name:'fixed',
      component: () => import('./views/Fixed.vue')
    },
    {
      path:'/examples',
      component: Examples,
      children: ex_route_path
    },
    {
      path:'/test',
      name:'test',
      component: Test
    },
  ],
  scrollBehavior,
})
