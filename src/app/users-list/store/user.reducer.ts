import { createReducer, on } from "@ngrx/store";
import { User } from "../users-list.component";
import { UsersActions } from "./users.actions";

const initialState: { users: User [] } = {
  users: [],
};
export const userReducer = createReducer(
    initialState,
  on(UsersActions.set, (state, payloud) => ({
    ...state,
    users: payloud.users,
  })),
  on(UsersActions.edit, (state, payloud) => ({
    ...state,
    users: state.users.map((user) =>{
      if (user.id === payloud.user.id) {
        return payloud.user;
      } else {
        return user;
      }
    }),
  })),
  on(UsersActions.create, (state, payloud) => ({
    ...state,
    users: [...state.users, payloud.user],
  })),
on(UsersActions.delete, (state, payloud) => ({
  ...state,
  users: state.users.filter((user) => user.id !==payloud.id),
})),
);
