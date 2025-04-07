import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const couponDetails = [
  {
    label: "Detail 1",
    value: "detail-1",
  },
  {
    label: "Detail 2",
    value: "detail-2",
  },
  {
    label: "Detail 3",
    value: "detail-3",
  },
];

const couponFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(1, {
      message: "Title must be at least 1 character",
    }),
  couponCategory: z.object({
    value: z.string(),
    label: z.string(),
  }),
  amount: z.string().min(1, {
    message: "Amount is required",
  }),
});

const refinedCouponFormSchema = couponFormSchema.refine(
  (data) =>
    data.couponCategory.value !== "" && data.couponCategory.label !== "",
  {
    message: "Offer category is required",
    path: ["couponCategory"],
  }
);

type CouponFormType = z.infer<typeof refinedCouponFormSchema>;

function CouponForm() {
  const form = useForm<CouponFormType>({
    resolver: zodResolver(refinedCouponFormSchema),
    defaultValues: {
      title: "",
      couponCategory: { label: "", value: "" },
      amount: "",
    },
  });

  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = form;

  const onSubmit = (values: CouponFormType) => {
    console.log(values);
  };

  // console.log("errors", errors);

  return (
    <div className="max-w-xl mx-auto">
      <h3>Coupon Form</h3>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="couponCategory"
            render={({ field }) => {
              const handleSelectValueChange = (value: string) => {
                const selectedCategory = couponDetails.find(
                  (cat) => cat.value === value
                );
                field.onChange(selectedCategory);
              };

              return (
                <FormItem>
                  <FormLabel>Coupon Category</FormLabel>
                  <Select onValueChange={handleSelectValueChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a coupon detail" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {couponDetails.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit coupon</Button>
        </form>
      </Form>
    </div>
  );
}

export default CouponForm;
