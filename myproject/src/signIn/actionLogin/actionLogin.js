import { actionPromise } from "../../store/store";

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

function actionToken(token) {
  return {
    type: "TOKEN",
    token,
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
  })
    .then((res) => res.json())
    .then((a) => {
      if (a.data.getLogin) window.location.assign("/my_profile");
      else {
        const error = document.querySelector(".error");
        error.style.display = "block";
      }
    });

const actionLoginPromise = (login, password) => {
  let promise = getGQL("http://localhost:3330/graphql")(
    `query l($login:String, $password:String){
        getLogin(login:$login, password:$password)
        }`,
    { login, password }
  );
  return actionPromise("login", promise);
};

const actionLogin = (login, password) => {
  return async (dispatch) => {
    let token = await dispatch(actionLoginPromise(login, password));
    if (token) dispatch(actionToken(token));
  };
};

export { actionLogin };
