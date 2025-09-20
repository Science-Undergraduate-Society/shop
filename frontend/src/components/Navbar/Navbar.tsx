import styles from "./Navbar.module.css";

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <img
                className={styles.logo}
                alt="SUS Logo"
                src="/long-logo.png"
            />
            
            <div className={styles.linkContainer}>
                <a href="/letterman">Jacket</a>
                <a href="/quarterZips">Quarter Zips</a>
                <a href="/hoodies">Hoodies</a>
                <a href="/crewnecks">Crewnecks</a>
                <a href="/shorts">Shorts</a>
                <a href="https://www.susubc.ca/" className={styles.backlinkButton}>SUS Home Page</a>
            </div>
        </nav>
    )
}