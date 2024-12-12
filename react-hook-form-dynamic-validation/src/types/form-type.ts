// export type InputType = "input" | "select" | "radio" | "checkbox";
// export type FieldType = "text" | "email" | "password" | "date";
// export type ValidationType = "string" | "email";

/* export type FormValidation = {
  type: ValidationType;
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  message?: string;
  refine?: {
    condition: string[];
    operator: "equal";
    message: string;
    path: string[];
  };
}; */

export enum InputType {
  Input = "input",
  Select = "select",
  Radio = "radio",
  Checkbox = "checkbox",
}

export enum FieldType {
  Text = "text",
  Email = "email",
  Password = "password",
  Date = "date",
}

export enum ValidationType {
  String = "string",
  Email = "email",
  Min = "min",
  Max = "max",
  Object = "object",
  Number = "number",
}

export type FormRule = {
  type: ValidationType;
  value?: number | FormValueRule[];
  message?: {
    required_error?: string;
    message?: string;
  };
};

export type FormValueRule = {
  name: string;
  rules: FormRule[];
};

export type FormField = {
  defaultValue: string;
  id: string;
  label: string;
  name: string;
  placeholder: string;
  input: {
    type: InputType;
    values?: Array<{ value: string; label: string }>;
  };
  type?: FieldType;
  rules: FormRule[];
};
