import React from "react";
import styled from "styled-components";
import { transpose } from "../../utils/transposer";

const SongTextContainer = styled.div`
    span.c {
        font-weight: bold;
        color: #2159d6;
    }

    .transpose-keys {
        margin: 10px 0;
        overflow: auto;
        font: normal 11px sans-serif;
    }
    .transpose-keys a {
        display: block;
        float: left;
        width: 2.25em;
        text-align: center;
        margin: 0 0.25em 0.25em 0;
        color: #333;
        background: #eee;
        text-decoration: none;
        padding: 0.4em 0;
        border: solid 1px transparent;
        outline: none;
    }
    .transpose-keys a.selected {
        background: #2159d6;
        color: #fff;
    }

    .song-text,
    .song-text * {
        /* font-family: "monospace" !important; */
        /* white-space: pre; */
        font-family: "Roboto Mono", monospace !important;
    }
`;
const Chords = ({ song }: any) => {
    const preRef = React.useRef(null);

    const songKey = song.original_key;

    React.useEffect(() => {
        // const preHTML = document.querySelectorAll("pre");
        // transpose.call(preHTML, { key: songKey ? songKey : getSongKey() });

        //todo: write a function to figure out the key of the song !!!
        const getSongKey = () => {
            console.error("implament a wat to find the key of the song !!!!!!");
        };

        // transpose.call(preHTML, { key: "C" });
        // transpose.call(preRef.current);
        if (preRef.current) {
            console.log("preRef>>>> ", preRef.current);

            const options = { key: songKey ? songKey : getSongKey() };
            transpose.call([preRef.current], options);
            // transpose.call(["thissssssss"], options);
        }
    }, []);

    console.log('song", ', song);
    return (
        <div className="container">
            {/* <h1>{song.title}</h1> */}
            <h1>
                {song.artist.name} - {song.title}
            </h1>
            {/* <pre>{song.lyrics}</pre> */}
            <SongTextContainer>
                <pre
                    className="song-text"
                    ref={preRef}
                    // data-key="C"
                    style={{
                        overflow: "auto",
                        // fontFamily: "Consolas",
                        // fontFamily:
                        //     "Consolas,Menlo,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New,monospace,sans-serif",
                    }}
                >
                    {song.lyrics}
                </pre>
            </SongTextContainer>
        </div>
    );
};

// export async function getStaticProps(context: any) {
export async function getServerSideProps(context: any) {
    const { slug } = context.query;

    console.log("context  >>> ", process.env.API_URL);

    const res = await fetch(`${process.env.API_URL}/song-chords/?slug=${slug}`);
    const data = await res.json();

    return {
        props: {
            song: data[0],
        },
    };
}

// export async function getStaticProps() {

export default Chords;
