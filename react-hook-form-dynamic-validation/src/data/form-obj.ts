import {
  FieldType,
  FormField,
  InputType,
  ValidationType,
} from "@/types/form-type";

export const formObj: FormField[] = [
  {
    defaultValue: "",
    id: "username",
    label: "Username",
    name: "username",
    placeholder: "Username",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Text,
    rules: [
      {
        type: ValidationType.Min,
        value: 2,
        message: {
          message: "Username must be at least 2 characters.",
        },
      },
      {
        type: ValidationType.Max,
        value: 8,
        message: {
          message: "Username must not be more than 8 characters.",
        },
      },
    ],
  },
  {
    defaultValue: "",
    id: "firstName",
    label: "First Name",
    name: "firstName",
    placeholder: "First Name",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Text,
    rules: [
      {
        type: ValidationType.Min,
        value: 2,
        message: {
          message: "First name must be at least 2 characters.",
        },
      },
    ],
  },
  {
    defaultValue: "",
    id: "lastName",
    label: "Last Name",
    name: "lastName",
    placeholder: "Last Name",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Text,
    rules: [
      {
        type: ValidationType.Min,
        value: 2,
        message: {
          message: "Last name must be at least 2 characters.",
        },
      },
    ],
  },
  {
    defaultValue: "",
    id: "email",
    label: "Email",
    name: "email",
    placeholder: "Email",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Email,
    rules: [
      {
        type: ValidationType.Email,
        message: {
          message: "Invalid email.",
        },
      },
    ],
  },
  {
    defaultValue: "",
    id: "password",
    label: "Password",
    name: "password",
    placeholder: "Password",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Password,
    rules: [
      {
        type: ValidationType.String,
        message: {
          required_error: "Password is required,",
        },
      },
      {
        type: ValidationType.Min,
        value: 6,
        message: {
          message: "Password must be at least 6 characters.",
        },
      },
    ],
  },
  {
    defaultValue: "",
    id: "confirmPassword",
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "Confirm Password",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Password,
    rules: [
      {
        type: ValidationType.String,
      },
    ],
  },
  {
    defaultValue: "",
    id: "gender",
    label: "Gender",
    name: "gender",
    placeholder: "Select a gender",
    input: {
      type: InputType.Select,
      values: [
        {
          value: "male",
          label: "Male",
        },
        {
          value: "female",
          label: "Female",
        },
      ],
    },
    rules: [
      {
        type: ValidationType.String,
      },
      {
        type: ValidationType.Min,
        value: 1,
        message: {
          message: "Gender is required.",
        },
      },
    ],
  },
];
