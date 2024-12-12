import { zodResolver } from "@hookform/resolvers/zod";
import { /* ControllerRenderProps, */ useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { generateSchema } from "@/lib/schema-utils";
import { formObj } from "@/data/form-obj";

const signupFormSchema = generateSchema(formObj);
const refinedSignupFormSchema = signupFormSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Password do not match.",
    path: ["confirmPassword"],
  }
);

type SignupFormType = z.infer<typeof refinedSignupFormSchema>;

const formDefaultValues = formObj.reduce(
  (acc: { [key: string]: string }, { id, defaultValue }) => {
    acc[id] = defaultValue;
    return acc;
  },
  {}
);
console.log(
  "signupFormSchema",
  signupFormSchema,
  refinedSignupFormSchema._def.schema.shape
);
console.log("formDefaultValues", formDefaultValues);

function SignupForm() {
  const form = useForm<SignupFormType>({
    resolver: zodResolver(refinedSignupFormSchema),
    defaultValues: formDefaultValues,
  });

  const onSubmit = (values: SignupFormType) => {
    console.log(values);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h3>Signup Form</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formObj.map(({ id, name, label, placeholder, type, input }) => (
            <FormField
              key={id}
              control={form.control}
              name={name}
              render={({ field }) => {
                let inputControl: JSX.Element | null = null;

                switch (input.type) {
                  case "input":
                    inputControl = (
                      <FormControl>
                        <Input
                          type={type}
                          placeholder={placeholder}
                          {...field}
                        />
                      </FormControl>
                    );
                    break;
                  case "select":
                    inputControl = (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {input?.values?.map((val) => (
                            <SelectItem key={val.value} value={val.value}>
                              {val.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                    break;
                }

                return (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    {inputControl}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          ))}

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
