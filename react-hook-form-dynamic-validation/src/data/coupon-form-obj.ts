import {
  FieldType,
  FormField,
  InputType,
  ValidationType,
} from "@/types/form-type";

export const formObj: FormField[] = [
  {
    defaultValue: "",
    id: "title",
    label: "Title",
    name: "title",
    placeholder: "Title",
    input: {
      type: InputType.Input,
    },
    type: FieldType.Text,
    rules: [
      {
        type: ValidationType.String,
        message: {
          required_error: "Title is required",
        },
      },
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
    id: "couponCategory",
    label: "Coupon Category",
    name: "couponCategory",
    placeholder: "Coupon Category",
    input: {
      type: InputType.Select,
    },
    rules: [
      {
        type: ValidationType.Object,
        value: [
          {
            name: "value",
            rules: [
              {
                type: ValidationType.String,
              },
            ],
          },
          {
            name: "label",
            rules: [
              {
                type: ValidationType.String,
              },
            ],
          },
        ],
        message: {
          required_error: "Offer category is required",
        },
      },
    ],
  },
];
