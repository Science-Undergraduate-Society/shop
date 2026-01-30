import styles from './Notice.module.css'

export const Notice = () => {
    return (
        <div className={styles.container}>
            <p className={styles.pickupInfo}>
                📦 <strong>IN-PERSON PICKUP ONLY:</strong> All orders must be picked up in person at <strong>Ladha Science Student Centre</strong>. There is <strong>NO SHIPPING</strong> available. Please email <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a> after placing your order to coordinate a pickup time.
            </p>
        </div>
    )
}