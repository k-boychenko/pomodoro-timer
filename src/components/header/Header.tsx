import React, { useContext, useState } from 'react';

// import components
import Settings from './Settings';
import { TimerModesContext, TimerModesContextType } from '../../context/TimerModesContext';

import logo from '../../img/pomotimer_logo.svg';
import settings from '../../img/settings_icon.svg';
import login from '../../img/login_icon.svg';

const Header = () => {
    // useContext
    const { pomodoroMode } = useContext(TimerModesContext) as TimerModesContextType;

    // useState
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    return (
        <header className={pomodoroMode}>
            <div className="container">
                <a href="/" className='logolink'><img src={ logo } alt='Pomotimer'/><div>Pomotimer</div></a>
                <nav className="right-side">
                    <img src={ settings } alt='Settings' onClick={() => setSettingsIsOpen(true)} />
                    <img src={ login } alt='Login' />
                </nav>
            </div>
            {/* <Modal isOpen={settingsIsOpen} toggle={() => setSettingsIsOpen(!settingsIsOpen)}></Modal> */}
            <Settings isOpen={settingsIsOpen} toggle={() => setSettingsIsOpen(!settingsIsOpen)} />
        </header>
    );
};

export default Header;