import { matrix, pow } from './util';

/**
* @func xyz2p3
* @desc Return an RGB gamma-corrected P3 color from an XYZ color
* @param {Number} x - Chromaticity of X
* @param {Number} y - Chromaticity of Y
* @param {Number} z - Chromaticity of Z
* @return {ArrayRGB}
* @example
* xyz2p3(41.25, 21.27, 1.93) // => [100, 0, 0]
* @link https://www.w3.org/TR/css-color-4/#color-conversion-code
*/

export function xyz2p3(xyzX, xyzY, xyzZ) {
	const [p3R, p3G, p3B] = matrix([xyzX, xyzY, xyzZ], [
		[2.493496911941425, -0.9313836179191239, -0.40271078445071684],
		[-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
		[0.03584583024378447, -0.07617238926804182, 0.9568845240076872]
	]).map(c => c > 0.0031308 ? 1.055 * pow(c, 1 / 2.4) - 0.055 : c * 12.92)

	return [p3R, p3G, p3B]
}
