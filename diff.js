/**
 * Diff algorithm.
 *
 * Implementation of Myers algorithm.
 * Based on code written in python from http://blog.robertelder.org/diff-algorithm/
 *
 * @author Bartosz M.
 * @email laxip@protonmail.com
 *
 * @see http://www.xmailserver.org/diff2.pdf
 */
function diff(e, f, i = 0, j = 0) {
    const arr = [];

    // declare variables
    let c,
        d,
        o,
        m,
        w,
        g,
        p,
        D,
        x,
        y,
        u,
        v,
        a,
        b,
        s,
        t,
        n;

    let N = e.length;
    let M = f.length;
    let L = N + M;
    let Z = 2 * Math.min(N, M) + 2;

    if (N > 0 && M > 0) {
        w = N - M;
        g = fill(0, Z);
        p = fill(0, Z);

        const h1 = 0;
        const h2 = (((L / 2) >> 0) + (L % 2)) + 1;

        for (h = h1; h < h2; h++) {
            for (r = 0; r < 2; r++) {
                if (r === 0) {
                    c = g;
                    d = p;
                    o = 1;
                    m = 1;
                } else {
                    c = p;
                    d = g;
                    o = 0;
                    m = -1;
                }

                const k1 = -(h - 2 * Math.max(0, h - M));
                const k2 = h - 2 * Math.max(0, h - N) + 1;

                for (let k = k1; k < k2; k += 2) {
                    a = (k === -h || k !== h && c[(k - 1) % Z] < c[(k + 1) % Z]) ? c[(k + 1) % Z] : (c[(k - 1) % Z] + 1);
                    b = a - k;

                    s = a;
                    t = b;

                    while (a < N && b < M && e[(1 - o) * N + m * a + (o - 1)] === f[(1 - o) * M + m * b + (o - 1)]) {
                        ++a;
                        ++b;
                    }

                    c[k % Z] = a;
                    let z = -(k - w);

                    if (L % 2 === o && z >= -(h - o) && z <= h - o && c[k % Z] + d[z % Z] >= N) {
                        if (o === 1) {
                            D = 2 * h - 1;
                            x = s;
                            y = t;
                            u = a;
                            v = b;
                        } else {
                            D = 2 * h;
                            x = N - a;
                            y = M - b;
                            u = N - s;
                            v = M - t;
                        }

                        if (D > 1 || (x !== u && y !== v)) {
                            const d1 = diff(e.slice(0, x), f.slice(0, y), i, j);
                            const d2 = diff(e.slice(u, N), f.slice(v, M), i + u, j + v);

                            return d1.concat(d2);
                        } else if (M > N) {
                            return diff([], f.slice(N, M), i + N, j + N);
                        } else if (M < N) {
                            return diff(e.slice(M, N), [], i + M, j + M);
                        } else {
                            return [];
                        }
                    }
                }
            }
        }
    } else if (N > 0) {
        for (n = 0; n < N; n++) {
            arr.push({
                'operation': 'delete',
                'position_old': i + n,
            });
        }
    } else {
        for (m = 0; m < M; m++) {
            arr.push({
                'operation': 'insert',
                'position_old': i,
                'position_new': j + m,
            });
        }
    }

    return arr;
}

/**
 * Python's [what]*length
 *
 * @param what
 * @param length
 *
 * @returns {Array}
 */
function fill(what, length) {
    const arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(what);
    }

    return arr;
}
