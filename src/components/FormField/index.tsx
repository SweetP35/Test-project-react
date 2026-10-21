import styles from "./style.module.scss";
import Select from "../Select";


type SelectItem = {
    city: string;
    population: string;
}

interface FormFieldProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    control?: "input" | "select";
    items?: SelectItem[];
    value: string;
    type?: string;
    updateValue: (value: string) => void;
    error?: string;
}


export default function FormField({
    label,
    placeholder = "Введите текст",
    required = false,
    control = "input",
    items = [],
    type = "text",
    value = "",
    updateValue,
    error,
}: FormFieldProps) {
    const inputHandler = (value: string) => {
        if (type === "tel") {
            const formattedValue = formatPhone(value)
            updateValue(formattedValue);
            return
        }
        updateValue(value);
    };


    const formatPhone = (value: string): string => {
        const digits = value.replace(/\D/g, '').slice(0, 11);

        if (digits.length === 0) return '';
        if (digits.length <= 1) return `+7`;

        let formatted = `+7 (${digits.slice(1, 4)}`;

        if (digits.length > 4) formatted += `) ${digits.slice(4, 7)}`;
        if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
        if (digits.length > 9) formatted += `-${digits.slice(9)}`;

        return formatted;
    };
    return (
        <div className={styles["form-field"]}>
            <div className={styles["form-field__label-container"]}>
                <label className={styles["form-field__label"]}>{label}</label>
                {required && <div className={styles["form-field__required"]}>*</div>}
            </div>
            <div className={styles["form-field__input-container"]}>
                {control === "input" ? (
                    <input className={styles["form-field__input"]} type={type} placeholder={placeholder} value={value} onChange={(e) => inputHandler(e.target.value)} />
                ) : (
                    <Select placeholder={placeholder} items={items} value={value} updateValue={updateValue} />
                )}
                {error && <div className={styles["form-field__error"]}>{error}</div>}
            </div>
        </div>
    );
}