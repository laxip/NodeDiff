const data = [
    [],
    ['#193f7b', '#9d9fa1', '#111221', '#771111', '#03193a', '#f4f4f4'],
    ['#193f7b', '#9d9fa1', '#4e4a46', '#f4f4f4', '#101010', '#140f0c', '#261713'],
    ['#193f7b', '#9d9fa1', '#111221', '#d2d2d2', '#4e4a46', '#f4f4f4'],
];

let current = 0;

let currentElements = [];

const mom = $('mother');

function $(id) {
    return document.getElementById(id);
}

function prepare(i) {
    currentElements = [];

    for (var j = 0; j < data[i].length; j++) {
        currentElements.push([{
            position: j,
            type: 'box',
        }]);
    }
}

function clear() {
    while (mom.firstChild) {
        mom.removeChild(mom.firstChild);
    }
}

function display(data_old, data_new) {
    const arr = [];

    for (let i = 0; i < currentElements.length; i++) {
        for (let j = 0; j < currentElements[i].length; j++) {
            if (currentElements[i][j].type !== 'before') {
                arr.push(currentElements[i][j]);
            }
        }
    }

    clear();

    for (let i = 0; i < arr.length; i++) {
        const elem = document.createElement('div');

        const t = arr[i].type;
        const p = arr[i].position;

        elem.className = 'box ' + t;

        if (t === 'box' || t === 'delete') {
            elem.style.background = data[data_old][p];
        } else {
            elem.style.background = data[data_new][p];
        }

        mom.appendChild(elem);
    }
}

function insert(p_new, p_old) {
    if (p_old >= currentElements.length) {
        currentElements.push([{
            type: 'before',
        }]);
    }

    const length = currentElements[p_old].length;

    currentElements[p_old].splice(length - 1, 0, {
        position: p_new,
        type: 'insert',
    });
}

function remove(p_old) {
    const length = currentElements[p_old].length;

    if (length > 0) {
        currentElements[p_old][length - 1].type = 'delete';
    }
}

function change() {
    let newId = (current + 1) % (data.length - 1) + 1;

    const diffs = diff(data[current], data[newId]);

    for (let i = 0; i < diffs.length; i++) {
        if (diffs[i].operation === 'delete') {
            remove(diffs[i].position_old);
        } else if (diffs[i].operation === 'insert') {
            insert(diffs[i].position_new, diffs[i].position_old);
        }
    }

    display(current, newId);

    current = newId;
    prepare(current);
}

prepare(current);
change();

$('button')
    .addEventListener('click', change, false);
