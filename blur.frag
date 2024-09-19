#version 120

uniform float round;
uniform float dist;
uniform float thickness;
uniform vec2 size;
uniform float blurStrength;
uniform vec4 color;

float alpha(vec2 d, vec2 d1) {
    vec2 v = abs(d) - d1 + round;
    return min(max(v.x, v.y), 0.0) + length(max(v, vec2(0.0))) - round;
}

vec4 blur(vec2 uv, vec2 size) {
    vec4 col = vec4(0.0);
    float totalWeight = 0.0;

    for (int x = -4; x <= 4; x++) {
        for (int y = -4; y <= 4; y++) {
            vec2 offset = vec2(x, y) * blurStrength;
            vec2 sampleUV = (uv + offset) / size;
            float weight = 1.0 - length(offset) / 8.0;
            
            if (weight > 0.0) {
                col += texture2D(gl_TexCoord[0].sampler, sampleUV) * weight;
                totalWeight += weight;
            }
        }
    }

    if (totalWeight > 0.0) {
        col /= totalWeight;
    }
    
    return col;
}

void main() {
    vec2 centre = 0.5 * size;
    vec2 uv = gl_TexCoord[0].st * size;
    vec2 smoothness = vec2(thickness - dist, thickness);
    float a = 1.0 - smoothstep(smoothness.x, smoothness.y, abs(alpha(centre - uv, centre - thickness)));

    vec4 blurredColor = blur(uv, size);

    gl_FragColor = vec4(blurredColor.rgb * color.rgb, a);
}
