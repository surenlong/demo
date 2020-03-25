/*
* 接收actions传递的方法数据，对state中的数据直接更新
* */
import {
        EXIT_LOGIN,
        SET_USER,
        WHO_LOGIN,
        RE_LOGIN
    } from './mutation-types'

export default {
    [EXIT_LOGIN] (state,{lookLogin}){
        state.lookLogin = lookLogin;
    },

    [SET_USER] (state,{newData}){
        state.user = newData;
    },

    [WHO_LOGIN] (state,{loginType}){
        state.loginType = loginType;
    },

    [RE_LOGIN] (state,{relogin}){
        state.relogin = relogin;
    }
}
