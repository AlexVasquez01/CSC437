import { define, Auth } from "@calpoly/mustang";
import { LoginFormElement } from "./auth/login-form";
import { NewUserFormElement } from "./auth/newuser-form";

define({
  "mu-auth": Auth.Provider,
  "login-form": LoginFormElement,
  "newuser-form": NewUserFormElement
});