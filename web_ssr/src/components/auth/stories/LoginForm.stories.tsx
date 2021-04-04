import * as React from "react";
import { storiesOf } from "@storybook/react";
import LoginForm from "../LoginForm";

storiesOf("LoginForm", module).add("blank", () => {
  return (
    <LoginForm
      {...{
        handleSubmit: () => new Promise(resolve => setTimeout(resolve, 300)),
        setValue: () => null,
        onLoading: false,
        onError: undefined,
      }}
    />
  );
});

storiesOf("LoginForm", module).add("with error", () => {
  return (
    <LoginForm
      {...{
        handleSubmit: () => new Promise(resolve => setTimeout(resolve, 300)),
        setValue: () => null,
        onLoading: false,
        onError: new Error("aw shucks"),
      }}
    />
  );
});
