import { StyleSheet, View } from 'react-native'
import { CustomMap } from './components/map/CustomMap'

const App = () => {
	return (
		<View style={styles.page}>
			<CustomMap />
		</View>
	)
}

export default App

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
