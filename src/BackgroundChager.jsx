import { useState, useEffect } from 'react';
import EldenRing from './assets/eldenring.png';
import DarkSouls from './assets/darksouls.png';
import Sekiro from './assets/sekiro.png';
import HollowKnight from './assets/hollowknight.png';

export default function BackgroundChanger() {
    const [bg, changeBG] = useState(() => localStorage.getItem('background') || EldenRing);

    useEffect(() => {
        document.body.style.backgroundImage = `url(${bg})`;
        localStorage.setItem('background', bg);
    }, [bg]);

    function changeToElden() {
        changeBG(EldenRing);
    }

    function changeToSouls() {
        changeBG(DarkSouls);
    }

    function changeToSekiro() {
        changeBG(Sekiro);
    }

    function changeToHK() {
        changeBG(HollowKnight);
    }

    return (
        <div>
            <button onClick={changeToElden}>Elden Ring</button>
            <button onClick={changeToSouls}>Dark Souls</button>
            <button onClick={changeToSekiro}>Sekiro</button>
            <button onClick={changeToHK}>Hollow Knight</button>
        </div>
    );
}