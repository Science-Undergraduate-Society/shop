import styles from "./Navbar.module.css";
import products from "../../data/products.json"
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/">
                <img
                    className={styles.logo}
                    alt="SUS Logo"
                    src="/long-logo.png"
                />
            </Link>
            
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