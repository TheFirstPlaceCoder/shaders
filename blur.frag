#version 120

uniform float softness;
uniform float radius;
uniform float coef;
uniform float min;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

void main() {
    vec2 centre = .5f * size;
    float centreSize = (gl_TexCoord[0].st * size);
    float realAlpha = alpha(centre - centreSize, centre - radius - softness);
    float finalAlha = min - smoothstep(-softness * coef, softness * coef, realAlpha);
    gl_FragColor = vec4(color.rgb, color.a * finalAlpha);
}
