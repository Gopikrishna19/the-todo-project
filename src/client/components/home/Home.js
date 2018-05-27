import React from 'react';
import styles from './Home.scss';
import {TimeWidget} from './TimeWidget';

export const Home = () =>
    <div className={styles.container}>
        <TimeWidget/>
    </div>;
