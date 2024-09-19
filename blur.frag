#version 120

uniform float softness;
uniform float radius;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

vec4 blur(vec2 uv) {
    vec4 col = vec4(0.0);
    float totalWeight = 0.0;

    int blurSize = 4;

    for (int x = -blurSize; x <= blurSize; ++x) {
        for (int y = -blurSize; y <= blurSize; ++y) {
            vec2 offset = vec2(x, y) * (radius / size);
            vec2 sampleUV = uv + offset;
            float weight = 1.0 - length(offset) / float(blurSize);

            col += texture2D(gl_TexCoord[0].sampler, sampleUV) * weight;
            totalWeight += weight;
        }
    }

    if (totalWeight > 0.0) {
        col /= totalWeight;
    }

    return col;
}

void main() {
    vec2 centre = 0.5 * size;
    vec2 uv = gl_TexCoord[0].st;

    vec4 blurredColor = blur(uv);
    float a = 1.0 - smoothstep(-softness, softness, alpha(centre - (uv * size), centre - radius - softness));
    
    gl_FragColor = vec4(blurredColor.rgb * color.rgb, color.a * a);
}
