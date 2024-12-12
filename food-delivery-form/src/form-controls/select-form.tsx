import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forwardRef } from "react";

const SelectForm = forwardRef((props, ref) => {
  const { name, value, onChange } = props;
  return (
    <Select
      name={name}
      value={value}
      onValueChange={onChange}
      ref={ref}
      {...props}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a payment method" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Payment method</SelectLabel>
          <SelectItem value="online">Paid online</SelectItem>
          <SelectItem value="cod">Cash on delivery</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
});

export default SelectForm;
