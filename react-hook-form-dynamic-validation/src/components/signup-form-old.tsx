import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "@/components/ui/input";

const signupFormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

/* 
  const formObj = [
    {
      defaultValue: "",
      id: "username",
      label: "Username",
      name: "username",
      placeholder: "Username",
      type: "text",
      validation: {
        type: "string",
        min: {
          value: 2,
          message: "Username must be at least 2 characters."
        }
      }
    },
    {
      defaultValue: "",
      id: "firstName",
      label: "First Name",
      name: "firstName",
      placeholder: "First Name",
      type: "text",
      validation: {
        type: "string",
        min: {
          value: 2,
          message: "First name must be at least 2 characters."
        }
      }
    },
    {
      defaultValue: "",
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      placeholder: "Last Name",
      type: "text",
      validation: {
        type: "string",
        min: {
          value: 2,
          message: "Last name must be at least 2 characters."
        }
      }
    },
    {
      defaultValue: "",
      id: "email",
      label: "Email",
      name: "email",
      placeholder: "Email",
      type: "email",
      validation: {
        type: "email",
        message: "Invalid email."
      }
    },
    {
      defaultValue: "",
      id: "password",
      label: "Password",
      name: "password",
      placeholder: "Password",
      type: "password",
      validation: {
        type: "string",
        min: {
          value: 6,
          message: "Password must be at least 6 characters."
        }
      }
    },
    {
      defaultValue: "",
      id: "confirmPassword",
      label: "Confirm Password",
      name: "confirmPassword",
      placeholder: "Confirm Password",
      type: "password",
      validation: {
        type: "string",
        refine: {
          condition: ["confirmPassword", "password"]
          operator: "equal"
          message: "Password do not match",
          path: ["confirmPassword"]
        }
      }
    }
  ]
  */

type SignupFormType = z.infer<typeof signupFormSchema>;

function SignupForm() {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: SignupFormType) => {
    console.log(values);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h3>Signup Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupFormType>;
            }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupFormType>;
            }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupFormType>;
            }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupFormType>;
            }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupFormType>;
            }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({
              field,
            }: {
              field: ControllerRenderProps<SignupFormType>;
            }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
