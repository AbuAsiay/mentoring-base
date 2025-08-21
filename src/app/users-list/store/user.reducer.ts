import { createReducer, on } from "@ngrx/store";
import { User } from "../../interfaces/users.interface";
import { UsersActions } from "./users.actions";

export interface UsersState {
  users: User[];
}
const initialState: { users: User [] } = {
  users: [],
};
export const userReducer = createReducer(
    initialState,
  on(UsersActions.set, (state, payload) => ({
    ...state,
    users: payload.users,
  })),
  on(UsersActions.edit, (state, payload) => ({
    ...state,
    users: state.users.map((user: User) => user.id === payload.user.id ? payload.user: user),
  })),
  on(UsersActions.create, (state, payload) => ({
    ...state,
    users: [...state.users, payload.user],
  })),
on(UsersActions.delete, (state, { id }) => ({
  ...state,
  users: state.users.filter(user => user.id !== id),
})),
);
