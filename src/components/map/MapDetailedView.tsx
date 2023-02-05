import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { Atmosphere, RasterDemSource, SkyLayer, Terrain } from '@rnmapbox/maps'

// mapbox://mapbox.mapbox-terrain-dem-v1
// mapbox://styles/giorgiozett/cldo60m3v000h01pg1lzppjkh

export const MapDetailedView = memo(() => {
	console.log('use MapDetaildView')
	return (
		<RasterDemSource id="mapbox-dem" url="mapbox://mapbox.mapbox-terrain-dem-v1" tileSize={514} maxZoomLevel={14}>
			<Atmosphere style={styles.atmosphere} />
			<SkyLayer
				id="sky-layer"
				style={{
					skyType: 'atmosphere',
					skyAtmosphereSun: [0.0, 0.0],
					skyAtmosphereSunIntensity: 15.0
				}}
			/>
			<Terrain style={{ exaggeration: 1.5 }} />
		</RasterDemSource>
	)
})
const styles = StyleSheet.create({
	atmosphere: {
		color: 'rgb(186, 210, 235)',
		highColor: 'rgb(36, 92, 223)',
		horizonBlend: 0.02,
		spaceColor: 'rgb(11, 11, 25)',
		starIntensity: 0.6
	}
})
