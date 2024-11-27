import React from 'react';

import { PDTG } from '@/constants';

import { styles } from '../utils';

export const WelcomeSponsorTemplate = () => {
  return (
    <div style={styles.container}>
      <p style={styles.text}>Welcome to Alephium!</p>
      <p style={styles.textWithMargin}>
        Thank you for signing up. Contribium is the premier talent-matching platform
        in crypto, favoured by hundreds of leading companies and thousands of
        verified crypto-focused talent.
      </p>
      <p style={styles.textWithMargin}>
        If you need any help related to setting up your listing on Contribium,
        don&apos;t hesitate to get in touch with&nbsp;
        <a href={PDTG} style={styles.link}>
          Pratik
        </a>{' '}
        on Telegram.&nbsp;
      </p>
      <p style={styles.salutation}>
        Best,
        <br />
        Alephium
      </p>
    </div>
  );
};
