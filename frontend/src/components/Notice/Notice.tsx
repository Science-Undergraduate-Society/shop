import styles from './Notice.module.css'

export const Notice = () => {
    return (
        <div className={styles.container}>
            <p className={styles.pickupInfo}>
                📦 <strong>IMPORTANT - Pickup Information: </strong>
                Summer orders are now closed! Until further notice, please contact our sales team at <a href="mailto:sales@sus.ubc.ca">sales@sus.ubc.ca</a> to place an order.
            </p>
        </div>
    )
}