import React, { useState } from "react";
import { Button, Input, Stack } from "@auspices/eos";
import { useHistory } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const history = useHistory();

  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!token) return;
    localStorage.setItem("token", token);
    history.push("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="horizontal">
        <Input
          placeholder="secret?"
          type="password"
          flex={1}
          onChange={handleChange}
        />
        <Button flex={1}>login</Button>
      </Stack>
    </form>
  );
};
