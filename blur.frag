#version 120

uniform float softness;
uniform float radius;
uniform float coef;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

void main() {
    vec2 centre = .5f * size;
    gl_FragColor = vec4(color.rgb, color.a * (.75f - smoothstep(-softness * coef, softness * coef, alpha(centre - (gl_TexCoord[0].st * size), centre - radius - softness))));
}
