import Select, { Props as SelectProps, StylesConfig, SingleValue } from "react-select";

type Option = { label: string; value: string };

interface CustomSelectProps extends Omit<SelectProps<Option>, "onChange" | "value"> {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  onInputChange? : (input: string) => void;
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
    zIndex: 30,
  }),
};

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder,onInputChange, ...rest }) => {
  const selected = options.find((opt) => opt.value === value) || null;

  return (
    <Select
      isMulti={false}
      options={options}
      styles={customStyles}
      value={selected}
      onChange={(option) => onChange((option as SingleValue<Option>)?.value ?? "")}
      onInputChange={(inputValue, actionMeta) => {
        if (actionMeta.action === "input-change") {
          onInputChange?.(inputValue); // ← only when user is typing
        }
        return inputValue;
      }}
      placeholder={placeholder}
      isSearchable
      {...rest}
    />
  );
};

export default CustomSelect;
export type { Option };
