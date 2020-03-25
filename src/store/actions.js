/*
* 处理component的请求函数，传递給mutations处理
*
* */
import {
      EXIT_LOGIN, 
      SET_USER,
      WHO_LOGIN,
      RE_LOGIN
    } from './mutation-types'

export default {
  exit({commit},lookLogin){
    commit(EXIT_LOGIN,{lookLogin})
  },
  setUser({commit},newData){
    commit(SET_USER,{newData})
  },
  whoLogin({commit},loginType){
    commit(WHO_LOGIN,{loginType})
  },
  relogin({commit},relogin){
    commit(RE_LOGIN,{relogin})
  }
}
