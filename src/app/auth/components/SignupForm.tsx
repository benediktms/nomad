import React from "react";
import { useMutation } from "blitz";
import { LabeledTextField } from "app/components/LabeledTextField";
import { Form, FORM_ERROR } from "app/components/Form";
import signup from "app/auth/mutations/signup";
import { SignupInput } from "app/auth/validations";
import { useToast } from "@chakra-ui/core";

type SignupFormProps = {
  onSuccess?: () => void;
};

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup);
  const toast = useToast();

  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values);
            props.onSuccess?.();
            toast({
              title: "Account created.",
              description: `Thanks for signing up, ${
                (await signupMutation(values)).firstName
              }!`,
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } catch (error) {
            if (
              error.code === "P2002" &&
              error.meta?.target?.includes("email")
            ) {
              // This error comes from Prisma
              return { email: "This email is already being used" };
            } else {
              return { [FORM_ERROR]: error.toString() };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField
          name="password"
          label="Password"
          placeholder="Password"
          type="password"
        />
      </Form>
    </div>
  );
};

export default SignupForm;
