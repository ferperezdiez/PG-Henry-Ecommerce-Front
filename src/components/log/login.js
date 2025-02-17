import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { url } from "../../constantURL";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import {
  localStorageCartToDB,
  saveUser,
  authenticationCode,
  authenticationByCode
} from "../../Redux/Actions";
import './log.css'

export let token;
export let idUser;

export default function LoginButton() {
  const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently } =
    useAuth0();
  const history = useHistory();
  const dispatch = useDispatch();
  
  useEffect(() => {
      return (async () => {
          if (user) {
              dispatch(saveUser(user));
              try {
                  token = await getAccessTokenSilently();
                  let headers = {
                      authorization: `Bearer ${token}`,
                      email: user.email,
                      userName: user.nickname,
                      name: user.name,
                      hashedPassword: user.sub,
                    };
                  const response = await axios(`${url}/users/login`, { headers });
                  const { id, admin, authenticatedByCode } = response.data;
                  headers.iduser = id
    
                  const cookies = new Cookies();
                  cookies.set("id", id, { path: "/" });
                  cookies.set("admin", admin, { path: "/" });
                  dispatch(authenticationCode(id));
                  dispatch(localStorageCartToDB(id, headers));
                  dispatch(authenticationByCode(authenticatedByCode))  
                } catch (err) {
                    console.error(err);
                }
            }
            // history.push('/home')
        })();
    }, [user, isAuthenticated, history, getAccessTokenSilently, dispatch]);
    
  return (
    !isAuthenticated && (
      <div>
        <button onClick={() => loginWithPopup()} className='inicial-sesion-buton'>Iniciar sesión</button>
      </div>
    )
  );
}
