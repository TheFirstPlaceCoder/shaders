#version 120

uniform float round;
uniform float thickness;
uniform float glowRadius;
uniform float test;
uniform vec2 size;
uniform vec4 color1;
uniform vec4 color2;
uniform vec4 color3;
uniform vec4 color4;

float alpha(vec2 d, vec2 d1) {
    vec2 v = abs(d) - d1 + round;
    return min(max(v.x, v.y), 0.0) + length(max(v, .0)) - round;
}

void main() {
    vec2 coords = gl_TexCoord[0].st;
    vec2 centre = 0.5 * size;
    vec2 smoothness = vec2(thickness - test, thickness);
    vec4 color = mix(mix(color1, color2, coords.y), mix(color3, color4, coords.y), coords.x);

    float outlineAlpha = 1.0 - smoothstep(smoothness.x, smoothness.y, abs(alpha(centre - (coords * size), centre - thickness)));
    
    float glowAlpha = smoothstep(thickness, glowRadius, abs(alpha(centre - (coords * size), centre - thickness)));
    
    gl_FragColor = vec4(color.rgb, color.a * (outlineAlpha + glowAlpha * (1.0 - outlineAlpha)));
}
