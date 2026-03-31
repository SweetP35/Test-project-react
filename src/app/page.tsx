"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import FormFiled from "@/components/FormFiled";
import Separator from "@/components/Separator";
import Approved from "@/components/Approved";
import Button from "@/components/Button";



export default function Home() {
  interface City {
    city: string;
    population: string;
  }
  const [nameValue, setNameValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordRepeatValue, setPasswordRepeatValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cities, setCities] = useState<City[]>([]);
  const [savedName, setSavedName] = useState<string | null>(null);
  const [lastSubmitDate, setLastSubmitDate] = useState<string>("");




  const setNameFromLS = () => {
    console.log("setNameFromLS");
    const savedNameFromLS = localStorage.getItem("userName");
    if (savedNameFromLS) {
      setSavedName(savedNameFromLS);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('/api/cities');
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Ошибка загрузки городов:', error);
      }
    };

    fetchCities();
    setNameFromLS();
  }, []);





  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!nameValue.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (nameValue.trim().length < 2) {
      newErrors.name = "Имя должно содержать минимум 2 символа";
    } else if (!/^[а-яёА-ЯЁ\s]+$/.test(nameValue.trim())) {
      newErrors.name = "Только кириллица";
    }

    if (!cityValue) {
      newErrors.city = "Укажите город";
    }

    if (!passwordValue) {
      newErrors.password = "Укажите пароль";
    } else if (passwordValue.length < 6) {
      newErrors.password = "Пароль должен содержать не менее 6 символов";
    } else if (!/^[a-zA-Z]+$/.test(passwordValue)) {
      newErrors.password = "Только латинские буквы";
    }

    if (!passwordRepeatValue) {
      newErrors.passwordRepeat = "Повторите пароль";
    } else if (passwordRepeatValue !== passwordValue) {
      newErrors.passwordRepeat = "Пароли не совпадают";
    }

    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      newErrors.email = "Некорректный email";
    } else if (subscribed && !emailValue.trim()) {
      newErrors.email = "Email обязателен при подписке";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const formData = {
        name: nameValue.trim(),
        city: cityValue,
        password: passwordValue,
        phone: phoneValue,
        email: emailValue,
        subscribed
      };

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        localStorage.setItem("userName", nameValue.trim());
        setSavedName(nameValue.trim());
        const now = new Date();
        const formattedDate = now.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        setLastSubmitDate(formattedDate);
        setPasswordValue("");
        setPasswordRepeatValue("");
        setPhoneValue("");
        setEmailValue("");
        setSubscribed(false);
        setErrors({});

        alert("Форма успешно отправлена!");
      } else {
        alert("Ошибка при отправке формы");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при отправке");
    }
  };


  const form = {
    name: {
      value: nameValue,
      label: "Имя",
      placeholder: "Введите Имя",
      required: true,
      error: errors.name
    },
    city: {
      value: cityValue,
      label: "Ваш город",
      placeholder: "Выберите Город",
      required: true,
      items: cities,
      error: errors.city
    },
    password: {
      value: passwordValue,
      label: "Пароль",
      placeholder: "Введите Пароль",
      required: true,
      type: "password",
      error: errors.password
    },
    passwordRepeat: {
      value: passwordRepeatValue,
      label: "Пароль еще раз",
      placeholder: "Повторите Пароль",
      required: true,
      type: "password",
      error: errors.passwordRepeat
    },
    phone: {
      value: phoneValue,
      label: "Номер телефона",
      placeholder: "+7 (***) ***-**-**",
      type: "tel",
      error: errors.phone
    },
    email: {
      value: emailValue,
      label: "Электронная почта",
      placeholder: "Введите электронную почту",
      error: errors.email
    }
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.greeting}>Здравствуйте, <span>{savedName || "Человек"}</span></div>
          <FormFiled {...form.name} value={form.name.value} updateValue={setNameValue} />
          <FormFiled {...form.city} control="select" value={form.city.value} updateValue={setCityValue} />
          <Separator />
          <FormFiled {...form.password} value={form.password.value} updateValue={setPasswordValue} />
          <FormFiled {...form.passwordRepeat} value={form.passwordRepeat.value} updateValue={setPasswordRepeatValue} />
          <Separator />
          <FormFiled {...form.phone} value={form.phone.value} updateValue={setPhoneValue} />
          <FormFiled {...form.email} value={form.email.value} updateValue={setEmailValue} required={subscribed} />
          <Approved subscribed={subscribed} setSubscribed={setSubscribed} />
        </div>
        <Button
          onSubmit={handleSubmit}
          lastSubmitDate={lastSubmitDate}
        />
      </div>
    </div>
  );
}
