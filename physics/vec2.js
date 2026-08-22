/**
 * Lightweight 2D vector math for RidgeRush physics
 */
export class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    clone() {
        return new Vec2(this.x, this.y);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    mul(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    div(s) {
        if (s !== 0) {
            this.x /= s;
            this.y /= s;
        }
        return this;
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    lengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    normalize() {
        const len = this.length();
        if (len > 1e-8)
            this.div(len);
        return this;
    }
    normalized() {
        return this.clone().normalize();
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    rotate(angle) {
        const c = Math.cos(angle), s = Math.sin(angle);
        const nx = this.x * c - this.y * s;
        const ny = this.x * s + this.y * c;
        this.x = nx;
        this.y = ny;
        return this;
    }
    rotateAround(origin, angle) {
        this.sub(origin).rotate(angle).add(origin);
        return this;
    }
    perpendicular() {
        return new Vec2(-this.y, this.x);
    }
    lerp(v, t) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }
    static add(a, b) {
        return new Vec2(a.x + b.x, a.y + b.y);
    }
    static sub(a, b) {
        return new Vec2(a.x - b.x, a.y - b.y);
    }
    static mul(a, s) {
        return new Vec2(a.x * s, a.y * s);
    }
    static dist(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
    static distSq(a, b) {
        const dx = a.x - b.x, dy = a.y - b.y;
        return dx * dx + dy * dy;
    }
    static zero() { return new Vec2(0, 0); }
    static fromAngle(angle, len = 1) {
        return new Vec2(Math.cos(angle) * len, Math.sin(angle) * len);
    }
}
