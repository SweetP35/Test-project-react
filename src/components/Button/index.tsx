import styles from "./style.module.scss";

interface ButtonProps {
    onSubmit?: () => void;
    lastSubmitDate?: string;
}

export default function Button({
    onSubmit,
    lastSubmitDate
}: ButtonProps) {
    return (
        <div className={styles.button}>
            <div></div>
            <div className={styles.button__content}>
                <button
                    className={styles.button__submit}
                    onClick={onSubmit}
                    type="submit"
                >
                    Изменить
                </button>
                {lastSubmitDate && (
                    <div className={styles.button__lastChange}>
                        последние изменения <span>{lastSubmitDate}</span>
                    </div>
                )}
            </div>
        </div>
    )
}