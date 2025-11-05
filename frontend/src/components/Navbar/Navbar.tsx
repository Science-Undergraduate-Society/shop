import styles from "./Navbar.module.css";
import products from "../../data/products.json"

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <a href="/">
                <img
                    className={styles.logo}
                    alt="SUS Logo"
                    src="/long-logo.png"
                />
            </a>
            
            <div className={styles.linkContainer}>
                {products.map((product) => (
                    <a key={product.id} href={`/product/${product.id}`}>
                        {product.name}
                    </a>
                ))}
                <a href="https://www.susubc.ca/" className={styles.backlinkButton}>SUS Home Page</a>
            </div>
        </nav>
    )
}