import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const promiseReducer = (state = {}, { type, name, status, payload, error }) => {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: {
        status,
        payload,
        error,
      },
    };
  }
  return state;
};

const actionPromise = (name, promise) => {
  const actionPending = () => ({
    type: "PROMISE",
    name,
    status: "PENDING",
    payload: null,
    error: null,
  });
  const actionResolved = (payload) => ({
    type: "PROMISE",
    name,
    status: "RESOLVED",
    payload,
    error: null,
  });
  const actionRejected = (error) => ({
    type: "PROMISE",
    name,
    status: "REJECTED",
    payload: null,
    error,
  });
  return async (dispatch) => {
    dispatch(actionPending());
    try {
      let payload = await promise;
      dispatch(actionResolved(payload));
      return payload;
    } catch (error) {
      dispatch(actionRejected(error));
    }
  };
};

const store = createStore(promiseReducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));

store.dispatch({
  type: "PROMISE",
  name: "login",
  status: "RESOLVED",
  payload: "hi",
});

store.dispatch({
  type: "PROMISE",
  name: "chatList",
  status: "REJECTED",
  error: "bye",
});

function actionRegisterPromise(email, password, login) {
  let promise = getGQL("http://localhost:3330/graphql")(
    `mutation reg($email:String, $password:String, $login:String){
        createUser(email:$email, password:$password, login:$login){ id } 
      }`,
    { email, password, login }
  );
  return actionPromise("register", promise);
}

function actionRegister(email, password, login) {
  return async (dispatch) => {
    let user = await dispatch(actionRegisterPromise(email, password, login));
    if (user) {
      window.location.assign("/sign_in");
    }
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

export {actionRegister, store}




// // const getGQL = (url) => () => {
// //   const email = document.getElementById("email").value;
// //   const password = document.getElementById("password").value;
// //   const nickname = document.getElementById("nickname").value;

// //   fetch(url, {
// //     method: "POST",
// //     headers: {
// //       Accept: "application/json",
// //       "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //       email: email,
// //       password: password,
// //       nickname: nickname,
// //     }),
// //   })
// //     .then((res) => res.json())
// //     .then((data) => {
// //       console.log("ok");
// //       console.log(data);
// //     });
// // };

// // function actionLogin(login, password) {
// //   getGQL("http://localhost:3333/users");
// // }

// // const store = createStore((state, { type, token }) => {
// //   if (!state) return {};
// //   if (type === "LOGIN") return { pending: true, jwt: {} };
// //   if (type === "LOGOUT") return { jwt: {}, data: {} };
// //   if (type === "TOKEN") return { jwt: token, data: jwtDecode(token) };
// //   return state;
// // });

// const promiseReducer = (state = {}, { type, name, status, payload, error }) => {
//   if (type === "PROMISE") {
//     return {
//       ...state,
//       [name]: {
//         status,
//         payload,
//         error,
//       },
//     };
//   }
//   return state;
// };

// const actionPromise = (name, promise) => {
//   const actionPending = () => ({
//     type: "PROMISE",
//     name,
//     status: "PENDING",
//     payload: null,
//     error: null,
//   });
//   const actionResolved = (payload) => ({
//     type: "PROMISE",
//     name,
//     status: "RESOLVED",
//     payload,
//     error: null,
//   });
//   const actionRejected = (error) => ({
//     type: "PROMISE",
//     name,
//     status: "REJECTED",
//     payload: null,
//     error,
//   });
//   return async (dispatch) => {
//     dispatch(actionPending());
//     try {
//       let payload = await promise;
//       dispatch(actionResolved(payload));
//       return payload;
//     } catch (error) {
//       dispatch(actionRejected(error));
//     }
//   };
// };

// // const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

// const store1 = createStore(promiseReducer, applyMiddleware(thunk));
// store1.subscribe(() => console.log(store1.getState()));

// store1.dispatch({
//   type: "PROMISE",
//   name: "login",
//   status: "RESOLVED",
//   payload: "hi",
// });

// store1.dispatch({
//   type: "PROMISE",
//   name: "chatList",
//   status: "REJECTED",
//   error: "bye",
// });

// // function actionToken(token) {
// //   return {
// //     type: "TOKEN",
// //     token,
// //   };
// // }

// // const actionLoginPromise = (email, password) => {
// //   let promise = getGQL("http://localhost:3330/graphql")(
// //     `query l($email:String, $password:String){
// //         login(email:$email, password:$password)
// //       }`,
// //     { email, password }
// //   );
// //   return actionPromise("email", promise);
// // };

// // const actionLogin = (email, password) => {
// //   return async (dispatch) => {
// //     let token = await dispatch(actionLoginPromise(email, password));
// //     if (token) {
// //       dispatch(actionToken(token));
// //       // window.location.assign("/my_profile")
// //     }
// //   };
// // };

// function actionRegisterPromise(email, password, login) {
//   let promise = getGQL("http://localhost:3330/graphql")(
//     `mutation reg($email:String, $password:String, $login:String){
//       createUser(email:$email, password:$password, login:$login){ id } 
//     }`,
//     { email, password, login }
//   );
//   return actionPromise("register", promise);
// }

// function actionRegister(email, password, login) {
//   return async (dispatch) => {
//     let user = await dispatch(actionRegisterPromise(email, password, login));
//     if (user) {
//       window.location.assign("/sign_in");
//       // dispatch(actionLogin(email, password));
//     }
//   };
// }

// // const actionRegister = (email, password) => {
// //   return async (dispatch) => {
// //     let useer = await dispatch(actionLoginPromise(email, password));
// //     if (token) dispatch(actionToken(token));
// //   };
// // };

// // const actionTimeouts = () => {
// //   return async (dispatch) => {
// //     let result = await dispatch(actionPromise("delay1", delay(1000)));
// //     console.log(result);
// //     result = await dispatch(actionPromise("delay" + result, delay(result * 2)));
// //     console.log(result);
// //   };
// // };

// // store1.dispatch(actionTimeouts());

// // store1.dispatch(actionPromise("delay1000", delay(1000)));
// // store1.dispatch(actionPromise("delay2000", delay(2000)));

// // const store = createStore((state, { type, token }) => {
// //   if (!state) return {};
// //   if (type === "LOGOUT") return { jwt: "" };
// //   if (type === "LOGIN")
// //     return {
// //       pending: true,
// //       jwt: "",
// //     };
// //   if (type === "TOKEN")
// //     return {
// //       jwt: token,
// //       data: jwtDecode(token),
// //     };
// //   return state;
// // });

// const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
//   fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       ...headers,
//     },
//     body: JSON.stringify({ query, variables }),
//   }).then((res) => res.json());

// // function actionLogin(email, password) {
// //   getGQL("http://localhost:3330/graphql")(
// //     `query l($email:String, $password:String){
// //         login(email:$email, password:$password)
// //       }`,
// //     { email, password }
// //   ).then((data) => store.dispatch(actionToken(data.data.login)));
// //   return {
// //     type: "LOGIN",
// //   };
// // }

// // function actionToken(token) {
// //   return {
// //     type: "TOKEN",
// //     token,
// //   };
// // }

// // store.subscribe(() => console.log(store.getState()));
// // store1.dispatch(actionLogin("1", "1"));