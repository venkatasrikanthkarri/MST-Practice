import { types } from "mobx-state-tree";

export const User = types.model("users", {
  id: Math.random(),
  name: types.string,
  password: types.string,
});

export const userDataBase = types.model({
  user: types.array(User),
});
//  const  = userData.create();
