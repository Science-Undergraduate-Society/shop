import styles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <img
                className={styles.logo}
                alt="SUS Logo"
                src="/white-logo.png"
            />
            
            <a href="https://www.susubc.ca/" className={styles.backLink}>SUS Home Page</a>
        </nav>
    )
}