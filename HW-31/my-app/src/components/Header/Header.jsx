import React from "react";
import './Header.css';

export class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <div>Logo</div>
                <ul>
                    <li><a href='/'>Home</a></li>
                    <li><a href='/'>Shop</a></li>
                    <li><a href='/'>Info</a></li>
                    <li><button type={"submit"}>Contact us</button></li>
                </ul>
            </header>
        )
    }
}