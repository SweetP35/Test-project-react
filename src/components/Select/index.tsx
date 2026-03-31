"use client";
import styles from "./style.module.scss";
import { useState } from "react";

type SelectItem = {
    city: string;
    population: string;
}

interface SelectProps {
    placeholder?: string;
    items: SelectItem[] | [];
    value: string;
    updateValue: (value: string) => void;
}

export default function Select({
    placeholder = "Выберите",
    items = [],
    value,
    updateValue
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectValue, setSelectValue] = useState(value || "");
    const handleSelect = (value: string) => {
        setSelectValue(value);
        setIsOpen(false);
        updateValue(value);
    };



    return (
        <div className={styles["select"]}>
            <div className={styles["select__container"]} onClick={() => setIsOpen(!isOpen)}>
                <input className={styles["select__input"]} type="text" readOnly defaultValue={selectValue} placeholder={placeholder}/>
                <div className={`${styles["select__arrow"]} ${isOpen ? styles["select__arrow--open"] : ""}`}>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0.707107" y1="0.707108" x2="7.70711" y2="7.70711" stroke="#037BB8" strokeWidth="2" />
                        <line y1="-1" x2="9.8995" y2="-1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 14 1.41422)" stroke="#037BB8" strokeWidth="2" />
                    </svg>
                </div>
            </div>
            {isOpen && (<div className={styles["select__dropdown"]}>
           {items.length > 0 && items.map((item) => (
             <div key={item.city} className={styles["select__option"]} onClick={() => { handleSelect(item.city) }}>{item.city}</div>
           ))}    
            </div>)}
        </div>
    );
}