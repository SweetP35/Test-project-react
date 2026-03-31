import styles from "./style.module.scss";

interface ApprovedProps {
    subscribed: boolean;
    setSubscribed: (value: boolean) => void;
}

export default function Approved({ subscribed, setSubscribed }: ApprovedProps) {
    const handleCheckboxClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSubscribed(!subscribed);
    };

    return (
        <div className={styles.approved}>
            <div className={styles.title}>Я согласен</div>
            <label className={styles.label} onClick={handleCheckboxClick}>
                <input
                    type="checkbox"
                    checked={subscribed}
                    onChange={() => { }}
                />
                <div className={`${styles.checkbox} ${subscribed ? styles.checked : ''}`}></div>
                <span>принимать актуальную информацию на емейл</span>
            </label>
        </div>
    );
}