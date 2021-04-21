import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import { links } from "./links";

const NavigationStyled = styled.nav`
    ul {
        display: flex;
        list-style: none;
    }

    li:not(:first-child) {
        margin-left: 1rem;
    }

    a {
        text-decoration: none;
    }

    .active {
        color: orange;
    }
`;

const Navigation = () => {
    const router = useRouter();

    return (
        <NavigationStyled>
            <ul>
                {links.map(({ label, slug }, index) => {
                    // const { label, slug } = link;
                    return (
                        <li key={index}>
                            <Link href={slug}>
                                <a className={router.pathname === slug ? "active" : ""}>{label}</a>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </NavigationStyled>
    );
};

export default Navigation;
