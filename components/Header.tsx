// import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Navigation from "./Navigation";

const HeaderStyled = styled.header<{ isDark?: boolean }>`
    background-color: ${(props) => (props.isDark ? "#000000" : "#efefef")};
    padding: 20px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        outline: 1px solid black;
        a {
            display: flex;
            align-items: center;
            text-decoration: none;
            /* justify-content: center; */
        }
        .logo-text {
            color: #333333;
            font-weight: bold;
            font-size: 1.25rem;
            margin-left: 1.25rem;
        }
    }
`;

interface Props {
    isDark?: boolean;
}

const Header = ({ isDark }: Props) => {
    console.log("isDark: ", isDark);
    return (
        <HeaderStyled isDark={isDark}>
            <div className="container header">
                <div className="logo">
                    <Link href="/">
                        <a>
                            <img src="#" alt="site logo" />
                            <div className="logo-text">Akoren Strana</div>
                        </a>
                    </Link>
                </div>

                <Navigation />
                <input type="text" />
            </div>
        </HeaderStyled>
    );
};

export default Header;
