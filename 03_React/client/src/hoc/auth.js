import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function hoc_auth (SpecificComponent, option, adminRoute = null){
    /*
        SpecificComponent : 받은 component (예시는 LandingPage, LoginPage, RegisterPage.jsx 마지막 줄에 사용된 Auth()참고)
        option 
            - null(아무나 출입 가능한 페이지)
            - true(로그인한 유저만 출입 가능한 페이지)
            - false(로그인한 유저는 출입 불가능한 페이지)
        adminRouter : true(admin 유저만 접근 가능하게 함), default 값은 null
    */
    function AuthenticationCheck(){
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response);
                
                // 로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){ // option == true(로그인 해야 들어갈 수 있는 페이지 접근)인 경우
                        navigate('/login'); // 로그인부터 하도록 유도
                    }
                }else{
                    // 로그인 한 상태
                    // admin이 아닌데 admin 페이지에 접속하려 하는 경우
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/'); // 홈으로 이동하게 유도
                    }else{
                        // option == false(로그인 하지 않아야 들어갈 수 있는 페이지 접근)인 경우
                        if(option === false){
                            navigate('/') // 홈으로 이동하게 유도
                        }
                    }
                }
            });
        }, []);

        return(
            <SpecificComponent />
        )
    }
    return AuthenticationCheck;
}