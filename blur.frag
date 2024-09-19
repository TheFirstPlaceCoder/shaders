#version 120

uniform float softness;
uniform float radius;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, vec2(0.0))) - radius;
}

void main() {
    vec2 centre = 0.5 * size;
    float dist = alpha(centre - (gl_TexCoord[0].st * size), centre - radius);
    float smoothAlpha = smoothstep(-softness * 1.5, softness * 1.5, dist);
    gl_FragColor = vec4(color.rgb, color.a * (1.0 - smoothAlpha));
}
