// src/components/atoms/CustomSelect.tsx
import Select, { Props as SelectProps, StylesConfig } from "react-select";

type Option = { label: string; value: string };

interface CustomSelectProps extends Omit<SelectProps<Option>, "onChange" | "value"> {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const customStyles: StylesConfig<Option> = {
  control: (base) => ({
    ...base,
    padding: "2px",
    borderRadius: "0.5rem",
    borderColor: "#d1d5db",
    boxShadow: "none",
    ":hover": { borderColor: "#60a5fa" },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 10,
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder, ...rest }) => {
  const selected = options.find((opt) => opt.value === value) || null;

  return (
    <Select
      options={options}
      styles={customStyles}
      value={selected}
      onChange={(option) => onChange(option?.value ?? "")}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default CustomSelect;
export type { Option };
