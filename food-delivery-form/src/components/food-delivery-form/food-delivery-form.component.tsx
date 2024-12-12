import { FieldErrors, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import useRenderCount from "@/hooks/useRenderCount";

type FoodDeliveryFormType = {
  orderNo: number;
  customerName: string;
  mobile: string;
  email: string;
  paymentMedthod: string;
  deliveryIn: number;
};

// const RenderCount = useRenderCount();

function FoodDeliveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodDeliveryFormType>({
    mode: "onChange",
    defaultValues: {
      orderNo: new Date().valueOf(),
      customerName: "",
      mobile: "",
      email: "",
      paymentMedthod: "",
      deliveryIn: 0,
    },
  });

  const onSubmit = (data: FoodDeliveryFormType) => {
    console.log("form data", data);
  };

  const onError = (errors: FieldErrors) => {
    console.log("Errors", errors);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="font-semibold mb-3">Delivery form with React</h3>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        {/* <RenderCount /> */}
        <section className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <Input
              type="text"
              placeholder="#Order No."
              disabled
              {...register("orderNo")}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Mobile"
              error={errors.mobile}
              {...register("mobile", {
                minLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                required: {
                  value: true,
                  message: "Mobile number is required",
                },
              })}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Customer Name"
              error={errors.customerName}
              {...register("customerName", {
                required: {
                  value: true,
                  message: "Customer name is required",
                },
              })}
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              error={errors.email}
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Incorrect email format",
                },
                validate: {
                  notFake: (value) => {
                    return (
                      value !== "email@gmail.com" ||
                      "This particular email is blocked."
                    );
                  },
                  notFromBlacklistedDomain: (value, values) => {
                    console.log("values", values);
                    return (
                      (!value.endsWith("@xyz.com") &&
                        !value.endsWith("@example.com")) ||
                      "This domain is not supported."
                    );
                  },
                },
              })}
            />
          </div>
        </section>

        <section>List of ordered food items.</section>

        <section className="grid grid-cols-2 gap-2 mb-4">
          <div></div>
          <div>dropdown for delivery time</div>
        </section>

        <section>delivery address</section>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default FoodDeliveryForm;
