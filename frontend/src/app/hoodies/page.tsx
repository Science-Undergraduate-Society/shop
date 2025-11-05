import { ProductPage } from "@/components/ProductPage/ProductPage";
import styles from "./hoodies.module.css";

export default function Hoodies() {
  return <ProductPage category="hoodies" styles={styles} />;
}