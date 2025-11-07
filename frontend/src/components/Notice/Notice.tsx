import styles from './Notice.module.css'

export const Notice = () => {
    return (
        <div className={styles.container}>
            <p className={styles.pickupInfo}>
                📦 <strong>IMPORTANT - Pickup Information: </strong>
                There is <strong>no shipping</strong> for any SUS merch - you will be required to book a time slot for pickup. Please reach out to <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a> for more information.
            </p>
        </div>
    )
}