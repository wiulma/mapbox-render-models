import { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapboxGL, { Camera, Logger, RegionPayload } from '@rnmapbox/maps'
import { Feature, Point } from 'geojson'
import { MAPBOX_API_KEY } from '@env'
import { MapDetailedView } from './MapDetailedView'
import { MAP_PROJECTION_MODE } from './MapConfig'

Logger.setLogLevel('verbose')
MapboxGL.setAccessToken(MAPBOX_API_KEY)

const MAP_STYLES = {
	DEFAULT: MapboxGL.StyleURL.Street,
	DETAILED: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
}

const ZOOM_LEVEL_DETAILED = 15
const ZOOM_LEVEL_GLOBE = 3
const MAX_ZOOM_LEVEL = 25

export const CustomMap: React.FC<Record<string, never>> = () => {
	const [zoomLevel, setZoomLevel] = useState<number>(13)
	const [mapStyleUrl, setMapStyleUrl] = useState<string>(MAP_STYLES.DEFAULT)
	const [projection, setProjection] = useState<MapProjection>(MAP_PROJECTION_MODE.MERCATOR)
	const mapCameraRef = useRef<MapboxGL.Camera>(null)

	const onRegionDidchange = (feature: Feature<Point, RegionPayload>) => {
		console.log('onRegionDidchange', feature)
		const currentZoomLevel = feature.properties.zoomLevel
		setZoomLevel(currentZoomLevel)
		setMapStyleUrl(currentZoomLevel > ZOOM_LEVEL_DETAILED ? MAP_STYLES.DETAILED : MAP_STYLES.DEFAULT)
		setProjection(currentZoomLevel < ZOOM_LEVEL_GLOBE ? MAP_PROJECTION_MODE.GLOBE : MAP_PROJECTION_MODE.MERCATOR)
	}

	useEffect(() => {
		console.log('update mapStyleUrl', mapStyleUrl)
	}, [mapStyleUrl])

	return (
		<View style={styles.container}>
			<MapboxGL.MapView style={styles.map} onRegionDidChange={onRegionDidchange} styleURL={mapStyleUrl} projection={projection}>
				<Camera zoomLevel={zoomLevel} animationMode={'flyTo'} ref={mapCameraRef} followUserLocation={true} maxZoomLevel={MAX_ZOOM_LEVEL} />
				<MapboxGL.UserLocation visible />
				<MapDetailedView />
			</MapboxGL.MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%'
	},
	map: {
		flex: 1
	}
})
