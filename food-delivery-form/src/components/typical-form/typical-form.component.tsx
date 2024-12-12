import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import useRenderCount from "@/hooks/useRenderCount";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

// const RenderCount = useRenderCount();

type FoodDeliveryFormErrorType = {
  customerName: string;
  mobile: string;
};

function TypicalForm() {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FoodDeliveryFormErrorType>({
    customerName: "",
    mobile: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateFormData = () => {
    const tempErrors: FoodDeliveryFormErrorType = {
      customerName: "",
      mobile: "",
    };

    if (values.customerName === "")
      tempErrors.customerName = "Customer name is required.";
    if (values.mobile === "") tempErrors.mobile = "Mobile number is required.";

    setErrors((prev) => ({ ...prev, ...tempErrors }));

    return Object.values(tempErrors).every((err) => err === "");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFormData()) console.log("form data", values);
    else console.log("form is not valid");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="font-semibold mb-3">Delivery form with React</h3>
      {Object.values(errors).some((err) => err !== "") && (
        <ul className="text-xs text-red-600 border border-red-600 rounded p-2 bg-red-100">
          {Object.entries(errors).map(([name, value]) => (
            <li key={name}>{value}</li>
          ))}
        </ul>
      )}
      <form autoComplete="off" onSubmit={onSubmit}>
        {/* <RenderCount /> */}
        <div className="my-3">
          <Input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={values.customerName}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-3">
          <Input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default TypicalForm;
