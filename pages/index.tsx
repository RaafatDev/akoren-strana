// import styles from "../styles/Home.module.css";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
    min-height: 100vh;
    ul {
        min-height: 60vh;
    }
    /* background-color: lightblue; */
    /* color: ${(props) => props.theme.colors.primary}; */
`;

interface Props {
    songs: any;
}

export default function Home({ songs }: Props) {
    return (
        <ContainerStyled>
            <div className="container">
                <ul>
                    {songs.map((s: any, i: number) => {
                        return (
                            <li key={i}>
                                <Link href="/chords/[slug]" as={`/chords/${s.slug}`}>
                                    <a>{s.title}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </ContainerStyled>
    );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
    const baseURL = process.env.API_URL;

    const res = await fetch(`${baseURL}/song-chords`);
    const data = await res.json();

    return {
        props: {
            songs: data,
        },
    };
}

// export async function getStaticPaths() {}
