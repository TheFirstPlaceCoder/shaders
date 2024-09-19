#version 120

uniform float softness;
uniform float radius;
uniform vec2 size;
uniform vec4 color;

float alpha(vec2 p, vec2 b) {
    return length(max(abs(p) - b, .0f)) - radius;
}

vec4 blendColors(vec2 uv) {
    vec4 totalColor = vec4(0.0);
    float totalWeight = 0.0;

    int blurSize = 4;
    
    for (int x = -blurSize; x <= blurSize; ++x) {
        for (int y = -blurSize; y <= blurSize; ++y) {
            vec2 offset = vec2(x, y) / size;
            vec2 sampleUV = uv + offset;

            float weight = max(0.0, 1.0 - length(offset) / (float(blurSize) * 0.5));

            vec4 sampleColor = vec4(color.rgb * (1.0 - length(sampleUV - vec2(0.5)) * 2.0), color.a);
            totalColor += sampleColor * weight;
            totalWeight += weight;
        }
    }

    if (totalWeight > 0.0) {
        totalColor /= totalWeight;
    }

    return totalColor;
}

void main() {
    vec2 uv = gl_TexCoord[0].st;
    vec2 centre = 0.5 * size;
    
    vec4 blurredColor = blendColors(uv);

    float a = 1.0 - smoothstep(-softness, softness, alpha(centre - (uv * size), centre - radius - softness));
    
    gl_FragColor = vec4(blurredColor.rgb, blurredColor.a * a);
}
