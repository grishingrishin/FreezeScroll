export const freezeScroll = {
    hideScroll() {
        window.addEventListener('wheel', this.freezeScroll, { passive: false });
        window.addEventListener('keydown', this.freezeScroll);
    },
    showScroll() {
        window.removeEventListener('wheel', this.freezeScroll);
        window.removeEventListener('keydown', this.freezeScroll);
    },
    freezeScroll(e) {
        const KEY_CODES = {
            home: 36,
            up: 38,
            down: 40,
            pageup: 33,
            pagedown: 34,
            end: 35
        };

        if (e.type === 'keydown') {
            const up = [KEY_CODES.up, KEY_CODES.pageup, KEY_CODES.home];
            const down = [KEY_CODES.down, KEY_CODES.pagedown, KEY_CODES.end];

            if (up.includes(e.keyCode)) {
                e.deltaY = -1;
            } else if (down.includes(e.keyCode)) {
                e.deltaY = 1;
            } else {
                return;
            }
        }

        if (this.checkPath(e)) {
            e.preventDefault();
        }
    },
    checkPath(e) {
        const { path } = e;
        const delta = e.deltaY;

        for (let index = 0; index < path.length; index++) {
            const el = path[index];

            if (el === document) {
                return true;
            }

            if (el === document.documentElement) {
                return true;
            }

            if (el === e.target) {
                return this.shouldScroll(e.target, delta);
            };
        }
        
        return true;
    },
    shouldScroll(el, delta) {
        if (el.scrollTop === 0 && delta < 0) return true;
        return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    }
};

export default freezeScroll;
