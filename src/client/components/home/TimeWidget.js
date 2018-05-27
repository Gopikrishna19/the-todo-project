import React, {Component} from 'react';
import styles from './TimeWidget.scss';

const MINUTE = 60000;
const TWELVE_HOURS = 12;
const TWO_DIGITS = 2;

const pad = value => `00${value}`.slice(-TWO_DIGITS);

const getState = () => {
    const date = new Date();
    const minutes = pad(date.getMinutes());
    let hours = date.getHours();

    const meridiem = hours / TWELVE_HOURS >= 1 ? 'PM' : 'AM';

    hours = hours % TWELVE_HOURS || TWELVE_HOURS;
    hours = pad(hours);

    return {
        hours,
        meridiem,
        minutes
    };
};

export class TimeWidget extends Component {
    constructor() {
        super();

        this.state = getState();
    }

    componentDidMount() {
        this.intervalId = setInterval(() => this.setState(getState()), MINUTE);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    render() {
        return (
            <div className={styles.timeWidget}>
                {this.state.hours}:{this.state.minutes}
                <span className={styles.meridiem}>
                    {this.state.meridiem}
                </span>
            </div>
        );
    }
}
