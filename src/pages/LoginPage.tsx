import React, { useState } from "react";
import { Button, Input, Stack } from "@auspices/eos";
import { useHistory } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const history = useHistory();

  const [credentials, setCredentials] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = btoa(`${credentials.username}:${credentials.password}`);
    localStorage.setItem("token", token);
    history.push("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="horizontal">
        <Input
          name="username"
          placeholder="username"
          flex={1}
          onChange={handleChange}
          required
        />

        <Input
          name="password"
          placeholder="password"
          type="password"
          flex={1}
          onChange={handleChange}
          required
        />
        <Button flex={1}>login</Button>
      </Stack>
    </form>
  );
};
