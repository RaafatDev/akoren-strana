// const transpose = function (options) {
export function transpose(options) {
    // console.log("thissssssss: ", this);
    // getKeyByName("hi");

    const defaults = {
        chordRegex: /^[A-G][b#]?(2|4|5|6|7|9|11|13|6\/9|7-5|7-9|7#5|7#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*(\/[A-G][b#]*)*$/,
        chordReplaceRegex: /([A-G][b#]?(2|4|5|6|7|9|11|13|6\/9|7-5|7-9|7#5|7#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*)/g,
    };
    var opts = Object.assign({}, defaults, options);

    var currentKey = null;

    var keys = [
        { name: "Ab", value: 0, type: "F" },
        { name: "A", value: 1, type: "N" },
        { name: "A#", value: 2, type: "S" },
        { name: "Bb", value: 2, type: "F" },
        { name: "B", value: 3, type: "N" },
        { name: "C", value: 4, type: "N" },
        { name: "C#", value: 5, type: "S" },
        { name: "Db", value: 5, type: "F" },
        { name: "D", value: 6, type: "N" },
        { name: "D#", value: 7, type: "S" },
        { name: "Eb", value: 7, type: "F" },
        { name: "E", value: 8, type: "N" },
        { name: "F", value: 9, type: "N" },
        { name: "F#", value: 10, type: "S" },
        { name: "Gb", value: 10, type: "F" },
        { name: "G", value: 11, type: "N" },
        { name: "G#", value: 0, type: "S" },
    ];

    function getKeyByName(name) {
        if (name.charAt(name.length - 1) === "m") {
            name = name.substring(0, name.length - 1);
        }
        for (var i = 0; i < keys.length; i++) {
            if (name === keys[i].name) {
                return keys[i];
            }
        }
    }

    const getChordRoot = (input) => {
        if (input.length > 1 && (input.charAt(1) === "b" || input.charAt(1) === "#")) return input.substr(0, 2);
        else return input.substr(0, 1);
    };

    const getNewKey = (oldKey, delta, targetKey) => {
        var keyValue = getKeyByName(oldKey).value + delta;

        if (keyValue > 11) {
            keyValue -= 12;
        } else if (keyValue < 0) {
            keyValue += 12;
        }

        var i = 0;
        if (keyValue === 0 || keyValue === 2 || keyValue === 5 || keyValue === 7 || keyValue === 10) {
            // Return the Flat or Sharp Key
            switch (targetKey.name) {
                case "A":
                case "A#":
                case "B":
                case "C":
                case "C#":
                case "D":
                case "D#":
                case "E":
                case "F#":
                case "G":
                case "G#":
                    for (; i < keys.length; i++) {
                        if (keys[i].value === keyValue && keys[i].type === "S") {
                            return keys[i];
                        }
                    }

                default:
                    for (; i < keys.length; i++) {
                        if (keys[i].value === keyValue && keys[i].type === "F") {
                            return keys[i];
                        }
                    }
            }
        } else {
            // Return the Natural Key
            for (; i < keys.length; i++) {
                if (keys[i].value === keyValue) {
                    return keys[i];
                }
            }
        }
    };

    const getChordType = (key) => {
        switch (key.charAt(key.length - 1)) {
            case "b":
                return "F";
            case "#":
                return "S";
            default:
                return "N";
        }
    };

    const getDelta = (oldIndex, newIndex) => {
        if (oldIndex > newIndex) return 0 - (oldIndex - newIndex);
        else if (oldIndex < newIndex) return 0 + (newIndex - oldIndex);
        else return 0;
    };

    const transposeSong = (target, key) => {
        var newKey = getKeyByName(key);

        if (currentKey.name === newKey.name) {
            return;
        }

        var delta = getDelta(currentKey.value, newKey.value);
        // console.log("the targetttttt: ", target[0]);
        target[0].querySelectorAll("span.c").forEach((element, index) => {
            // console.log("the selectore::::", element);
            transposeChord(element, delta, newKey);
        });
        // $("span.c", target).each(function (i, el) {
        //   transposeChord(el, delta, newKey);
        // });

        currentKey = newKey;
    };

    var transposeChord = function (selector, delta, targetKey) {
        // console.log("the selectoooooooooooooor: ", selector);
        // var el = selector;
        // var el = document.querySelectorAll(selector)
        var el = selector;
        var oldChord = el.innerText;

        var oldChordRoot = getChordRoot(oldChord);
        var newChordRoot = getNewKey(oldChordRoot, delta, targetKey);
        var newChord = newChordRoot.name + oldChord.substr(oldChordRoot.length);
        // el.text(newChord);
        el.innerText = newChord;

        // console.log("the ellllll: ", el);

        var sib = el.nextSibling;
        // var sib = el[0].nextSibling;
        if (sib && sib.nodeType === 3 && sib.nodeValue.length > 0 && sib.nodeValue.charAt(0) !== "/") {
            var wsLength = getNewWhiteSpaceLength(oldChord.length, newChord.length, sib.nodeValue.length);
            sib.nodeValue = makeString(" ", wsLength);
        }
    };

    var getNewWhiteSpaceLength = function (a, b, c) {
        if (a > b) return c + (a - b);
        else if (a < b) return c - (b - a);
        else return c;
    };

    var makeString = function (s, repeat) {
        var o = [];
        for (var i = 0; i < repeat; i++) o.push(s);
        return o.join("");
    };

    var isChordLine = function (input) {
        var tokens = input.replace(/\s+/, " ").split(" ");
        // console.log("tokens:> ", tokens);
        // Try to find tokens that aren't chords
        // if we find one we know that this line is not a 'chord' line.
        for (var i = 0; i < tokens.length; i++) {
            //
            const isEmptyLine = tokens[i].trim().length === 0;
            const isChord = opts.chordRegex.test(tokens[i]);

            if (!isEmptyLine && !isChord) return false;

            // if it is not an empty line
            // and if it is RegEx is not a chord
            // then >>> it is not a chord-line
            // ##########################3#
            // if (
            //     // it is very important for the timebeans to leave the equal as '==' , currently there is a bug in the '==='
            //     tokens[i].trim().length !== 0 &&
            //     !tokens[i].match(opts.chordRegex)
            // )
            //     return false;
            // ##########################3#
        }
        return true;
    };

    var wrapChords = function (input) {
        return input.replace(opts.chordReplaceRegex, "<span class='c'>$1</span>");
    };

    //todo: the thissssss
    console.log("the this:  ", this);
    return this.forEach((element, index) => {
        var startKey = element.getAttribute("data-key");
        console.log("opts.key: ", opts.key);

        if (!startKey || startKey.trim() === "") {
            startKey = opts.key;
        }

        // console.log("the Element!!!: ", opts.key);
        // })

        // var startKey = $(this).attr("data-key");
        // if (!startKey || $.trim(startKey) == "") {
        //   startKey = opts.key;
        // }

        if (!startKey || startKey.trim() === "") {
            throw new Error("Starting Key is not defined!");
            // throw "Starting key not defined.";
            return this;
        }

        currentKey = getKeyByName(startKey);

        // Build tranpose links ===========================================
        var keyLinks = [];
        keys.forEach((key, index) => {
            if (currentKey.name === key.name) {
                // keyLinks.push()
                keyLinks.push("<a href='#' class='selected'>" + key.name + "</a>");
            } else {
                keyLinks.push("<a href='#'>" + key.name + "</a>");
            }
        });

        const that = this;

        var keysHtml = document.createElement("div");
        keysHtml.classList.add("transpose-keys");

        keysHtml.innerHTML = keyLinks.join("");

        keysHtml.querySelectorAll("a").forEach((element, index) => {
            element.addEventListener("click", function (e) {
                e.preventDefault();
                transposeSong(that, element.innerHTML);

                document.querySelector(".transpose-keys a.selected").classList.remove("selected");

                element.classList.add("selected");

                return false;
            });
        });

        // target.parentNode.insertBefore(elem, target);
        this[0].parentNode.insertBefore(keysHtml, this[0]);
        // console.log("th;;a;aa;a;;a: ", this[0].innerHTML);

        var output = [];
        var lines = this[0].innerHTML.split(/\r\n|\n/g);

        // console.log("the lineeeeeeeeeeeeeees: ", lines);
        var line,
            tmp = "";

        for (var i = 0; i < lines.length; i++) {
            line = lines[i];

            if (isChordLine(line)) output.push("<span>" + wrapChords(line) + "</span>");
            else output.push("<span>" + line + "</span>");
        }

        this[0].innerHTML = output.join("\n");
    }); // end ForEach()
}

// console.log(preObj);
// const transposedElement = transpose.bind(preObj);
// transposedElement();
// transpose.call(preHTML);
