import React from 'react';
import Link from 'next/link';
import styles from '@/styles/PageTitle.module.css'

import OrdersList from "@/components/OrdersList";


export default function Sells() {
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

        <OrdersList />

    </>
  );
}
