import { z, ZodType } from "zod";
import { FormField } from "@/types/form-type";

/* export function generateSchema(formObj: FormField[]) {
  const schemaObj: { [key: string]: z.ZodString } = {};

  formObj.forEach(({ name, validation }) => {
    let fieldSchema = z.string();
    if (validation.type === "string") {
      fieldSchema = z.string();
      if (validation.min) {
        fieldSchema = fieldSchema.min(validation.min.value, {
          message: validation.min.message,
        });
      }
    } else if (validation.type === "email") {
      fieldSchema = z.string().email({ message: validation.message });
    }
    schemaObj[name] = fieldSchema;
  });

  return z
    .object(schemaObj)
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });
} */

export function generateSchema(formObj: FormField[]) {
  const schemaFields: { [key: string]: ZodType<unknown> } = {};

  formObj.forEach((field) => {
    if (field.name && field.rules) {
      let schemaField: ZodType<unknown> = z.unknown();

      field.rules.forEach((rule) => {
        switch (rule.type) {
          case "string":
            schemaField = z.string(rule.message);
            break;
          case "email":
            schemaField = z.string().email(rule.message);
            break;
          /* case "trim":
            schemaField = (schemaField as z.ZodString).trim();
            break; */
          case "min":
            schemaField = z.string().min(rule.value as number, rule.message);
            break;
          case "max":
            schemaField = z.string().max(rule.value as number, rule.message);
            break;
          case "number":
            schemaField = z.number(rule.message);
            break;
          case "object": {
            const nestedSchema = generateSchema(rule.value as FormField[]);
            schemaField = z.object(nestedSchema.shape, rule.message);
            break;
          }

          default:
            break;
        }
      });

      schemaFields[field.name] = schemaField;
    }
  });

  return z.object(schemaFields);
}

/* const validationObj = [
  {
    name: "title",
    rules: [
      {
        type: "string",
        message: {
          required_error: "Title is required",
        },
      },
      {
        type: "trim",
      },
      {
        type: "min",
        value: 1,
        message: {
          message: "Title must be at least 1 character",
        },
      },
    ],
  },
  {
    name: "couponCategory",
    rules: [
      {
        type: "object",
        value: [
          {
            name: "value",
            rules: [
              {
                type: "string",
              },
            ],
          },
          {
            name: "label",
            rules: [
              {
                type: "string",
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
  {
    name: "amount",
    rules: [
      {
        type: "number",
        message: {
          required_error: "Amount is required",
        },
      },
    ],
  },
]; */

/* z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(1, {
      message: "Title must be at least 1 character",
    }),

  couponCategory: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: "Offer category is required",
    }
  ),

  amount: z.string({
    required_error: "Amount is required",
  }),
}); */
