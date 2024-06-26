import React from 'react';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'

import ProductsList from "@/components/ProductsList"


export default function Home() {
  return (
    <>
      {/* Page title */}
      <div className={styles.pageTitle}>
        <h1>Controle de produtos e estoque</h1>
        <ul>
          <li>
            <Link href="/">Dashboard</Link>
          </li>
          <li>
          Controle de produtos e estoque
          </li>
        </ul>
      </div>
      <ProductsList />

    </>
  );
}
