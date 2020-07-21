import { actionPromise } from "../../store/store";
import { signUpValidateRepeat } from "../signUpValidate/signUpValidate";

// store.dispatch({
//   type: "PROMISE",
//   name: "login",
//   status: "RESOLVED",
//   payload: "hi",
// });

// store.dispatch({
//   type: "PROMISE",
//   name: "chatList",
//   status: "REJECTED",
//   error: "bye",
// });

function actionRegisterPromise(email, password, login) {
  let promise = getGQL("http://localhost:3330/graphql")(
    `mutation reg($email:String, $password:String, $login:String){
        createUser(email:$email, password:$password, login:$login){ id, email, login } 
      }`,
    { email, password, login }
  );
  return actionPromise("register", promise);
}

function actionRegister(email, password, login) {
  return async (dispatch) => {
    let user = await dispatch(actionRegisterPromise(email, password, login));
    if (user.data.createUser !== null) {
      window.location.assign("/sign_in");
    } else signUpValidateRepeat();
  };
}

const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

export { actionRegister };
